/**
 * tana start [mode]
 *
 * Starts all Tana services using shared startup manager.
 * Three interfaces:
 * - tana start: CLI mode (spinners, logs)
 * - tana start tui: TUI mode (terminal dashboard)
 * - tana start webui: WebUI mode (browser dashboard)
 */

import chalk from 'chalk'
import { isLedgerReachable, getLedgerUrl } from '../../utils/config'
import { startCLI } from './start-cli'
import { startTUI } from './start-tui'
import { startWeb } from './start-web'

export async function start(options: { mode?: string; chain?: string } = {}) {
  // Check if already running
  const ledgerUrl = getLedgerUrl()
  if (await isLedgerReachable()) {
    console.log(chalk.yellow(`✗ Ledger already running at ${ledgerUrl}`))
    console.log(chalk.gray(`\nStop the other instance first, or use a different port.\n`))
    process.exit(1)
  }

  switch (options.mode) {
    case 'tui':
      // Launch TUI mode (terminal dashboard)
      await startTUI(options.chain)
      break

    case 'webui':
      // Launch WebUI mode (browser dashboard)
      await startWeb(options.chain)
      break

    default:
      // Launch CLI mode (spinners, logs)
      await startCLI(options.chain)
      break
  }
}
