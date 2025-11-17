/**
 * tana start
 *
 * Starts all Tana services (mesh, t4, ledger) in the correct order.
 * Runs in foreground with health checks and graceful shutdown.
 */

import chalk from 'chalk'
import {
  readGlobalConfig,
  isLedgerReachable,
  getLedgerUrl
} from '../../utils/config'
import { ServiceOrchestrator } from './orchestrator'

export async function start(chainName?: string) {
  console.log(chalk.bold('\n🚀 Starting Tana...\n'))

  // Check if already running
  const ledgerUrl = getLedgerUrl()
  if (await isLedgerReachable()) {
    console.log(chalk.yellow(`✗ Ledger already running at ${ledgerUrl}`))
    console.log(chalk.gray(`\nStop the other instance first, or use a different port.\n`))
    process.exit(1)
  }

  // Determine which chain to start
  let targetChain = chainName
  if (!targetChain) {
    const config = readGlobalConfig()
    targetChain = config?.defaultChain || 'local'
  }

  console.log(chalk.gray(`Chain: ${chalk.cyan(targetChain)}`))
  console.log()

  // Start all services using orchestrator
  const orchestrator = new ServiceOrchestrator()
  await orchestrator.startAll()
}
