/**
 * tana deploy contract <path>
 *
 * Deploys a smart contract to the blockchain with full security
 */

import { createSpinner } from 'nanospinner'
import chalk from 'chalk'
import { createHash } from 'crypto'
import { readUserConfig, getDeploymentTarget } from '../../utils/config'
import { signMessage, createTransactionMessage } from '../../utils/crypto'
import { extractContractFunctions } from '../../utils/contract-extractor'
import { validateContractStructure } from '../../utils/contract-validator'
import path from 'path'
import { readFileSync, existsSync } from 'fs'

// Security: Maximum contract size (500KB)
const MAX_CONTRACT_SIZE = 500 * 1024

interface ContractManifest {
  name: string
  version?: string
  description?: string
  author?: string
  metadata?: Record<string, any>
}

export async function deployContract(contractPath: string, targetUrl?: string) {
  console.log(chalk.bold(`\n🚀 Deploying contract: ${contractPath}\n`))

  // 1. Resolve contract directory
  const spinner = createSpinner('Resolving contract path...').start()
  const absolutePath = path.resolve(process.cwd(), contractPath)

  if (!existsSync(absolutePath)) {
    spinner.error({ text: 'Contract path not found' })
    console.log(chalk.red(`\n✗ Path does not exist: ${absolutePath}\n`))
    process.exit(1)
  }

  const isDirectory = require('fs').statSync(absolutePath).isDirectory()
  const contractDir = isDirectory ? absolutePath : path.dirname(absolutePath)
  const sourceFile = isDirectory ? path.join(contractDir, 'contract.ts') : absolutePath

  if (!existsSync(sourceFile)) {
    spinner.error({ text: 'contract.ts not found' })
    console.log(chalk.red(`\n✗ Expected contract.ts at: ${sourceFile}\n`))
    process.exit(1)
  }

  spinner.success({ text: `Found: ${sourceFile}` })

  // 2. Read and validate source code
  const readSpinner = createSpinner('Reading contract source...').start()

  let sourceCode: string
  try {
    sourceCode = readFileSync(sourceFile, 'utf-8')
  } catch (error: any) {
    readSpinner.error({ text: 'Failed to read contract' })
    console.log(chalk.red(`\n✗ Error: ${error.message}\n`))
    process.exit(1)
  }

  // Security: Check contract size
  const sourceSize = Buffer.byteLength(sourceCode, 'utf-8')
  if (sourceSize > MAX_CONTRACT_SIZE) {
    readSpinner.error({ text: 'Contract too large' })
    console.log(chalk.red(`\n✗ Contract size: ${sourceSize} bytes (max: ${MAX_CONTRACT_SIZE} bytes)\n`))
    process.exit(1)
  }

  // Validate contract structure with Zod
  const validation = validateContractStructure(sourceCode)

  if (!validation.valid) {
    readSpinner.error({ text: 'Invalid contract structure' })
    console.log(chalk.red('\n✗ Contract validation failed:\n'))
    validation.errors.forEach(error => {
      console.log(chalk.red(`   • ${error}`))
    })
    console.log()
    process.exit(1)
  }

  readSpinner.success({ text: `Loaded ${sourceSize} bytes` })

  // Extract contract functions
  const extractSpinner = createSpinner('Extracting contract functions...').start()

  let extracted
  try {
    extracted = extractContractFunctions(sourceCode)
  } catch (error: any) {
    extractSpinner.error({ text: 'Failed to extract functions' })
    console.log(chalk.red(`\n✗ Error: ${error.message}\n`))
    process.exit(1)
  }

  const functions = []
  if (extracted.hasInit) functions.push('init()')
  functions.push('contract()')  // Always present
  if (extracted.hasGet) functions.push('get()')
  if (extracted.hasPost) functions.push('post()')

  extractSpinner.success({ text: `Extracted: ${functions.join(', ')}` })

  // 3. Read manifest (optional)
  const manifestPath = path.join(contractDir, 'contract.json')
  let manifest: ContractManifest | null = null

  if (existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
      console.log(chalk.gray(`  Manifest: ${manifest?.name || 'unnamed'} v${manifest?.version || '1.0.0'}`))
    } catch (error) {
      console.log(chalk.yellow('  ⚠️  Warning: Invalid contract.json, using defaults'))
    }
  }

  // 4. Calculate code hash (for verification)
  const hashSpinner = createSpinner('Calculating code hash...').start()
  const codeHash = createHash('sha256').update(sourceCode).digest('hex')
  hashSpinner.success({ text: `Hash: ${codeHash.substring(0, 16)}...` })

  // 5. Get user configuration
  const userSpinner = createSpinner('Loading user configuration...').start()

  // For now, use the default user from config
  // TODO: Add --user flag to specify which user is deploying
  const username = '@alice' // Temporary - should come from --user flag or config
  const userConfig = readUserConfig(username)

  if (!userConfig) {
    userSpinner.error({ text: 'User not found' })
    console.log(chalk.red(`\n✗ User "${username}" not found locally`))
    console.log(chalk.gray(`\nCreate the user first with: ${chalk.cyan(`tana new user ${username}`)}\n`))
    process.exit(1)
  }

  userSpinner.success({ text: `Deploying as: ${username}` })

  // 6. Determine deployment target
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
    console.log(chalk.gray(`  2. Specify target:     ${chalk.cyan(`tana deploy contract ${contractPath} --target <url>`)}\n`))
    process.exit(1)
  }

  targetSpinner.success({ text: `Target: ${target}` })

  // 7. Get user's current nonce
  const nonceSpinner = createSpinner('Fetching nonce...').start()

  let userNonce: number
  try {
    // Fetch user by username to get ID, then get nonce
    const userResponse = await fetch(`${target}/users/username/${username}`)
    if (!userResponse.ok) {
      throw new Error('User not found on blockchain')
    }
    const userData = await userResponse.json()

    const nonceResponse = await fetch(`${target}/users/${userData.id}/nonce`)
    if (!nonceResponse.ok) {
      throw new Error('Failed to fetch nonce')
    }
    const nonceData = await nonceResponse.json()
    userNonce = nonceData.nextNonce
    nonceSpinner.success({ text: `Nonce: ${userNonce}` })
  } catch (error: any) {
    nonceSpinner.error({ text: 'Failed to fetch nonce' })
    console.log(chalk.red(`\n✗ Error: ${error.message}\n`))
    process.exit(1)
  }

  // 8. Sign contract deployment
  const signSpinner = createSpinner('Signing contract deployment...').start()

  const timestamp = Date.now()
  const contractName = manifest?.name || path.basename(contractDir)

  const transactionData = {
    type: 'contract_deployment',
    from: userConfig.id || '00000000-0000-0000-0000-000000000000', // Will be looked up by username
    to: '00000000-0000-0000-0000-000000000000', // Contract ID assigned by ledger
    timestamp,
    nonce: userNonce,
    contractInput: {
      name: contractName,
      sourceCode,
      codeHash,
      version: manifest?.version || '1.0.0',
      description: manifest?.description,
      metadata: manifest?.metadata,
      author: manifest?.author || username
    }
  }

  const message = createTransactionMessage(transactionData)
  const signature = await signMessage(message, userConfig.privateKey)

  signSpinner.success({ text: 'Contract deployment signed' })

  // 9. Submit to blockchain
  const deploySpinner = createSpinner('Deploying to blockchain...').start()

  try {
    const response = await fetch(`${target}/contracts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ownerUsername: username,
        name: contractName,
        sourceCode,
        codeHash,
        // Extracted functions
        initCode: extracted.initCode,
        contractCode: extracted.contractCode,
        getCode: extracted.getCode,
        postCode: extracted.postCode,
        hasInit: extracted.hasInit,
        hasGet: extracted.hasGet,
        hasPost: extracted.hasPost,
        // Metadata
        version: manifest?.version || '1.0.0',
        description: manifest?.description,
        metadata: manifest?.metadata,
        // Signature
        signature,
        timestamp,
        nonce: userNonce
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Deployment failed')
    }

    const result = await response.json()
    deploySpinner.success({ text: 'Contract deployment transaction created' })

    // Success message
    console.log(chalk.green(`\n✓ Contract deployed successfully!\n`))
    console.log(chalk.gray('━'.repeat(50)))
    console.log(chalk.bold('Deployment Details:'))
    console.log(`  Name:          ${chalk.cyan(contractName)}`)
    console.log(`  Version:       ${chalk.gray(manifest?.version || '1.0.0')}`)
    console.log(`  Size:          ${chalk.gray(`${sourceSize} bytes`)}`)
    console.log(`  Code Hash:     ${chalk.gray(codeHash.substring(0, 24) + '...')}`)
    console.log(`  Contract ID:   ${chalk.gray(result.contractId)}`)
    console.log(`  Transaction:   ${chalk.gray(result.transactionId)}`)
    console.log(`  Status:        ${chalk.yellow('Pending block inclusion')}`)
    console.log(chalk.gray('━'.repeat(50)))
    console.log()
    console.log(chalk.bold('Next Steps:'))
    console.log(`  1. Wait for block production`)
    console.log(`  2. Contract will be callable after confirmation`)
    console.log()

  } catch (error: any) {
    deploySpinner.error({ text: 'Deployment failed' })
    console.log(chalk.red(`\n✗ Error: ${error.message}\n`))
    process.exit(1)
  }
}
