/**
 * tana start tui
 *
 * TUI interface for startup manager (terminal dashboard)
 * Opens OpenTUI terminal interface
 */

import chalk from 'chalk'
import { createSpinner } from 'nanospinner'
import { StartupManager } from '../../services/startup-manager'
import { readGlobalConfig, isLedgerReachable, getLedgerUrl } from '../../utils/config'

export async function startTUI(chainName?: string, genesis?: boolean) {
  console.log(chalk.bold('\n📊 Starting Tana TUI Dashboard...\n'))

  // Determine which chain to start
  let targetChain = chainName
  if (!targetChain) {
    const config = readGlobalConfig()
    targetChain = config?.defaultChain || 'local'
  }

  console.log(chalk.gray(`Chain: ${chalk.cyan(targetChain)}`))
  if (genesis) {
    console.log(chalk.gray(`Mode: ${chalk.yellow('Genesis initialization')}`))
  }
  console.log()

  // Check if services are already running
  const servicesRunning = await isLedgerReachable()

  if (servicesRunning) {
    const ledgerUrl = getLedgerUrl()
    console.log(chalk.green(`✓ Services already running at ${ledgerUrl}`))
    console.log(chalk.gray('  Skipping startup, launching TUI...\n'))

    // Just launch the TUI
    await launchTUI()

    // Keep process alive
    await new Promise(() => {})
    return
  }

  const manager = new StartupManager(null, genesis)
  const spinners = new Map<string, ReturnType<typeof createSpinner>>()

  // Listen to events
  manager.on('message', (message: string) => {
    console.log(chalk.gray(message))
  })

  manager.on('service_status', ({ service, status }) => {
    if (!spinners.has(service)) {
      const serviceInfo = StartupManager.getServices().find(s => s.name === service)
      const displayName = serviceInfo?.displayName || service
      spinners.set(service, createSpinner(displayName).start())
    }

    const spinner = spinners.get(service)!

    switch (status) {
      case 'starting':
        spinner.update({ text: `Starting ${service}...` })
        break
      case 'running':
        spinner.success({ text: `${service} running` })
        break
      case 'failed':
        spinner.error({ text: `${service} failed` })
        break
    }
  })

  manager.on('error', (error: string) => {
    console.error(chalk.red(`✗ ${error}`))
  })

  manager.on('complete', async () => {
    console.log()
    console.log(chalk.gray('━'.repeat(60)))
    console.log(chalk.bold.green('✓ All services running'))
    console.log()

    // Launch TUI
    await launchTUI()
  })

  // Setup graceful shutdown
  setupShutdownHandlers(manager)

  try {
    await manager.startAll()

    // Keep process alive
    await new Promise(() => {})
  } catch (error) {
    console.error(chalk.red(`\n✗ Startup failed: ${error}\n`))
    await manager.stopAll()
    process.exit(1)
  }
}

/**
 * Launch TUI interface
 */
async function launchTUI() {
  console.log(chalk.cyan('📊 Launching TUI dashboard...'))
  console.log()

  // TODO: Implement OpenTUI dashboard launch
  // For now, show placeholder message
  console.log(chalk.yellow('⚠️  TUI dashboard not yet implemented'))
  console.log(chalk.gray('   TUI interface will display:'))
  console.log(chalk.gray('   - Service status grid'))
  console.log(chalk.gray('   - Real-time logs'))
  console.log(chalk.gray('   - Validator metrics'))
  console.log(chalk.gray('   - Block production status'))
  console.log()
  console.log(chalk.gray('   For now, use WebUI: tana start webui'))
  console.log()
  console.log(chalk.gray('━'.repeat(60)))
  console.log()
  console.log(chalk.gray('Press Ctrl+C to stop all services'))
  console.log()
}

/**
 * Setup graceful shutdown handlers
 */
function setupShutdownHandlers(manager: StartupManager): void {
  let shuttingDown = false

  const shutdown = async () => {
    if (shuttingDown) return
    shuttingDown = true

    console.log(chalk.yellow('\n\nShutting down...\n'))
    await manager.stopAll()
    process.exit(0)
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}
