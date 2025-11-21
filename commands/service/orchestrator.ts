/**
 * Service Orchestrator
 *
 * Manages startup, shutdown, and health checking of all Tana services
 *
 * Supports two modes:
 * - In-process: Services bundled into binary (production)
 * - Subprocess: Services run via bun (development)
 */

import { serve, type Server } from 'bun'
import chalk from 'chalk'
import { spawn, type Subprocess, which } from 'bun'
import { homedir } from 'os'
import { existsSync, realpathSync } from 'fs'
import path from 'path'

// Conditional imports for bundled services (only available when bundled)
let ledgerService: any
let identityService: any
let notificationsService: any

/**
 * Detect if running from compiled binary
 */
function isCompiledBinary(): boolean {
  // Bun sets this to true when running from compiled binary
  return Bun.main.endsWith('.exe') || !Bun.main.includes('node_modules')
}

/**
 * Load bundled services (only works when services are bundled into binary)
 */
async function loadBundledServices() {
  try {
    ledgerService = await import('../../services/ledger/src/index')
    identityService = await import('../../services/identity/src/index')
    notificationsService = await import('../../services/notifications/src/index')
    return true
  } catch (error) {
    return false
  }
}

/**
 * Find the bun executable
 * IMPORTANT: Do NOT resolve symlinks, as compiled binaries will embed
 * the resolved path, which breaks when bun is upgraded to a new version
 */
function getBunPath(): string {
  // Try to find bun in PATH
  const bunPath = which('bun')
  if (bunPath) {
    return bunPath
  }

  // Common installation paths (check if they exist)
  const commonPaths = [
    '/opt/homebrew/bin/bun',  // macOS Homebrew
    '/usr/local/bin/bun',      // Linux/macOS
    '/home/linuxbrew/.linuxbrew/bin/bun',  // Linux Homebrew
  ]

  for (const checkPath of commonPaths) {
    if (existsSync(checkPath)) {
      return checkPath
    }
  }

  // Fallback to 'bun' and hope it's in PATH
  return 'bun'
}

interface ServiceConfig {
  name: string
  port: number
  cwd: string  // Working directory to run from
  env?: Record<string, string>
  required: boolean
  healthCheck?: string
}

interface RunningService {
  name: string
  port: number
  process?: Subprocess
  server?: Server
  healthy: boolean
  inProcess: boolean  // True if running as in-process server, false if subprocess
}

const HEALTH_CHECK_TIMEOUT = 5000 // 5 seconds
const HEALTH_CHECK_RETRIES = 10
const HEALTH_CHECK_INTERVAL = 1000 // 1 second

/**
 * Check if a service is healthy via HTTP health endpoint
 */
async function checkHealth(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(HEALTH_CHECK_TIMEOUT)
    })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Wait for service to become healthy
 */
async function waitForHealth(url: string, serviceName: string): Promise<boolean> {
  console.log(chalk.gray(`   Waiting for ${serviceName} to be ready...`))

  for (let i = 0; i < HEALTH_CHECK_RETRIES; i++) {
    if (await checkHealth(url)) {
      return true
    }
    await new Promise(resolve => setTimeout(resolve, HEALTH_CHECK_INTERVAL))
  }

  return false
}

/**
 * Start a service in-process (bundled into binary)
 */
async function startServiceInProcess(serviceName: string, port: number, env?: Record<string, string>): Promise<Server | null> {
  // Set environment variables
  if (env) {
    for (const [key, value] of Object.entries(env)) {
      process.env[key] = value
    }
  }
  process.env.PORT = String(port)

  // Get the service module
  let serviceModule: any
  switch (serviceName) {
    case 'ledger':
      serviceModule = ledgerService?.default
      break
    case 'identity':
      serviceModule = identityService?.default
      break
    case 'notifications':
      serviceModule = notificationsService?.default
      break
    default:
      throw new Error(`Unknown service: ${serviceName}`)
  }

  if (!serviceModule) {
    throw new Error(`Service ${serviceName} not bundled`)
  }

  // Start the server
  const server = serve({
    port: serviceModule.port || port,
    fetch: serviceModule.fetch
  })

  return server
}

/**
 * Get path to standalone binary for a service (if it exists)
 */
function getStandaloneBinaryPath(serviceName: string): string | null {
  // Check for standalone binaries in the dist directory
  const binaryName = `tana-${serviceName}`

  // Try relative to actual executable (for compiled binary)
  // Use process.execPath instead of Bun.main to get real filesystem path
  const relativeToExec = path.join(path.dirname(process.execPath), binaryName)
  if (existsSync(relativeToExec)) {
    return relativeToExec
  }

  // Try in dist directory (for development)
  const inDist = new URL(`../../dist/${binaryName}`, import.meta.url).pathname
  if (existsSync(inDist)) {
    return inDist
  }

  return null
}

/**
 * Start a service in a subprocess
 */
async function startServiceProcess(config: ServiceConfig): Promise<Subprocess> {
  const env = {
    ...process.env,
    PORT: String(config.port),
    ...config.env
  }

  // Check if standalone binary exists
  const binaryPath = getStandaloneBinaryPath(config.name)

  if (binaryPath) {
    // Spawn standalone binary
    const proc = spawn({
      cmd: [binaryPath],
      env,
      stdout: 'pipe',
      stderr: 'pipe'
    })
    return proc
  } else {
    // Fall back to bun run start (development mode)
    const proc = spawn({
      cmd: ['bun', 'run', 'start'],
      cwd: config.cwd,
      env,
      stdout: 'pipe',
      stderr: 'pipe'
    })
    return proc
  }
}

/**
 * Service Orchestrator
 */
export class ServiceOrchestrator {
  private services: RunningService[] = []
  private shuttingDown = false
  private useInProcess = false

  /**
   * Start all services in dependency order
   */
  async startAll(options: { dev?: boolean } = {}) {
    console.log(chalk.bold('\n🚀 Starting Tana Services...\n'))
    console.log(chalk.gray('━'.repeat(60)))
    console.log()

    // Load env file if exists
    await this.loadEnvironment()

    // Detect mode and load services if bundled
    const bundledAvailable = await loadBundledServices()
    this.useInProcess = bundledAvailable && !options.dev

    if (this.useInProcess) {
      console.log(chalk.gray('✓ Running services in-process (bundled mode)'))
    } else {
      console.log(chalk.gray('✓ Running services as subprocesses (development mode)'))
    }
    console.log()

    // Load validator config (if exists)
    const { getValidatorConfig } = await import('../../utils/config')
    const validatorConfig = getValidatorConfig()

    // Define services in startup order (dependencies first)
    // mesh and t4 run as standalone binaries
    // ledger, identity, notifications run in-process (bundled)
    // consensus runs as standalone binary (if validator configured)
    const serviceConfigs: ServiceConfig[] = [
      {
        name: 'mesh',
        port: 8190,
        cwd: new URL('../../services/mesh', import.meta.url).pathname,
        required: true,
        healthCheck: 'http://localhost:8190/health'
      },
      {
        name: 't4',
        port: 8180,
        cwd: new URL('../../services/t4', import.meta.url).pathname,
        required: true,
        healthCheck: 'http://localhost:8180/health',
        env: {
          CONTENT_DIR: process.env.CONTENT_DIR || path.join(homedir(), '.tana', 'content')
        }
      },
      {
        name: 'ledger',
        port: 8080,
        cwd: new URL('../../services/ledger', import.meta.url).pathname,
        required: true,
        healthCheck: 'http://localhost:8080/health',
        env: {
          MESH_URL: process.env.MESH_URL || 'http://localhost:8190',
          T4_URL: process.env.T4_URL || 'http://localhost:8180',
          CONSENSUS_ENABLED: validatorConfig ? 'true' : 'false',
          VALIDATOR_ID: validatorConfig?.validatorId || 'val_default',
          CONSENSUS_URL: validatorConfig ? `http://localhost:${validatorConfig.httpPort}` : 'http://localhost:9001',
        }
      },
      {
        name: 'identity',
        port: 8090,
        cwd: new URL('../../services/identity', import.meta.url).pathname,
        required: false,
        healthCheck: 'http://localhost:8090/health'
      },
      {
        name: 'notifications',
        port: 8091,
        cwd: new URL('../../services/notifications', import.meta.url).pathname,
        required: false,
        healthCheck: 'http://localhost:8091/health'
      }
    ]

    // Add consensus service if validator is configured
    if (validatorConfig) {
      serviceConfigs.push({
        name: 'consensus',
        port: validatorConfig.wsPort,
        cwd: new URL('../../services/consensus', import.meta.url).pathname,
        required: false,
        healthCheck: `http://localhost:${validatorConfig.httpPort}/health`,
        env: {
          VALIDATOR_ID: validatorConfig.validatorId,
          CONSENSUS_PORT: String(validatorConfig.wsPort),
          HTTP_PORT: String(validatorConfig.httpPort),
          PEERS: JSON.stringify(validatorConfig.peers),
          DATABASE_URL: process.env.DATABASE_URL || 'postgres://tana:tana_dev_password@localhost:5432/tana',
        }
      })
    }

    // Start services sequentially
    for (const config of serviceConfigs) {
      try {
        await this.startService(config)
      } catch (error) {
        console.error(chalk.red(`✗ Failed to start ${config.name}: ${error}`))

        if (config.required) {
          console.log(chalk.yellow('\nShutting down due to required service failure...\n'))
          await this.stopAll()
          process.exit(1)
        }
      }
    }

    // Setup graceful shutdown
    this.setupShutdownHandlers()

    // Display status
    this.displayStatus()

    // Keep process alive
    await new Promise(() => {})
  }

  /**
   * Start a single service
   */
  private async startService(config: ServiceConfig): Promise<void> {
    console.log(chalk.bold(`Starting ${chalk.cyan(config.name)}...`))

    // Determine if this service should run in-process
    const bundledServices = ['ledger', 'identity', 'notifications']
    const shouldRunInProcess = this.useInProcess && bundledServices.includes(config.name)

    const service: RunningService = {
      name: config.name,
      port: config.port,
      healthy: false,
      inProcess: shouldRunInProcess
    }

    try {
      if (shouldRunInProcess) {
        // Start service in-process (bundled)
        const server = await startServiceInProcess(config.name, config.port, config.env)
        if (!server) {
          throw new Error(`Failed to start ${config.name} in-process`)
        }
        service.server = server
      } else {
        // Start service as subprocess (standalone binary or development)
        const proc = await startServiceProcess(config)
        service.process = proc
      }

      // Wait for health check if configured
      if (config.healthCheck) {
        const healthy = await waitForHealth(config.healthCheck, config.name)

        if (!healthy) {
          throw new Error(`Health check failed after ${HEALTH_CHECK_RETRIES} retries`)
        }

        service.healthy = true
      }

      this.services.push(service)

      const mode = shouldRunInProcess ? 'in-process' : 'standalone binary'
      console.log(chalk.green(`✓ ${config.name} started on port ${config.port} (${mode})`))
      console.log()

    } catch (error: any) {
      // Kill process/server if it was started
      if (service.process) {
        service.process.kill()
      }
      if (service.server) {
        service.server.stop()
      }

      throw new Error(error.message || 'Failed to start service')
    }
  }

  /**
   * Stop all services
   */
  async stopAll(): Promise<void> {
    if (this.shuttingDown) return
    this.shuttingDown = true

    console.log(chalk.yellow('\n\nShutting down services...\n'))

    // Stop services in reverse order
    for (const service of this.services.reverse()) {
      console.log(chalk.gray(`  Stopping ${service.name}...`))

      try {
        if (service.server) {
          service.server.stop()
        }
        if (service.process) {
          service.process.kill()
        }
        // Wait a bit for graceful shutdown
        await new Promise(resolve => setTimeout(resolve, 500))
      } catch (error) {
        console.log(chalk.red(`  Failed to stop ${service.name}`))
      }
    }

    console.log(chalk.green('\n✓ All services stopped\n'))
  }

  /**
   * Setup shutdown handlers
   */
  private setupShutdownHandlers(): void {
    const shutdown = async () => {
      await this.stopAll()
      process.exit(0)
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
    process.on('exit', () => {
      if (!this.shuttingDown) {
        this.stopAll()
      }
    })
  }

  /**
   * Display running services status
   */
  private displayStatus(): void {
    console.log(chalk.gray('━'.repeat(60)))
    console.log(chalk.bold.green('All Services Running:\n'))

    for (const service of this.services) {
      const status = service.healthy ? chalk.green('✓ healthy') : chalk.yellow('○ unknown')
      console.log(`  ${chalk.cyan(service.name.padEnd(15))} http://localhost:${service.port}  ${status}`)
    }

    console.log()
    console.log(chalk.gray('━'.repeat(60)))
    console.log()
    console.log(chalk.gray('Press Ctrl+C to stop all services'))
    console.log()
  }

  /**
   * Load environment variables from .env file
   */
  private async loadEnvironment(): Promise<void> {
    const rootEnvPath = new URL('../../../.env', import.meta.url).pathname

    if (!existsSync(rootEnvPath)) {
      return
    }

    try {
      const envContent = await Bun.file(rootEnvPath).text()
      const envVars = envContent
        .split('\n')
        .filter(line => line && !line.startsWith('#'))
        .reduce((acc, line) => {
          const [key, ...values] = line.split('=')
          if (key && values.length) {
            const value = values.join('=').trim().replace(/^['"]|['"]$/g, '')
            if (!process.env[key.trim()]) {
              process.env[key.trim()] = value
            }
            acc[key.trim()] = value
          }
          return acc
        }, {} as Record<string, string>)

      if (Object.keys(envVars).length > 0) {
        console.log(chalk.gray('✓ Loaded environment from .env file'))
        console.log()
      }
    } catch (error) {
      // Ignore errors loading .env
    }
  }
}
