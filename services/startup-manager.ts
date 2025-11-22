/**
 * Startup Manager
 *
 * Shared startup logic used by both CLI and TUI interfaces.
 * Provides event-driven API for progress tracking.
 */

import { spawn, type Subprocess } from 'bun'
import { existsSync, readdirSync, writeFileSync } from 'fs'
import { EventEmitter } from 'events'
import { Client } from 'pg'
import Redis from 'ioredis'
import { join } from 'path'
import { createHash } from 'crypto'
import * as ed from '@noble/ed25519'
import { sha512 } from '@noble/hashes/sha2.js'
import {
  validateRequiredServices,
  getValidatorConfig,
  saveValidatorConfig,
  ensureConfigDirs,
  CONFIG_DIR,
  type ChainConfig,
  type ServiceName,
  REQUIRED_SERVICES
} from '../utils/config'

// Configure noble/ed25519 with SHA512 (required for keypair generation)
// Noble/ed25519 v3 requires setting ed.hashes.sha512
// @ts-ignore
ed.hashes.sha512 = sha512
// @ts-ignore
ed.hashes.sha512Async = (m: Uint8Array) => Promise.resolve(sha512(m))

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
  },
  {
    name: 'consensus',
    displayName: 'Consensus',
    type: 'tana',
    port: 9001,  // HTTP API port
    required: false,
    healthCheck: 'http://localhost:9001/health'
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

      // Ensure validator exists (auto-create if missing)
      await this.ensureValidator()

      // Validate chain exists (but don't fail yet if genesis mode)
      if (!this.genesis) {
        await this.validateChainExists()
      }

      // Start Docker infrastructure first (postgres, redis)
      const dockerServices = SERVICES.filter(s => s.type === 'docker')
      for (const service of dockerServices) {
        await this.startService(service)
      }

      // Ensure database exists
      await this.ensureDatabase()

      // Start Tana services (mesh, t4, ledger, consensus, etc.)
      const tanaServices = SERVICES.filter(s => s.type === 'tana')
      for (const service of tanaServices) {
        await this.startService(service)
      }

      // Initialize genesis after ledger is running (if --genesis flag)
      // This ensures migrations have run and database tables exist
      if (this.genesis) {
        this.emit('message', 'Waiting for ledger service to complete migrations...')
        await this.waitForMigrations()
        await this.initializeGenesis()
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
   * Check if Docker daemon is running (and start it if not)
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
          'After installing, run `tana start` again.')
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('not installed')) {
        throw error
      }
      // If 'which' command failed for other reasons, continue to check if daemon is running
    }

    // Check if Docker daemon is running
    const isRunning = await this.isDockerDaemonRunning()

    if (!isRunning) {
      // Try to start Docker automatically
      await this.startDocker()

      // Wait for Docker daemon to be ready
      await this.waitForDockerDaemon()
    }
  }

  /**
   * Check if Docker daemon is responding
   */
  private async isDockerDaemonRunning(): Promise<boolean> {
    try {
      const proc = spawn(['docker', 'info'], { stdout: 'ignore', stderr: 'ignore' })
      const exitCode = await proc.exited
      return exitCode === 0
    } catch {
      return false
    }
  }

  /**
   * Start Docker Desktop / Docker daemon
   */
  private async startDocker(): Promise<void> {
    this.emit('message', 'Docker not running. Starting Docker...')

    const platform = process.platform

    if (platform === 'darwin') {
      // macOS: Start Docker Desktop
      try {
        const proc = spawn(['open', '-a', 'Docker'], { stdout: 'ignore', stderr: 'pipe' })
        const exitCode = await proc.exited

        if (exitCode !== 0) {
          const stderr = await new Response(proc.stderr).text()
          throw new Error(`Failed to start Docker Desktop: ${stderr}`)
        }

        this.emit('message', 'Docker Desktop is starting...')
      } catch (error) {
        throw new Error('Failed to start Docker Desktop.\n\n' +
          '🐳 Please start Docker Desktop manually:\n' +
          '   • Open Docker Desktop from Applications\n' +
          '   • Wait for it to finish starting\n' +
          '   • Then run: tana start')
      }
    } else if (platform === 'linux') {
      // Linux: Try systemctl (may require sudo)
      this.emit('message', 'Attempting to start Docker daemon...')

      try {
        const proc = spawn(['systemctl', 'start', 'docker'], { stdout: 'ignore', stderr: 'pipe' })
        const exitCode = await proc.exited

        if (exitCode !== 0) {
          // Try with sudo
          const sudoProc = spawn(['sudo', 'systemctl', 'start', 'docker'], {
            stdout: 'ignore',
            stderr: 'pipe'
          })
          const sudoExitCode = await sudoProc.exited

          if (sudoExitCode !== 0) {
            throw new Error('Failed to start Docker daemon')
          }
        }

        this.emit('message', 'Docker daemon is starting...')
      } catch (error) {
        throw new Error('Failed to start Docker daemon.\n\n' +
          '🐳 Please start Docker manually:\n' +
          '   • Run: sudo systemctl start docker\n' +
          '   • Then run: tana start')
      }
    } else {
      // Windows or other
      throw new Error('Docker is not running.\n\n' +
        '🐳 Please start Docker Desktop manually and then run: tana start')
    }
  }

  /**
   * Wait for Docker daemon to be ready
   */
  private async waitForDockerDaemon(maxWaitSeconds = 60): Promise<void> {
    this.emit('message', 'Waiting for Docker to be ready...')

    const startTime = Date.now()
    let attempts = 0

    while (Date.now() - startTime < maxWaitSeconds * 1000) {
      attempts++

      if (await this.isDockerDaemonRunning()) {
        this.emit('message', `Docker is ready (took ${attempts} seconds)`)
        return
      }

      // Wait 1 second before next check
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    throw new Error(`Docker failed to start within ${maxWaitSeconds} seconds.\n\n` +
      '🐳 Please check Docker Desktop:\n' +
      '   • Make sure it\'s fully started\n' +
      '   • Check for any error messages\n' +
      '   • Then try: tana start')
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

    // Service-specific environment variables
    const serviceEnv: Record<string, string> = {
      ...process.env,
      PORT: String(service.port),
      NODE_ENV: process.env.NODE_ENV || 'development'
    }

    // Add service-specific configs
    if (service.name === 't4') {
      // Content directory: use config value, or default to ./content (relative to cwd)
      serviceEnv.CONTENT_DIR = this.chainConfig?.t4?.contentDir || './content'
      serviceEnv.T4_PORT = String(service.port)
    } else if (service.name === 'ledger') {
      // Database URL from chain config
      serviceEnv.DATABASE_URL = this.chainConfig?.postgres?.url || 'postgres://postgres:tana_dev_password@localhost:5432/tana'
      serviceEnv.REDIS_URL = this.chainConfig?.redis?.url || 'redis://localhost:6379'

      // Consensus configuration (automatic based on validator count)
      // Read from validator config if it exists, otherwise use defaults
      const validatorConfig = getValidatorConfig()
      serviceEnv.VALIDATOR_ID = validatorConfig?.validatorId || 'val_1'
      serviceEnv.CONSENSUS_URL = validatorConfig
        ? `http://localhost:${validatorConfig.httpPort}`
        : 'http://localhost:9001'
    } else if (service.name === 'identity') {
      // Identity uses same database
      serviceEnv.IDENTITY_DB_URL = this.chainConfig?.postgres?.url || 'postgres://postgres:tana_dev_password@localhost:5432/tana'
    } else if (service.name === 'notifications') {
      // Notifications needs database
      serviceEnv.DATABASE_URL = this.chainConfig?.postgres?.url || 'postgres://postgres:tana_dev_password@localhost:5432/tana'
    } else if (service.name === 'consensus') {
      // Consensus service configuration
      // Read from validator config if it exists, otherwise use defaults
      const validatorConfig = getValidatorConfig()

      serviceEnv.VALIDATOR_ID = validatorConfig?.validatorId || 'val_1'
      serviceEnv.CONSENSUS_PORT = validatorConfig?.wsPort.toString() || '9000'
      serviceEnv.HTTP_PORT = validatorConfig?.httpPort.toString() || String(service.port)
      serviceEnv.DATABASE_URL = this.chainConfig?.postgres?.url || 'postgres://postgres:tana_dev_password@localhost:5432/tana'
      serviceEnv.MESH_URL = this.chainConfig?.mesh?.url || 'http://localhost:8190'
      serviceEnv.PEERS = validatorConfig?.peers ? JSON.stringify(validatorConfig.peers) : '[]'
    }

    const proc = spawn(['bun', 'run', 'start'], {
      cwd: servicePath,
      env: serviceEnv,
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
    // Try to find the container by name (could be local-${name}-1, tana-${name}-1, etc.)
    const possibleNames = [
      `local-${name}-1`,
      `tana-${name}-1`,
      `${name}-1`,
      name
    ]

    for (const containerName of possibleNames) {
      const proc = spawn(['docker', 'inspect', '--format', '{{.State.Running}}', containerName], {
        stdout: 'pipe',
        stderr: 'ignore'
      })

      await proc.exited
      const output = (await new Response(proc.stdout).text()).trim()

      if (output === 'true') {
        return // Container found and running
      }
    }

    throw new Error(`Container not found or not running (tried: ${possibleNames.join(', ')})`)
  }

  /**
   * Ensure database exists and run migrations
   */
  private async ensureDatabase(): Promise<void> {
    this.emit('message', 'Checking database...')

    const dbUrl = this.chainConfig?.postgres?.url || 'postgres://postgres:tana_dev_password@localhost:5432'

    // Parse database URL to get connection details
    const match = dbUrl.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/?(.*)?/)
    if (!match) {
      throw new Error(`Invalid postgres URL: ${dbUrl}`)
    }

    const [_, user, password, host, port, database] = match
    const dbName = database || 'tana'

    // Connect to default 'postgres' database to create 'tana' if needed
    const client = new Client({
      host,
      port: parseInt(port),
      user,
      password,
      database: 'postgres' // Connect to default database first
    })

    try {
      await client.connect()

      // Check if 'tana' database exists
      const result = await client.query(
        `SELECT 1 FROM pg_database WHERE datname = $1`,
        [dbName]
      )

      if (result.rows.length === 0) {
        this.emit('message', `Creating database '${dbName}'...`)
        await client.query(`CREATE DATABASE ${dbName}`)
        this.emit('message', `✓ Database '${dbName}' created`)
      } else {
        this.emit('message', `✓ Database '${dbName}' exists`)
      }

      await client.end()

      // Now run migrations on the 'tana' database
      await this.runMigrations(dbName, host, port, user, password)

    } catch (error) {
      await client.end().catch(() => {})
      throw new Error(`Database setup failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Run database migrations
   */
  private async runMigrations(database: string, host: string, port: string, user: string, password: string): Promise<void> {
    this.emit('message', 'Running database migrations...')

    const client = new Client({
      host,
      port: parseInt(port),
      user,
      password,
      database
    })

    try {
      await client.connect()

      // Check if migrations table exists
      const tableCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM pg_tables
          WHERE schemaname = 'public'
          AND tablename = 'blocks'
        )
      `)

      if (tableCheck.rows[0].exists) {
        this.emit('message', '✓ Migrations already applied')
      } else {
        this.emit('message', '⏭️  Migrations will run on first ledger service start')
      }

      await client.end()
    } catch (error) {
      await client.end().catch(() => {})
      // Don't fail - let the ledger service handle migrations
      this.emit('message', `Note: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Wait for ledger migrations to complete
   */
  private async waitForMigrations(maxRetries = 30): Promise<void> {
    const dbUrl = this.chainConfig?.postgres?.url || 'postgres://postgres:tana_dev_password@localhost:5432'
    const match = dbUrl.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/?(.*)?/)
    if (!match) {
      throw new Error(`Invalid postgres URL: ${dbUrl}`)
    }

    const [_, user, password, host, port, database] = match
    const dbName = database || 'tana'

    for (let i = 0; i < maxRetries; i++) {
      const client = new Client({ host, port: parseInt(port), user, password, database: dbName })

      try {
        await client.connect()

        // Check if blocks table exists AND has the transactions column (from migration 0013)
        const result = await client.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = 'blocks'
            AND column_name = 'transactions'
          )
        `)

        await client.end()

        if (result.rows[0].exists) {
          this.emit('message', '✓ Migrations complete - all schema changes applied')
          return
        }

        // Wait 1 second before retrying
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        await client.end().catch(() => {})
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    throw new Error('Timeout waiting for migrations to complete')
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
      topology: `${basePath}/cli/services/topology`,
      consensus: `${basePath}/cli/services/consensus`
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
   * Ensure validator config exists (auto-create if missing)
   */
  private async ensureValidator(): Promise<void> {
    // Check if validator config already exists
    const existingConfig = getValidatorConfig()

    if (existingConfig) {
      this.emit('message', `Validator already configured: ${existingConfig.validatorId}`)
      return
    }

    this.emit('message', 'No validator found - auto-creating default validator...')

    try {
      this.emit('message', 'Generating keypair...')

      // Generate validator keypair directly using noble/ed25519
      const privateKeyBytes = new Uint8Array(32)
      crypto.getRandomValues(privateKeyBytes)

      this.emit('message', 'Deriving public key...')

      // Use synchronous version to avoid hanging
      const publicKeyBytes = ed.getPublicKey(privateKeyBytes)

      this.emit('message', 'Public key derived')

      // Convert to hex strings with ed25519_ prefix
      const PREFIX_KEY = 'ed25519_'
      const privateKey = PREFIX_KEY + Buffer.from(privateKeyBytes).toString('hex')
      const publicKey = PREFIX_KEY + Buffer.from(publicKeyBytes).toString('hex')

      this.emit('message', 'Keypair generated successfully')

      const validatorId = `val_${publicKey.slice(8, 16)}`

      // Create validator config with default settings
      const config = {
        validatorId,
        publicKey,
        privateKey,  // TODO: Encrypt this in production
        wsPort: 9000,
        httpPort: 9001,
        wsUrl: 'ws://localhost:9000',
        peers: [],
        createdAt: new Date().toISOString(),
      }

      this.emit('message', 'Saving validator config...')

      // Save to config directory
      saveValidatorConfig(config)

      this.emit('message', `✅ Default validator created: ${validatorId}`)
      this.emit('message', `   WebSocket: ${config.wsUrl}`)
      this.emit('message', `   HTTP API: http://localhost:${config.httpPort}`)
    } catch (error) {
      // Log warning but don't fail - validator is optional for basic operation
      const errorMessage = error instanceof Error ? error.message : String(error)
      const errorStack = error instanceof Error ? error.stack : ''

      this.emit('message', `⚠️  Could not auto-create validator: ${errorMessage}`)

      if (errorStack) {
        console.error('Validator creation error stack:', errorStack)
      }

      this.emit('message', `   Consensus features will be unavailable`)
      this.emit('message', `   To enable consensus, run: tana init validator`)
    }
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
