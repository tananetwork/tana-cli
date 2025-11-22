import chalk from 'chalk'
import { generateKeypair } from '@tananetwork/crypto'
import { ensureConfigDirs, CONFIG_DIR } from '../../utils/config'
import { writeFileSync } from 'fs'
import { join } from 'path'

interface ValidatorOptions {
  port?: string
  httpPort?: string
  peers?: string
}

export async function initValidator(options: ValidatorOptions = {}) {
  console.log(chalk.bold('\n🔧 Initializing validator node...\n'))

  try {
    // Generate validator keypair
    const { publicKey, privateKey } = await generateKeypair()
    // Skip the "ed25519_" prefix (8 chars) and take next 8 chars
    const validatorId = `val_${publicKey.slice(8, 16)}`

    // Parse peers
    const peers = options.peers
      ? options.peers.split(',').map((url: string, i: number) => ({
          id: `peer_${i}`,
          wsUrl: url.trim(),
        }))
      : []

    // Create validator config
    const config = {
      validatorId,
      publicKey,
      privateKey,  // TODO: Encrypt this in production
      wsPort: parseInt(options.port || '9000'),
      httpPort: parseInt(options.httpPort || '9001'),
      wsUrl: `ws://localhost:${options.port || '9000'}`,
      peers,
      createdAt: new Date().toISOString(),
    }

    // Save to config directory
    ensureConfigDirs()
    const validatorPath = join(CONFIG_DIR, 'validator.json')
    writeFileSync(validatorPath, JSON.stringify(config, null, 2))

    console.log(chalk.green(`✅ Validator initialized: ${validatorId}`))
    console.log(chalk.gray(`📁 Config saved to: ${validatorPath}`))
    console.log(chalk.gray(`🔑 Public key: ${publicKey}`))
    console.log(chalk.gray(`🌐 WebSocket URL: ${config.wsUrl}`))
    console.log(chalk.gray(`🌐 HTTP API: http://localhost:${config.httpPort}`))
    console.log()

    if (peers.length > 0) {
      console.log(chalk.cyan(`👥 Peers configured: ${peers.length}`))
      peers.forEach(peer => console.log(chalk.gray(`   - ${peer.wsUrl}`)))
    } else {
      console.log(chalk.yellow(`⚠️  No peers configured. This validator will run standalone.`))
    }

    console.log()
    console.log(chalk.bold('📝 Next steps:'))
    console.log(chalk.gray('   1. Register validator with mesh: tana mesh register'))
    console.log(chalk.gray('   2. Start services: tana start'))
    console.log()

  } catch (error: any) {
    console.error(chalk.red(`\n❌ Error initializing validator: ${error.message}\n`))
    process.exit(1)
  }
}
