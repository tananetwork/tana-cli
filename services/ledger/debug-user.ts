/**
 * Debug script to check user data
 */
import { db, users } from './src/db'
import { eq } from 'drizzle-orm'

const username = '@demon'

const [user] = await db
  .select()
  .from(users)
  .where(eq(users.username, username))
  .limit(1)

if (user) {
  console.log('\n=== User Found ===')
  console.log('Username:', user.username)
  console.log('Display Name:', user.displayName)
  console.log('User ID:', user.id)
  console.log('Public Key:', user.publicKey)
  console.log('Public Key Length:', user.publicKey?.length)
  console.log('Role:', user.role)
  console.log('Created:', user.createdAt)
} else {
  console.log('\n❌ User not found:', username)
}

process.exit(0)
