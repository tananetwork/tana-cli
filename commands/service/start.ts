/**
 * tana start
 *
 * Starts all Tana services (mesh, t4, ledger) in the correct order.
 * Runs in foreground with health checks and graceful shutdown.
 */

import chalk from 'chalk'
import {
  readGlobalConfig,
  isLedgerReachable,
  getLedgerUrl
} from '../../utils/config'
import { ServiceOrchestrator } from './orchestrator'
import Redis from 'ioredis'
import { Client } from 'pg'

/**
 * Check if required infrastructure services are running
 */
async function checkInfrastructure(): Promise<{ ok: boolean; errors: string[] }> {
  const errors: string[] = []

  // Check PostgreSQL
  const databaseUrl = process.env.DATABASE_URL || 'postgres://tana:tana_dev_password@localhost:5432/tana'
  try {
    const client = new Client({ connectionString: databaseUrl })
    await client.connect()
    await client.end()
  } catch (err: any) {
    errors.push(`PostgreSQL not reachable: ${err.message}`)
  }

  // Check Redis
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
  const redis = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    retryStrategy: () => null,
  })

  try {
    await redis.ping()
    redis.disconnect()
  } catch (err: any) {
    errors.push(`Redis not reachable: ${err.message}`)
  }

  return { ok: errors.length === 0, errors }
}

export async function start(chainName?: string) {
  console.log(chalk.bold('\n🚀 Starting Tana...\n'))

  // Check if already running
  const ledgerUrl = getLedgerUrl()
  if (await isLedgerReachable()) {
    console.log(chalk.yellow(`✗ Ledger already running at ${ledgerUrl}`))
    console.log(chalk.gray(`\nStop the other instance first, or use a different port.\n`))
    process.exit(1)
  }

  // Check infrastructure dependencies
  const { ok, errors } = await checkInfrastructure()
  if (!ok) {
    console.log(chalk.red('✗ Infrastructure services not ready:\n'))
    errors.forEach(error => console.log(chalk.gray(`   • ${error}`)))
    console.log(chalk.cyan('\n💡 Start infrastructure services:'))
    console.log(chalk.gray('   docker-compose up -d postgres redis'))
    console.log(chalk.gray('   OR'))
    console.log(chalk.gray('   npm run db:up\n'))
    process.exit(1)
  }

  // Determine which chain to start
  let targetChain = chainName
  if (!targetChain) {
    const config = readGlobalConfig()
    targetChain = config?.defaultChain || 'local'
  }

  console.log(chalk.gray(`Chain: ${chalk.cyan(targetChain)}`))
  console.log()

  // Start all services using orchestrator
  const orchestrator = new ServiceOrchestrator()
  await orchestrator.startAll()
}
