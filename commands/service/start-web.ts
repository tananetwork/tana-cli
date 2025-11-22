/**
 * tana start webui
 *
 * WebUI interface for startup manager (browser-based dashboard)
 * Opens topology dashboard in default browser
 */

import chalk from 'chalk'
import { createSpinner } from 'nanospinner'
import { StartupManager } from '../../services/startup-manager'
import { readGlobalConfig, isLedgerReachable, getLedgerUrl } from '../../utils/config'
import { spawn } from 'bun'

export async function startWeb(chainName?: string, genesis?: boolean) {
  console.log(chalk.bold('\n🌐 Starting Tana Web Dashboard...\n'))

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
    console.log(chalk.gray('  Skipping startup, launching dashboard...\n'))

    // Just launch the dashboard
    await startFrontendServer()

    // Keep process alive
    await new Promise(() => {})
    return
  }

  const manager = new StartupManager(null, genesis)
  const spinners = new Map<string, ReturnType<typeof createSpinner>>()
  let topologyReady = false

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

        // Check if topology is ready
        if (service === 'topology') {
          topologyReady = true
        }
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

    // Check if topology backend is running
    if (!topologyReady) {
      console.log(chalk.yellow('⚠️  Topology backend not available'))
      console.log(chalk.gray('   Dashboard may not display data\n'))
    }

    // Start frontend dev server or serve built files
    await startFrontendServer()
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
 * Start frontend server
 */
async function startFrontendServer() {
  // WebUI is embedded in cli/webui/
  const webuiPath = new URL('../../../webui', import.meta.url).pathname

  console.log(chalk.cyan('🌐 Starting web dashboard...'))
  console.log()

  // Check if webui frontend exists
  const fs = require('fs')
  if (!fs.existsSync(webuiPath)) {
    console.log(chalk.red('✗ WebUI frontend not found'))
    console.log(chalk.gray(`   Expected: ${webuiPath}`))
    console.log()
    return
  }

  // Check if dist/ folder exists (production build)
  const distPath = `${webuiPath}/dist`
  const hasBuiltFiles = fs.existsSync(distPath)

  if (hasBuiltFiles) {
    // Serve built files
    await serveBuiltFiles(distPath)
  } else {
    // Run dev server
    await runDevServer(webuiPath)
  }
}

/**
 * Serve built static files
 */
async function serveBuiltFiles(distPath: string) {
  console.log(chalk.gray('   Serving built files...'))

  // Start a simple static file server
  const { serve } = await import('bun')

  const server = serve({
    port: 5173,
    async fetch(req) {
      const url = new URL(req.url)
      let filePath = distPath + url.pathname

      // Default to index.html for SPA routing
      const fs = require('fs')
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = `${distPath}/index.html`
      }

      const file = Bun.file(filePath)
      return new Response(file)
    },
  })

  const dashboardUrl = `http://localhost:${server.port}`
  console.log(chalk.green(`✓ Dashboard running at ${chalk.cyan(dashboardUrl)}`))
  console.log()
  console.log(chalk.gray('━'.repeat(60)))
  console.log()

  // Open browser
  await openBrowser(dashboardUrl)

  console.log(chalk.gray('Press Ctrl+C to stop all services'))
  console.log()
}

/**
 * Run Vite dev server
 */
async function runDevServer(webuiPath: string) {
  console.log(chalk.gray('   Starting Vite dev server...'))

  // Check if node_modules exists
  const fs = require('fs')
  const needsInstall = !fs.existsSync(`${webuiPath}/node_modules`)

  if (needsInstall) {
    console.log(chalk.gray('   Installing dependencies...'))
    const installProc = spawn(['npm', 'install'], {
      cwd: webuiPath,
      stdout: 'ignore',
      stderr: 'pipe'
    })
    await installProc.exited

    if (installProc.exitCode !== 0) {
      console.log(chalk.red('✗ Failed to install dependencies'))
      return
    }
  }

  // Start Vite dev server in background
  const viteProc = spawn(['npm', 'run', 'dev'], {
    cwd: webuiPath,
    stdout: 'pipe',
    stderr: 'pipe',
  })

  // Wait for dev server to be ready
  let ready = false
  const reader = viteProc.stdout.getReader()

  const checkReady = async () => {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const text = new TextDecoder().decode(value)
      if (text.includes('Local:') || text.includes('localhost:5173')) {
        ready = true
        break
      }
    }
  }

  // Wait up to 30 seconds for ready
  const timeout = setTimeout(() => {
    if (!ready) {
      console.log(chalk.yellow('⚠️  Dev server taking longer than expected...'))
    }
  }, 30000)

  await Promise.race([
    checkReady(),
    new Promise(resolve => setTimeout(resolve, 30000))
  ])

  clearTimeout(timeout)

  if (ready) {
    const dashboardUrl = 'http://localhost:5173'
    console.log(chalk.green(`✓ Dashboard running at ${chalk.cyan(dashboardUrl)}`))
    console.log()
    console.log(chalk.gray('━'.repeat(60)))
    console.log()

    // Open browser
    await openBrowser(dashboardUrl)

    console.log(chalk.gray('Press Ctrl+C to stop all services'))
    console.log()
  } else {
    console.log(chalk.yellow('⚠️  Dev server started but not responding'))
    console.log(chalk.gray('   Try opening http://localhost:5173 manually'))
    console.log()
  }
}

/**
 * Open default browser
 */
async function openBrowser(url: string) {
  try {
    const os = require('os')
    const platform = os.platform()

    let command: string[]

    switch (platform) {
      case 'darwin':
        command = ['open', url]
        break
      case 'win32':
        command = ['cmd', '/c', 'start', url]
        break
      default:
        command = ['xdg-open', url]
        break
    }

    const proc = spawn(command, { stdout: 'ignore', stderr: 'ignore' })
    await proc.exited

    console.log(chalk.green(`✓ Opened browser to ${chalk.cyan(url)}`))
    console.log()
  } catch (error) {
    console.log(chalk.yellow(`⚠️  Could not open browser automatically`))
    console.log(chalk.gray(`   Open manually: ${url}`))
    console.log()
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
