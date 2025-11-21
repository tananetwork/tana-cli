import { db } from './index'
import { validators, blockVotes } from './schema'
import { eq } from 'drizzle-orm'

export async function upsertValidator(data: {
  id: string
  publicKey: string
  wsUrl: string
  status: string
}) {
  return db.insert(validators)
    .values({
      ...data,
      lastSeen: new Date(),
    })
    .onConflictDoUpdate({
      target: validators.id,
      set: {
        wsUrl: data.wsUrl,
        status: data.status,
        lastSeen: new Date(),
      }
    })
}

export async function recordVote(vote: {
  id: string
  blockHash: string
  validatorId: string
  approve: boolean
  signature: string
}) {
  return db.insert(blockVotes).values(vote)
}

export async function getVotesForBlock(blockHash: string) {
  return db.select()
    .from(blockVotes)
    .where(eq(blockVotes.blockHash, blockHash))
}
