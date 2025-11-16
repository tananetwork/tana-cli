/**
 * Debug script to check session expiry times
 */
import { db, authSessions } from './src/db'
import { desc } from 'drizzle-orm'

const sessions = await db
  .select({
    id: authSessions.id,
    status: authSessions.status,
    createdAt: authSessions.createdAt,
    expiresAt: authSessions.expiresAt,
  })
  .from(authSessions)
  .orderBy(desc(authSessions.createdAt))
  .limit(5)

console.log('\n=== Recent Auth Sessions ===\n')

for (const session of sessions) {
  const now = new Date()
  const created = new Date(session.createdAt)
  const expires = new Date(session.expiresAt)

  const ttlSeconds = (expires.getTime() - created.getTime()) / 1000
  const remainingSeconds = (expires.getTime() - now.getTime()) / 1000
  const isExpired = remainingSeconds < 0

  console.log(`Session: ${session.id}`)
  console.log(`  Status: ${session.status}`)
  console.log(`  Created: ${created.toLocaleString()}`)
  console.log(`  Expires: ${expires.toLocaleString()}`)
  console.log(`  TTL: ${ttlSeconds} seconds (${(ttlSeconds / 60).toFixed(1)} minutes)`)
  console.log(`  Remaining: ${remainingSeconds.toFixed(0)} seconds`)
  console.log(`  Expired: ${isExpired ? 'YES ⚠️' : 'NO ✓'}`)
  console.log()
}

process.exit(0)
