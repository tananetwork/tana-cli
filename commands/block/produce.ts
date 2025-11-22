/**
 * tana block produce
 *
 * Produce a new block from pending transactions
 */

import { createSpinner } from 'nanospinner'
import chalk from 'chalk'
import { $ } from 'bun'

export async function produceBlock() {
  console.log(chalk.bold('\n🔨 Producing Block\n'))

  const spinner = createSpinner('Checking ledger service...').start()

  // Check if ledger is running
  try {
    const response = await fetch('http://localhost:8080/health', {
      signal: AbortSignal.timeout(2000)
    })

    if (!response.ok) {
      spinner.error({ text: 'Ledger service is not responding' })
      console.log(chalk.gray('\n💡 Start services first: tana start\n'))
      process.exit(1)
    }

    spinner.success({ text: 'Ledger service is running' })
  } catch (error) {
    spinner.error({ text: 'Cannot connect to ledger service' })
    console.log(chalk.gray('\n💡 Start services first: tana start\n'))
    process.exit(1)
  }

  // Run block production
  spinner.start({ text: 'Producing new block...' })

  try {
    // Execute the produce-block script
    await $`cd services/ledger && bun run src/scripts/produce-block.ts`

    spinner.success({ text: 'Block produced successfully' })
    console.log(chalk.green('\n✅ Block committed to blockchain\n'))
  } catch (error: any) {
    spinner.error({ text: 'Block production failed' })
    console.log(chalk.red(`\n❌ Error: ${error.message}\n`))
    process.exit(1)
  }
}
