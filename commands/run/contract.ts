/**
 * tana run contract
 *
 * Securely execute contracts using isolated tana-runtime subprocess
 *
 * This module provides:
 * 1. CLI command: `tana run contract <path>` for testing
 * 2. Programmatic API: `executeContractSecurely()` for block producer
 */

import { createSpinner } from 'nanospinner'
import chalk from 'chalk'
import { existsSync } from 'fs'
import { resolve } from 'path'

/**
 * Contract execution context
 */
export interface ContractExecutionContext {
  owner: {
    id: string
    username: string
    publicKey: string
  }
  caller: {
    id: string
    username: string
    publicKey: string
    nonce: number
  } | null
  block: {
    height: number
    timestamp: number
    hash: string
    producer: string
  }
  input: any
  contractName: string
}

/**
 * Contract execution result
 */
export interface ContractExecutionResult {
  success: boolean
  result?: any
  gasUsed?: number
  error?: string
}

/**
 * Programmatic API: Execute contract code securely in isolated subprocess
 *
 * Used by block producer (produce-block.ts) to execute contracts with full isolation.
 *
 * @param code - Contract source code (TypeScript)
 * @param context - Execution context (owner, caller, block, input)
 * @returns Execution result with success status and returned data
 */
export async function executeContractSecurely(
  code: string,
  context: ContractExecutionContext
): Promise<ContractExecutionResult> {
  // Find tana-runtime binary
  const runtimePath = findTanaRuntime()
  if (!runtimePath) {
    return {
      success: false,
      error: 'tana-runtime binary not found. Run: cd runtime && cargo build --release'
    }
  }

  // Write contract code to temp file (tana-runtime expects a file path)
  const tmpDir = '/tmp/tana-contracts'
  await Bun.$`mkdir -p ${tmpDir}`

  const tmpFile = `${tmpDir}/contract-${Date.now()}-${Math.random().toString(36).slice(2)}.ts`
  await Bun.write(tmpFile, code)

  try {
    // Spawn tana-runtime subprocess with contract file
    // TODO: Add --context flag to pass execution context as JSON
    // For now, runtime uses mock context
    const proc = Bun.spawn({
      cmd: [runtimePath, tmpFile],
      stdout: 'pipe',
      stderr: 'pipe',
    })

    const [stdout, stderr] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
    ])

    const exitCode = await proc.exited

    // Clean up temp file
    await Bun.$`rm -f ${tmpFile}`

    if (exitCode !== 0) {
      return {
        success: false,
        error: `Contract execution failed: ${stderr}`
      }
    }

    // tana-runtime prints result to stderr (using eprintln)
    // Parse the result from runtime output
    // For now, return success (need to enhance runtime to output JSON)
    return {
      success: true,
      result: null, // TODO: Parse JSON result from stdout
      gasUsed: 0    // TODO: Get from runtime output
    }
  } catch (error: any) {
    // Clean up temp file on error
    await Bun.$`rm -f ${tmpFile}`.catch(() => {})

    return {
      success: false,
      error: `Failed to execute contract: ${error.message}`
    }
  }
}

/**
 * CLI Command: Run contract file for testing
 *
 * @param contractPath - Path to contract file
 */
export async function runContract(contractPath: string) {
  console.log(chalk.bold(`\n🏃 Running contract: ${contractPath}\n`))

  const spinner = createSpinner('Checking contract file...').start()

  // Resolve path
  const fullPath = resolve(contractPath)

  if (!existsSync(fullPath)) {
    spinner.error({ text: 'Contract file not found' })
    console.log(chalk.gray(`\nPath: ${fullPath}\n`))
    process.exit(1)
  }

  spinner.success({ text: 'Contract file found' })

  // Find tana-runtime binary
  const runtimePath = findTanaRuntime()
  if (!runtimePath) {
    console.log(chalk.red('\n❌ tana-runtime binary not found\n'))
    console.log(chalk.gray('Build it with: cd runtime && cargo build --release\n'))
    process.exit(1)
  }

  spinner.update({ text: 'Executing contract in isolated runtime...' })

  console.log(chalk.gray('━'.repeat(50)))
  console.log()

  // Run contract directly with tana-runtime
  const proc = Bun.spawn({
    cmd: [runtimePath, fullPath],
    stdout: 'inherit',
    stderr: 'inherit',
  })

  const exitCode = await proc.exited

  console.log()
  console.log(chalk.gray('━'.repeat(50)))

  if (exitCode === 0) {
    console.log(chalk.green('\n✅ Contract executed successfully\n'))
  } else {
    console.log(chalk.red(`\n❌ Contract execution failed (exit code: ${exitCode})\n`))
    process.exit(1)
  }
}

/**
 * Find tana-runtime binary
 *
 * Searches in common locations relative to CLI
 */
function findTanaRuntime(): string | null {
  const paths = [
    // Development: relative to cli/
    resolve(__dirname, '../../../runtime/target/release/tana-runtime'),
    // Development: relative to project root
    resolve(process.cwd(), 'runtime/target/release/tana-runtime'),
    // Installed globally
    '/usr/local/bin/tana-runtime',
  ]

  for (const path of paths) {
    if (existsSync(path)) {
      return path
    }
  }

  return null
}
