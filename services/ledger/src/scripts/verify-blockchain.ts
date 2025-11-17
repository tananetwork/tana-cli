/**
 * Verify Blockchain Integrity
 *
 * Command-line script to verify block integrity
 *
 * Usage:
 *   bun run blockchain:verify              # Verify latest block
 *   bun run blockchain:verify --all        # Verify entire chain
 *   bun run blockchain:verify --height 10  # Verify specific block
 *   bun run blockchain:verify --range 0-10 # Verify block range
 */

import { verifyBlock, verifyChain, startupIntegrityCheck } from '../blockchain/verify-block'

async function main() {
  const args = process.argv.slice(2)

  // Parse arguments
  const flags = {
    all: args.includes('--all'),
    verbose: args.includes('--verbose') || args.includes('-v'),
    height: args.find(arg => arg.startsWith('--height='))?.split('=')[1],
    range: args.find(arg => arg.startsWith('--range='))?.split('=')[1],
    startup: args.includes('--startup')
  }

  console.log('🔒 Tana Blockchain Verification Tool')
  console.log('═'.repeat(60))
  console.log('')

  try {
    // Startup check
    if (flags.startup) {
      const valid = await startupIntegrityCheck()
      process.exit(valid ? 0 : 1)
    }

    // Verify all blocks
    if (flags.all) {
      const result = await verifyChain({ verbose: true })

      console.log('')
      console.log('═'.repeat(60))
      console.log('Summary:')
      console.log('  Blocks verified:', result.blocksVerified)
      console.log('  Failed blocks:', result.failedBlocks.length)
      console.log('  Status:', result.valid ? '✅ VALID' : '❌ INVALID')

      if (!result.valid) {
        console.log('')
        console.log('Failed blocks:', result.failedBlocks.join(', '))
        console.log('')
        console.log('Errors:')
        result.errors.forEach(err => console.log(err))
      }

      console.log('═'.repeat(60))
      process.exit(result.valid ? 0 : 1)
    }

    // Verify specific block
    if (flags.height) {
      const height = parseInt(flags.height, 10)
      console.log(`Verifying block ${height}...`)
      console.log('')

      const result = await verifyBlock(height)

      console.log('Verification Results:')
      console.log('  Hash valid:', result.checks.hashValid ? '✅' : '❌')
      console.log('  TX root valid:', result.checks.txRootValid ? '✅' : '❌')
      console.log('  State root valid:', result.checks.stateRootValid ? '✅' : '❌')
      console.log('  Transaction signatures valid:', result.checks.signaturesValid ? '✅' : '❌')
      console.log('  Producer signature valid:', result.checks.producerSignatureValid ? '✅' : '❌')
      console.log('  State changes valid:', result.checks.stateChangesValid ? '✅' : '❌')
      console.log('')
      console.log('Overall:', result.valid ? '✅ VALID' : '❌ INVALID')

      if (!result.valid) {
        console.log('')
        console.log('Errors:')
        result.errors.forEach(err => console.log(`  ❌ ${err}`))
      }

      console.log('═'.repeat(60))
      process.exit(result.valid ? 0 : 1)
    }

    // Verify block range
    if (flags.range) {
      const [from, to] = flags.range.split('-').map(n => parseInt(n, 10))
      console.log(`Verifying blocks ${from} to ${to}...`)
      console.log('')

      const result = await verifyChain({
        fromHeight: from,
        toHeight: to,
        verbose: true
      })

      console.log('')
      console.log('═'.repeat(60))
      console.log('Summary:')
      console.log('  Blocks verified:', result.blocksVerified)
      console.log('  Failed blocks:', result.failedBlocks.length)
      console.log('  Status:', result.valid ? '✅ VALID' : '❌ INVALID')

      if (!result.valid) {
        console.log('')
        console.log('Failed blocks:', result.failedBlocks.join(', '))
      }

      console.log('═'.repeat(60))
      process.exit(result.valid ? 0 : 1)
    }

    // Default: verify latest block (startup check)
    const valid = await startupIntegrityCheck()
    process.exit(valid ? 0 : 1)

  } catch (err) {
    console.error('❌ Verification failed:', err)
    process.exit(1)
  }
}

main()
