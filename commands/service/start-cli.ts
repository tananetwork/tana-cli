/**
 * tana start
 *
 * CLI interface for startup manager (headless/background mode)
 */

import chalk from 'chalk'
import { createSpinner } from 'nanospinner'
import { StartupManager } from '../../services/startup-manager'
import { readGlobalConfig, readChainConfig } from '../../utils/config'

export async function startCLI(chainName?: string, genesis?: boolean) {
  console.log(chalk.bold('\n🚀 Starting Tana...\n'))

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

  // Load chain configuration
  const chainConfig = readChainConfig(targetChain)
  const manager = new StartupManager(chainConfig, genesis)
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

  manager.on('complete', () => {
    console.log()
    console.log(chalk.gray('━'.repeat(60)))
    console.log(chalk.bold.green('✓ All services running'))
    console.log()
    displayServiceURLs(manager)
    console.log(chalk.gray('━'.repeat(60)))
    console.log()
    console.log(chalk.gray('Press Ctrl+C to stop all services'))
    console.log()
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
 * Display running service URLs
 */
function displayServiceURLs(manager: StartupManager): void {
  const services = StartupManager.getServices()
  const statuses = manager.getStatuses()

  for (const service of services) {
    if (service.type === 'docker') continue // Skip Docker services

    const status = statuses.get(service.name)
    if (status === 'running' && service.port) {
      const url = `http://localhost:${service.port}`
      const statusText = chalk.green('● healthy')
      console.log(`  ${chalk.cyan(service.displayName.padEnd(15))} ${url.padEnd(30)} ${statusText}`)
    }
  }
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
