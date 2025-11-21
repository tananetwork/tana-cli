/**
 * Startup Manager
 *
 * Shared startup logic used by both CLI and TUI interfaces.
 * Provides event-driven API for progress tracking.
 */

import { spawn, type Subprocess } from 'bun'
import { existsSync } from 'fs'
import { EventEmitter } from 'events'
import { Client } from 'pg'
import Redis from 'ioredis'
import {
  validateRequiredServices,
  type ChainConfig,
  type ServiceName,
  REQUIRED_SERVICES
} from '../utils/config'

export type ServiceStatus = 'stopped' | 'starting' | 'running' | 'failed'

export interface ServiceInfo {
  name: string
  displayName: string
  type: 'docker' | 'tana'
  port?: number
  required: boolean
  healthCheck?: string
}

export interface StartupEvent {
  type: 'service_status' | 'message' | 'error' | 'complete'
  service?: string
  status?: ServiceStatus
  message?: string
  error?: string
}

/**
 * Service definitions in startup order
 */
const SERVICES: ServiceInfo[] = [
  // Docker infrastructure (must start first)
  {
    name: 'postgres',
    displayName: 'PostgreSQL',
    type: 'docker',
    port: 5432,
    required: true
  },
  {
    name: 'redis',
    displayName: 'Redis',
    type: 'docker',
    port: 6379,
    required: true
  },

  // Tana services
  {
    name: 'mesh',
    displayName: 'Mesh',
    type: 'tana',
    port: 8190,
    required: true,
    healthCheck: 'http://localhost:8190/health'
  },
  {
    name: 't4',
    displayName: 'T4 Storage',
    type: 'tana',
    port: 8180,
    required: true,
    healthCheck: 'http://localhost:8180/health'
  },
  {
    name: 'ledger',
    displayName: 'Ledger',
    type: 'tana',
    port: 8080,
    required: true,
    healthCheck: 'http://localhost:8080/health'
  },
  {
    name: 'identity',
    displayName: 'Identity',
    type: 'tana',
    port: 8090,
    required: false,
    healthCheck: 'http://localhost:8090/health'
  },
  {
    name: 'notifications',
    displayName: 'Notifications',
    type: 'tana',
    port: 8091,
    required: false,
    healthCheck: 'http://localhost:8091/health'
  },
  {
    name: 'topology',
    displayName: 'Topology',
    type: 'tana',
    port: 8191,
    required: false,
    healthCheck: 'http://localhost:3001/health'
  }
]

export class StartupManager extends EventEmitter {
  private processes: Map<string, Subprocess> = new Map()
  private statuses: Map<string, ServiceStatus> = new Map()
  private chainConfig: ChainConfig | null = null

  constructor(chainConfig?: ChainConfig | null) {
    super()
    this.chainConfig = chainConfig || null

    // Initialize all services as stopped
    SERVICES.forEach(service => {
      this.statuses.set(service.name, 'stopped')
    })
  }

  /**
   * Start all services in dependency order
   */
  async startAll(): Promise<void> {
    this.emit('message', 'Starting Tana services...')

    try {
      // Validate configuration
      await this.validateConfig()

      // Check Docker is running
      await this.checkDockerRunning()

      // Start services in order
      for (const service of SERVICES) {
        await this.startService(service)
      }

      this.emit('complete', { success: true })
    } catch (error) {
      this.emit('error', error instanceof Error ? error.message : String(error))
      throw error
    }
  }

  /**
   * Validate that all required services have URLs defined in config
   */
  private async validateConfig(): Promise<void> {
    const missing = validateRequiredServices(this.chainConfig)

    if (missing.length > 0) {
      const configPath = '~/.config/tana/chains/<chain-name>.json'
      const serviceList = missing.map(s => `  • ${s}`).join('\n')

      const exampleConfig = missing.map(s => {
        const examples: Record<ServiceName, string> = {
          postgres: '"postgres": {\n    "url": "postgres://user:pass@localhost:5432"\n  }',
          redis: '"redis": {\n    "url": "redis://localhost:6379"\n  }',
          mesh: '"mesh": {\n    "url": "http://localhost:8190"\n  }',
          t4: '"t4": {\n    "url": "http://localhost:8180"\n  }',
          ledger: '"ledger": {\n    "url": "http://localhost:8080"\n  }',
          identity: '"identity": {\n    "url": "http://localhost:8090"\n  }',
          notifications: '"notifications": {\n    "url": "http://localhost:8091"\n  }',
          topology: '"topology": {\n    "url": "http://localhost:3001"\n  }'
        }
        return examples[s]
      }).join(',\n  ')

      throw new Error(
        `Configuration Error: Missing required services\n\n` +
        `The following required services have no URL defined:\n${serviceList}\n\n` +
        `Please add these to ${configPath}:\n\n` +
        `{\n  ${exampleConfig}\n}\n`
      )
    }
  }

  /**
   * Start a single service
   */
  private async startService(service: ServiceInfo): Promise<void> {
    try {
      this.updateStatus(service.name, 'starting')

      if (service.type === 'docker') {
        await this.startDockerService(service)
      } else {
        await this.startTanaService(service)
      }

      // Health check
      if (service.healthCheck) {
        await this.waitForHealthCheck(service.name, service.healthCheck)
      } else if (service.type === 'docker') {
        // For Docker services without HTTP, check if container is running
        await this.checkDockerContainer(service.name)
      }

      this.updateStatus(service.name, 'running')
    } catch (error) {
      this.updateStatus(service.name, 'failed')
      this.emit('error', `${service.displayName}: ${error}`)

      if (service.required) {
        throw new Error(`Required service ${service.displayName} failed to start`)
      }
    }
  }

  /**
   * Check if Docker daemon is running
   */
  private async checkDockerRunning(): Promise<void> {
    this.emit('message', 'Checking Docker...')

    // Check if Docker is installed
    try {
      const whichProc = spawn(['which', 'docker'], { stdout: 'pipe', stderr: 'ignore' })
      await whichProc.exited
      const whichOutput = await new Response(whichProc.stdout).text()

      if (!whichOutput.trim()) {
        throw new Error('Docker is not installed.\n\n' +
          '📦 Install Docker:\n' +
          '   • macOS/Windows: https://www.docker.com/products/docker-desktop\n' +
          '   • Linux: https://docs.docker.com/engine/install/\n\n' +
          'After installing, start Docker and try again.')
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('not installed')) {
        throw error
      }
      // If 'which' command failed for other reasons, continue to check if daemon is running
    }

    // Check if Docker daemon is running
    try {
      const proc = spawn(['docker', 'info'], { stdout: 'ignore', stderr: 'pipe' })
      const exitCode = await proc.exited

      if (exitCode !== 0) {
        const stderr = await new Response(proc.stderr).text()

        if (stderr.includes('Cannot connect') || stderr.includes('connection refused')) {
          throw new Error('Docker is installed but not running.\n\n' +
            '🐳 Start Docker:\n' +
            '   • macOS/Windows: Open Docker Desktop\n' +
            '   • Linux: sudo systemctl start docker\n\n' +
            'Then try again.')
        }

        throw new Error('Docker daemon not responding')
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Docker is not running. Please start Docker Desktop and try again.')
    }
  }

  /**
   * Start a Docker service via docker compose
   */
  private async startDockerService(service: ServiceInfo): Promise<void> {
    const composePath = this.getDockerComposePath()

    // Check if already running
    const checkProc = spawn(['docker', 'ps', '--filter', `name=tana-${service.name}`, '--format', '{{.Names}}'], {
      stdout: 'pipe'
    })
    await checkProc.exited
    const running = (await new Response(checkProc.stdout).text()).trim()

    if (running.includes(`tana-${service.name}`)) {
      this.emit('message', `${service.displayName} already running`)
      return
    }

    // Start via docker compose
    const proc = spawn(['docker', 'compose', 'up', '-d', service.name], {
      cwd: composePath,
      stdout: 'pipe',
      stderr: 'pipe'
    })

    const exitCode = await proc.exited
    if (exitCode !== 0) {
      const stderr = await new Response(proc.stderr).text()
      throw new Error(`Docker compose failed: ${stderr}`)
    }

    // Wait for container to be healthy
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  /**
   * Start a Tana service
   */
  private async startTanaService(service: ServiceInfo): Promise<void> {
    // Check if service is already running via health check
    if (service.healthCheck) {
      const alreadyRunning = await this.checkHealth(service.healthCheck)
      if (alreadyRunning) {
        this.emit('message', `${service.displayName} already running`)
        return
      }
    }

    // Spawn the service directly
    const servicePath = this.getServicePath(service.name)

    const proc = spawn(['bun', 'run', 'start'], {
      cwd: servicePath,
      env: {
        ...process.env,
        PORT: String(service.port),
        NODE_ENV: process.env.NODE_ENV || 'development'
      },
      stdout: 'pipe',
      stderr: 'pipe'
    })

    this.processes.set(service.name, proc)

    // Wait a bit for startup
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  /**
   * Wait for HTTP health check to pass
   */
  private async waitForHealthCheck(serviceName: string, url: string, maxRetries = 30): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      if (await this.checkHealth(url)) {
        return
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    throw new Error('Health check timeout')
  }

  /**
   * Check if health endpoint responds
   */
  private async checkHealth(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(2000) })
      return response.ok
    } catch {
      return false
    }
  }

  /**
   * Check if Docker container is running
   */
  private async checkDockerContainer(name: string): Promise<void> {
    const proc = spawn(['docker', 'inspect', '--format', '{{.State.Running}}', `tana-${name}-1`], {
      stdout: 'pipe'
    })

    await proc.exited
    const output = (await new Response(proc.stdout).text()).trim()

    if (output !== 'true') {
      throw new Error(`Container not running`)
    }
  }

  /**
   * Get path to docker-compose.yml
   */
  private getDockerComposePath(): string {
    // Try dev-env/local first
    const devEnvPath = '/Users/samifouad/Projects/tana/dev-env/local'
    if (existsSync(`${devEnvPath}/docker-compose.yml`)) {
      return devEnvPath
    }

    throw new Error('docker-compose.yml not found')
  }

  /**
   * Get path to service directory
   */
  private getServicePath(serviceName: string): string {
    const basePath = '/Users/samifouad/Projects/tana'

    const paths: Record<string, string> = {
      mesh: `${basePath}/cli/services/mesh`,
      t4: `${basePath}/cli/services/t4`,
      ledger: `${basePath}/cli/services/ledger`,
      identity: `${basePath}/cli/services/identity`,
      notifications: `${basePath}/cli/services/notifications`,
      topology: `${basePath}/cli/services/topology`
    }

    const path = paths[serviceName]
    if (!path) {
      throw new Error(`Unknown service: ${serviceName}`)
    }

    return path
  }

  /**
   * Update service status and emit event
   */
  private updateStatus(serviceName: string, status: ServiceStatus): void {
    this.statuses.set(serviceName, status)
    this.emit('service_status', { service: serviceName, status })
  }

  /**
   * Get current status of all services
   */
  getStatuses(): Map<string, ServiceStatus> {
    return new Map(this.statuses)
  }

  /**
   * Get service list
   */
  static getServices(): ServiceInfo[] {
    return SERVICES
  }

  /**
   * Stop all services
   */
  async stopAll(): Promise<void> {
    this.emit('message', 'Stopping services...')

    // Stop Tana services
    for (const [name, proc] of this.processes.entries()) {
      try {
        proc.kill()
        this.updateStatus(name, 'stopped')
      } catch (error) {
        this.emit('error', `Failed to stop ${name}: ${error}`)
      }
    }

    // Stop Docker services
    const composePath = this.getDockerComposePath()
    const proc = spawn(['docker', 'compose', 'down'], {
      cwd: composePath,
      stdout: 'ignore',
      stderr: 'pipe'
    })

    await proc.exited

    this.emit('message', 'All services stopped')
  }
}
