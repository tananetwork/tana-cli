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
import { startWeb } from './start-web'

export async function start(options: { mode?: string; chain?: string; genesis?: boolean } = {}) {
  switch (options.mode) {
    case 'tui':
      // Launch TUI mode (terminal dashboard) - dynamic import to avoid loading deps
      const { startTUI } = await import('./start-tui')
      await startTUI(options.chain, options.genesis)
      break

    case 'webui':
      // Launch WebUI mode (browser dashboard)
      await startWeb(options.chain, options.genesis)
      break

    default:
      // Launch CLI mode (spinners, logs)
      // Only CLI mode prevents duplicate startup
      const ledgerUrl = getLedgerUrl()
      if (await isLedgerReachable()) {
        console.log(chalk.green(`✓ Services already running at ${ledgerUrl}\n`))
        console.log(chalk.gray('To view dashboard:  ') + chalk.cyan('tana start webui'))
        console.log(chalk.gray('To stop services:   ') + chalk.cyan('tana stop'))
        console.log(chalk.gray('To view status:     ') + chalk.cyan('tana status'))
        console.log()
        process.exit(0) // Exit cleanly (not an error)
      }
      await startCLI(options.chain, options.genesis)
      break
  }
}
