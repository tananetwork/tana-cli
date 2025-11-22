/**
 * Startup Manager
 *
 * Shared startup logic used by both CLI and TUI interfaces.
 * Provides event-driven API for progress tracking.
 */

import { spawn, type Subprocess } from 'bun'
import { existsSync, readdirSync } from 'fs'
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
  private genesis: boolean = false

  constructor(chainConfig?: ChainConfig | null, genesis?: boolean) {
    super()
    this.chainConfig = chainConfig || null
    this.genesis = genesis || false

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

      // Validate chain exists (but don't fail yet if genesis mode)
      if (!this.genesis) {
        await this.validateChainExists()
      }

      // Start Docker infrastructure first (postgres, redis)
      const dockerServices = SERVICES.filter(s => s.type === 'docker')
      for (const service of dockerServices) {
        await this.startService(service)
      }

      // Initialize genesis after database is up (if --genesis flag)
      if (this.genesis) {
        await this.initializeGenesis()
      }

      // Start Tana services (mesh, t4, ledger, etc.)
      const tanaServices = SERVICES.filter(s => s.type === 'tana')
      for (const service of tanaServices) {
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

    // Check if already running (matches any container with service name)
    const checkProc = spawn(['docker', 'ps', '--filter', `name=${service.name}`, '--format', '{{.Names}}'], {
      stdout: 'pipe'
    })
    await checkProc.exited
    const running = (await new Response(checkProc.stdout).text()).trim()

    if (running && running.includes(service.name)) {
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
   * Validate that the blockchain has been initialized
   */
  private async validateChainExists(): Promise<void> {
    this.emit('message', 'Validating blockchain state...')

    // Check if PostgreSQL is accessible
    const postgresUrl = this.chainConfig?.postgres?.url || 'postgres://postgres:tana_dev_password@localhost:5432/tana'

    try {
      const client = new Client({ connectionString: postgresUrl })
      await client.connect()

      // Check if genesis block exists
      const result = await client.query('SELECT height FROM blocks WHERE height = 0')

      await client.end()

      if (result.rows.length === 0) {
        throw new Error(
          'Chain not initialized. Genesis block does not exist.\n\n' +
          '📋 First-time setup required:\n' +
          '   Run: tana start --genesis\n\n' +
          'This will create the genesis block and initialize the blockchain.'
        )
      }

      this.emit('message', 'Blockchain state validated (genesis block exists)')
    } catch (error) {
      if (error instanceof Error && error.message.includes('Chain not initialized')) {
        throw error
      }

      // If we can't connect to PostgreSQL, it might not be running yet
      // This is okay - we'll start it next
      this.emit('message', 'Skipping blockchain validation (PostgreSQL not yet running)')
    }
  }

  /**
   * Initialize genesis block (first-time setup)
   */
  private async initializeGenesis(): Promise<void> {
    this.emit('message', 'Initializing genesis block...')

    // 1. Check if genesis already exists
    const postgresUrl = this.chainConfig?.postgres?.url || 'postgres://postgres:tana_dev_password@localhost:5432/tana'

    try {
      const client = new Client({ connectionString: postgresUrl })
      await client.connect()

      const result = await client.query('SELECT height FROM blocks WHERE height = 0')

      await client.end()

      if (result.rows.length > 0) {
        throw new Error(
          'Chain already initialized. Genesis block already exists.\n\n' +
          '✓ Blockchain is ready to use\n' +
          '   Run: tana start (without --genesis flag)\n\n' +
          'The --genesis flag is only for first-time initialization.'
        )
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('Chain already initialized')) {
        throw error
      }
      // PostgreSQL might not be running yet, continue
    }

    // 2. Check if sovereign user exists
    const sovereignUser = this.getSovereignUser()
    if (!sovereignUser) {
      throw new Error(
        'No sovereign user found. A sovereign user must be created first.\n\n' +
        '📋 Create your first user:\n' +
        '   Run: tana new user <username>\n\n' +
        'The first user created becomes the sovereign (chain administrator).\n' +
        'After creating a user, run: tana start --genesis'
      )
    }

    this.emit('message', `Sovereign user: ${sovereignUser.username} (${sovereignUser.publicKey})`)

    // 3. Check if core contracts directory exists (required)
    const coreContractsDir = this.chainConfig?.coreContracts?.dir || './contracts/core'
    if (!existsSync(coreContractsDir)) {
      throw new Error(
        '⚠️  Genesis Error: Core contracts directory not found\n\n' +
        `Expected directory: ${coreContractsDir}\n\n` +
        'Genesis requires core contracts to be deployed.\n\n' +
        'Create the directory and add core contracts:\n' +
        `  mkdir -p ${coreContractsDir}\n` +
        `  # Add your core contract .ts files to ${coreContractsDir}\n\n` +
        'Then try again:\n' +
        '  tana start --genesis'
      )
    }

    const contractFiles = readdirSync(coreContractsDir).filter(f => f.endsWith('.ts'))
    if (contractFiles.length === 0) {
      throw new Error(
        '⚠️  Genesis Error: No core contracts found\n\n' +
        `Directory exists but is empty: ${coreContractsDir}\n\n` +
        'Genesis requires at least one core contract to deploy.\n\n' +
        'Add core contract files:\n' +
        `  # Place .ts contract files in ${coreContractsDir}\n\n` +
        'Then try again:\n' +
        '  tana start --genesis'
      )
    }

    this.emit('message', `Found ${contractFiles.length} core contract(s) to deploy`)

    // 4. Run genesis initialization script
    this.emit('message', 'Creating genesis block...')
    await this.runGenesisScript(sovereignUser)
  }

  /**
   * Get sovereign user from ~/.config/tana/users/
   */
  private getSovereignUser(): { username: string; publicKey: string; displayName: string } | null {
    const usersDir = `${process.env.HOME}/.config/tana/users`

    if (!existsSync(usersDir)) {
      return null
    }

    const files = readdirSync(usersDir).filter(f => f.endsWith('.json'))

    if (files.length === 0) {
      return null
    }

    // First user is sovereign
    const firstUserFile = `${usersDir}/${files[0]}`
    const userData = JSON.parse(require('fs').readFileSync(firstUserFile, 'utf-8'))

    return {
      username: userData.username,
      publicKey: userData.publicKey,
      displayName: userData.displayName || userData.username
    }
  }

  /**
   * Run genesis block creation script
   */
  private async runGenesisScript(sovereignUser: { username: string; publicKey: string; displayName: string }): Promise<void> {
    const ledgerPath = '/Users/samifouad/Projects/tana/cli/services/ledger'
    const scriptPath = `${ledgerPath}/src/scripts/create-genesis.ts`

    // Set environment variables for sovereign user
    const env = {
      ...process.env,
      SOVEREIGN_PUBLIC_KEY: sovereignUser.publicKey,
      SOVEREIGN_USERNAME: sovereignUser.username,
      SOVEREIGN_DISPLAY_NAME: sovereignUser.displayName,
      DATABASE_URL: this.chainConfig?.postgres?.url || 'postgres://postgres:tana_dev_password@localhost:5432/tana'
    }

    this.emit('message', 'Running genesis creation script...')

    const proc = spawn(['bun', 'run', scriptPath], {
      cwd: ledgerPath,
      env,
      stdout: 'pipe',
      stderr: 'pipe'
    })

    // Stream output to user
    const decoder = new TextDecoder()

    // Read stdout
    if (proc.stdout) {
      const reader = proc.stdout.getReader()
      const readStdout = async () => {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const text = decoder.decode(value)
          // Emit each line as a message
          text.split('\n').forEach(line => {
            if (line.trim()) {
              this.emit('message', line)
            }
          })
        }
      }
      readStdout().catch(() => {}) // Fire and forget
    }

    const exitCode = await proc.exited

    if (exitCode !== 0) {
      const stderr = proc.stderr ? await new Response(proc.stderr).text() : ''
      throw new Error(`Genesis creation failed: ${stderr}`)
    }

    this.emit('message', '✅ Genesis block created successfully')
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
