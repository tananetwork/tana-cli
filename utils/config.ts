/**
 * Configuration Management
 *
 * Handles reading/writing JSON config files in ~/.config/tana/
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'

// Base config directory
export const CONFIG_DIR = join(homedir(), '.config', 'tana')
export const CHAINS_DIR = join(CONFIG_DIR, 'chains')
export const NODES_DIR = join(CONFIG_DIR, 'nodes')
export const USERS_DIR = join(CONFIG_DIR, 'users')

/**
 * Initialize config directories if they don't exist
 */
export function ensureConfigDirs(): void {
  const dirs = [CONFIG_DIR, CHAINS_DIR, NODES_DIR, USERS_DIR]

  for (const dir of dirs) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
  }
}

/**
 * Read global config
 */
export function readGlobalConfig(): GlobalConfig | null {
  const configPath = join(CONFIG_DIR, 'config.json')

  if (!existsSync(configPath)) {
    return null
  }

  try {
    const data = readFileSync(configPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading config:', error)
    return null
  }
}

/**
 * Write global config
 */
export function writeGlobalConfig(config: GlobalConfig): void {
  ensureConfigDirs()
  const configPath = join(CONFIG_DIR, 'config.json')
  writeFileSync(configPath, JSON.stringify(config, null, 2))
}

/**
 * Read chain config
 */
export function readChainConfig(name: string): ChainConfig | null {
  const chainPath = join(CHAINS_DIR, `${name}.json`)

  if (!existsSync(chainPath)) {
    return null
  }

  try {
    const data = readFileSync(chainPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading chain config for ${name}:`, error)
    return null
  }
}

/**
 * Write chain config
 */
export function writeChainConfig(name: string, config: ChainConfig): void {
  ensureConfigDirs()
  const chainPath = join(CHAINS_DIR, `${name}.json`)
  writeFileSync(chainPath, JSON.stringify(config, null, 2))
}

/**
 * Read node config
 */
export function readNodeConfig(id: string): NodeConfig | null {
  const nodePath = join(NODES_DIR, `${id}.json`)

  if (!existsSync(nodePath)) {
    return null
  }

  try {
    const data = readFileSync(nodePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading node config for ${id}:`, error)
    return null
  }
}

/**
 * Write node config
 */
export function writeNodeConfig(id: string, config: NodeConfig): void {
  ensureConfigDirs()
  const nodePath = join(NODES_DIR, `${id}.json`)
  writeFileSync(nodePath, JSON.stringify(config, null, 2))
}

/**
 * Read user config
 */
export function readUserConfig(username: string): UserConfig | null {
  const userPath = join(USERS_DIR, `${username}.json`)

  if (!existsSync(userPath)) {
    return null
  }

  try {
    const data = readFileSync(userPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading user config for ${username}:`, error)
    return null
  }
}

/**
 * Write user config
 */
export function writeUserConfig(username: string, config: UserConfig): void {
  ensureConfigDirs()
  const userPath = join(USERS_DIR, `${username}.json`)
  writeFileSync(userPath, JSON.stringify(config, null, 2))
}

/**
 * List all chains
 */
export function listChains(): string[] {
  ensureConfigDirs()
  const { readdirSync } = require('fs')

  try {
    return readdirSync(CHAINS_DIR)
      .filter((file: string) => file.endsWith('.json'))
      .map((file: string) => file.replace('.json', ''))
  } catch {
    return []
  }
}

/**
 * List all nodes
 */
export function listNodes(): string[] {
  ensureConfigDirs()
  const { readdirSync } = require('fs')

  try {
    return readdirSync(NODES_DIR)
      .filter((file: string) => file.endsWith('.json'))
      .map((file: string) => file.replace('.json', ''))
  } catch {
    return []
  }
}

/**
 * List all users
 */
export function listUsers(): string[] {
  ensureConfigDirs()
  const { readdirSync } = require('fs')

  try {
    return readdirSync(USERS_DIR)
      .filter((file: string) => file.endsWith('.json'))
      .map((file: string) => file.replace('.json', ''))
  } catch {
    return []
  }
}

/**
 * Get ledger URL from environment or fallback to localhost
 *
 * Priority:
 * 1. TANA_LEDGER_URL environment variable
 * 2. http://localhost:8080 (default)
 *
 * Usage:
 *   Dev:  export TANA_LEDGER_URL=http://localhost:8080
 *   Prod: export TANA_LEDGER_URL=https://mainnet.tana.network
 */
export function getLedgerUrl(): string {
  return process.env.TANA_LEDGER_URL || 'http://localhost:8080'
}

/**
 * Check if ledger is reachable
 */
export async function isLedgerReachable(): Promise<boolean> {
  try {
    const ledgerUrl = getLedgerUrl()
    const response = await fetch(`${ledgerUrl}/health`, {
      signal: AbortSignal.timeout(2000)
    })
    return response.ok
  } catch {
    return false
  }
}

/**
 * Get deployment target
 * Returns the ledger URL if reachable, null otherwise
 */
export async function getDeploymentTarget(): Promise<string | null> {
  const ledgerUrl = getLedgerUrl()

  if (await isLedgerReachable()) {
    return ledgerUrl
  }

  return null
}

// Type definitions
export interface GlobalConfig {
  version: string
  defaultChain?: string
  defaultUser?: string
}

export interface ServiceConfig {
  url: string
  // Future: timeout?: number, retries?: number, etc.
}

export interface ChainConfig {
  name: string
  type: 'local' | 'remote'
  url: string // Deprecated: use ledger.url instead
  port?: number // Deprecated: use ledger.url port
  isGenesis: boolean
  createdAt: string
  genesisBlock?: string

  // Genesis configuration
  coreContracts?: {
    dir: string // Directory containing core contracts (default: "./contracts")
  }

  // Service configurations (top-level for extensibility)
  // Infrastructure
  postgres?: ServiceConfig
  redis?: ServiceConfig

  // Tana services
  mesh?: ServiceConfig
  t4?: ServiceConfig & { contentDir?: string } // T4 content storage directory (default: "./content")
  ledger?: ServiceConfig
  identity?: ServiceConfig
  notifications?: ServiceConfig
  topology?: ServiceConfig
}

export interface NodeConfig {
  id: string
  chain: string
  type: 'validator' | 'follower'
  createdAt: string
  port?: number
}

export interface UserConfig {
  username: string
  publicKey: string
  privateKey: string
  displayName: string
  role?: 'sovereign' | 'staff' | 'user' // User role on blockchain
  createdAt: string
  chains: string[]
}

export interface ValidatorConfig {
  validatorId: string
  publicKey: string
  privateKey: string
  wsPort: number
  httpPort: number
  wsUrl: string
  peers: Array<{ id: string; wsUrl: string }>
  createdAt: string
}

/**
 * Read validator config
 */
export function getValidatorConfig(): ValidatorConfig | null {
  const configPath = join(CONFIG_DIR, 'validator.json')

  if (!existsSync(configPath)) {
    return null
  }

  try {
    const data = readFileSync(configPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading validator config:', error)
    return null
  }
}

/**
 * Write validator config
 */
export function saveValidatorConfig(config: ValidatorConfig): void {
  ensureConfigDirs()
  const configPath = join(CONFIG_DIR, 'validator.json')
  writeFileSync(configPath, JSON.stringify(config, null, 2))
}

/**
 * Service names for type-safe access
 */
export type ServiceName = 'postgres' | 'redis' | 'mesh' | 't4' | 'ledger' | 'identity' | 'notifications' | 'topology'

/**
 * Required services (hardcoded - these MUST have URLs defined)
 */
export const REQUIRED_SERVICES: ServiceName[] = ['postgres', 'redis', 'mesh', 't4', 'ledger']

/**
 * Optional services (will be skipped if no URL defined)
 */
export const OPTIONAL_SERVICES: ServiceName[] = ['identity', 'notifications', 'topology']

/**
 * Get default service configurations for local development
 * Returns partial ChainConfig with only service fields
 */
export function getDefaultServiceConfigs(): Pick<ChainConfig, ServiceName> {
  return {
    postgres: {
      url: 'postgres://postgres:tana_dev_password@localhost:5432'
    },
    redis: {
      url: 'redis://localhost:6379'
    },
    mesh: {
      url: 'http://localhost:8190'
    },
    t4: {
      url: 'http://localhost:8180'
    },
    ledger: {
      url: 'http://localhost:8080'
    },
    identity: {
      url: 'http://localhost:8090'
    },
    notifications: {
      url: 'http://localhost:8091'
    },
    topology: {
      url: 'http://localhost:3001'
    }
  }
}

/**
 * Get service URL from chain config with fallback to defaults
 * Returns empty string if not found (caller should check)
 */
export function getServiceUrl(
  chainConfig: ChainConfig | null,
  serviceName: ServiceName
): string | undefined {
  // Try to get from chain config (top-level field)
  const serviceConfig = chainConfig?.[serviceName]
  if (serviceConfig?.url) {
    return serviceConfig.url
  }

  // Fallback to defaults
  const defaults = getDefaultServiceConfigs()
  return defaults[serviceName]?.url
}

/**
 * Validate that all required services have URLs defined in config
 * Returns array of missing required services
 * NOTE: Does NOT use fallback defaults - config must explicitly define required services
 */
export function validateRequiredServices(chainConfig: ChainConfig | null): ServiceName[] {
  if (!chainConfig) {
    return [...REQUIRED_SERVICES] // All required services missing
  }

  const missing: ServiceName[] = []

  for (const serviceName of REQUIRED_SERVICES) {
    const serviceConfig = chainConfig[serviceName]
    if (!serviceConfig?.url) {
      missing.push(serviceName)
    }
  }

  return missing
}

/**
 * Get core contracts directory
 * Returns configured directory or default "./contracts"
 */
export function getCoreContractsDir(chainConfig: ChainConfig | null): string {
  return chainConfig?.coreContracts?.dir || './contracts'
}

/**
 * Get sovereign user (first user created)
 * Returns the oldest user by creation date, null if no users exist
 */
export function getSovereignUser(): UserConfig | null {
  const users = listUsers()

  if (users.length === 0) {
    return null
  }

  // Find user with earliest createdAt timestamp
  let oldestUser: UserConfig | null = null
  let oldestTimestamp: number = Date.now()

  for (const username of users) {
    const userConfig = readUserConfig(username)
    if (!userConfig) continue

    const timestamp = new Date(userConfig.createdAt).getTime()
    if (timestamp < oldestTimestamp) {
      oldestTimestamp = timestamp
      oldestUser = userConfig
    }
  }

  return oldestUser
}
