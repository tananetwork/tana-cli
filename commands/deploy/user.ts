/**
 * tana deploy user <username>
 *
 * Deploys a user account to the blockchain
 */

import { createSpinner } from 'nanospinner'
import chalk from 'chalk'
import {
  readUserConfig,
  getDeploymentTarget
} from '../../utils/config'
import { signMessage, createTransactionMessage } from '../../utils/crypto'

export async function deployUser(username: string, targetUrl?: string) {
  console.log(chalk.bold(`\n🚀 Deploying user: ${username}\n`))

  // Read user config
  const spinner = createSpinner('Reading user configuration...').start()
  const userConfig = readUserConfig(username)

  if (!userConfig) {
    spinner.error({ text: `User "${username}" not found` })
    console.log(chalk.gray(`\nCreate the user first with: ${chalk.cyan(`tana new user ${username}`)}\n`))
    process.exit(1)
  }

  spinner.success({ text: 'User configuration loaded' })

  // Determine deployment target
  const targetSpinner = createSpinner('Determining deployment target...').start()

  let target = targetUrl
  if (!target) {
    target = await getDeploymentTarget()
  }

  if (!target) {
    targetSpinner.error({ text: 'No deployment target found' })
    console.log(chalk.yellow('\nNo running chain detected.'))
    console.log(chalk.gray(`\nOptions:`))
    console.log(chalk.gray(`  1. Start local chain:  ${chalk.cyan('tana start')}`))
    console.log(chalk.gray(`  2. Specify target:     ${chalk.cyan(`tana deploy user ${username} --target <url>`)}\n`))
    process.exit(1)
  }

  targetSpinner.success({ text: `Target: ${target}` })

  // Sign and deploy user
  const deploySpinner = createSpinner('Signing user transaction...').start()

  try {
    // Create transaction data for signing
    const timestamp = Date.now()
    const nonce = 0 // For user creation, nonce is always 0 (user doesn't exist yet)

    const transactionData = {
      type: 'user_creation',
      from: '00000000-0000-0000-0000-000000000000', // System creates users
      to: '00000000-0000-0000-0000-000000000000', // Will be assigned by ledger
      timestamp,
      nonce,
      contractInput: {
        username: userConfig.username,
        displayName: userConfig.displayName,
        publicKey: userConfig.publicKey,
        bio: '',
        role: userConfig.role || 'user'
      }
    }

    // Create canonical message and sign it
    const message = createTransactionMessage(transactionData)
    const signature = await signMessage(message, userConfig.privateKey)

    deploySpinner.update({ text: 'Creating user transaction...' })

    // Send signed transaction to ledger
    const payload = {
      publicKey: userConfig.publicKey,
      username: userConfig.username,
      displayName: userConfig.displayName,
      bio: '',
      role: userConfig.role,
      signature, // Include the signature
      timestamp, // Include timestamp for verification
      nonce // Include nonce for verification
    }

    const response = await fetch(`${target}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Deployment failed')
    }

    const result = await response.json()
    deploySpinner.success({ text: 'User transaction created' })

    // Success message
    console.log(chalk.green(`\n✓ User deployed successfully!\n`))
    console.log(chalk.gray('━'.repeat(50)))
    console.log(chalk.bold('Deployment Details:'))
    console.log(`  Username:      ${chalk.cyan(username)}`)
    if (userConfig.role) {
      console.log(`  Role:          ${chalk.yellow(userConfig.role)}${userConfig.role === 'sovereign' ? ' 👑' : ''}`)
    }
    console.log(`  User ID:       ${chalk.gray(result.userId)}`)
    console.log(`  Transaction:   ${chalk.gray(result.transactionId)}`)
    console.log(`  Status:        ${chalk.yellow('Pending block inclusion')}`)
    console.log(chalk.gray('━'.repeat(50)))

    if (userConfig.role === 'sovereign') {
      console.log(chalk.yellow('\n👑 Sovereign user will be created on the blockchain'))
      console.log(chalk.gray('   This user can approve deposit/withdraw requests\n'))
    }

    console.log(chalk.bold('\nNext Steps:'))
    console.log(`  1. Wait for block production (automatic)`)
    console.log(`  2. Check balance:  ${chalk.cyan(`tana balance ${username}`)}`)
    console.log()

  } catch (error: any) {
    deploySpinner.error({ text: 'Deployment failed' })
    console.log(chalk.red(`\n✗ Error: ${error.message}\n`))
    process.exit(1)
  }
}
