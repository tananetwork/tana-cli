/**
 * Service Orchestrator
 *
 * Manages startup, shutdown, and health checking of all Tana services
 */

import { serve } from 'bun'
import chalk from 'chalk'
import { spawn, type Subprocess, which } from 'bun'
import { homedir } from 'os'
import { existsSync, realpathSync } from 'fs'
import path from 'path'

/**
 * Find the bun executable and resolve symlinks
 */
function getBunPath(): string {
  // Try to find bun in PATH
  const bunPath = which('bun')
  if (bunPath) {
    try {
      // Resolve symlink to real path
      return realpathSync(bunPath)
    } catch {
      return bunPath
    }
  }

  // Common installation paths
  const commonPaths = [
    '/opt/homebrew/bin/bun',  // macOS Homebrew
    '/usr/local/bin/bun',      // Linux/macOS
    '/home/linuxbrew/.linuxbrew/bin/bun',  // Linux Homebrew
  ]

  for (const checkPath of commonPaths) {
    if (existsSync(checkPath)) {
      try {
        // Resolve symlink to real path
        return realpathSync(checkPath)
      } catch {
        return checkPath
      }
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
  server?: any
  healthy: boolean
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
 * Start a service in a subprocess
 */
async function startServiceProcess(config: ServiceConfig): Promise<Subprocess> {
  const env = {
    ...process.env,
    PORT: String(config.port),
    ...config.env
  }

  const bunPath = getBunPath()

  const proc = spawn({
    cmd: [bunPath, 'run', 'start'],
    cwd: config.cwd,
    env,
    stdout: 'pipe',
    stderr: 'pipe'
  })

  return proc
}

/**
 * Service Orchestrator
 */
export class ServiceOrchestrator {
  private services: RunningService[] = []
  private shuttingDown = false

  /**
   * Start all services in dependency order
   */
  async startAll(options: { dev?: boolean } = {}) {
    console.log(chalk.bold('\n🚀 Starting Tana Services...\n'))
    console.log(chalk.gray('━'.repeat(60)))
    console.log()

    // Load env file if exists
    await this.loadEnvironment()

    // Define services in startup order (dependencies first)
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
          T4_URL: process.env.T4_URL || 'http://localhost:8180'
        }
      }
    ]

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

    const service: RunningService = {
      name: config.name,
      port: config.port,
      healthy: false
    }

    try {
      // Start the service process
      const proc = await startServiceProcess(config)
      service.process = proc

      // Wait for health check if configured
      if (config.healthCheck) {
        const healthy = await waitForHealth(config.healthCheck, config.name)

        if (!healthy) {
          throw new Error(`Health check failed after ${HEALTH_CHECK_RETRIES} retries`)
        }

        service.healthy = true
      }

      this.services.push(service)

      console.log(chalk.green(`✓ ${config.name} started on port ${config.port}`))
      console.log()

    } catch (error: any) {
      // Kill process if it was started
      if (service.process) {
        service.process.kill()
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
        if (service.process) {
          service.process.kill()
          // Wait a bit for graceful shutdown
          await new Promise(resolve => setTimeout(resolve, 500))
        }
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
