import type { BlockVote } from '../contracts/consensus'

interface VoteRecord {
  validatorId: string
  approve: boolean
  signature: string
  timestamp: number
}

export class VoteCollector {
  // blockHash -> validator votes
  private votes: Map<string, Map<string, VoteRecord>> = new Map()

  addVote(vote: BlockVote) {
    if (!this.votes.has(vote.blockHash)) {
      this.votes.set(vote.blockHash, new Map())
    }

    const blockVotes = this.votes.get(vote.blockHash)!
    blockVotes.set(vote.validatorId, {
      validatorId: vote.validatorId,
      approve: vote.approve,
      signature: vote.signature,
      timestamp: vote.timestamp,
    })

    console.log(
      `[Voting] Recorded vote for block ${vote.blockHash.slice(0, 8)}... ` +
      `from ${vote.validatorId}: ${vote.approve ? 'APPROVE' : 'REJECT'}`
    )
  }

  getVotes(blockHash: string): VoteRecord[] {
    const blockVotes = this.votes.get(blockHash)
    return blockVotes ? Array.from(blockVotes.values()) : []
  }

  hasQuorum(blockHash: string, totalValidators: number): boolean {
    const votes = this.getVotes(blockHash)
    const approveVotes = votes.filter(v => v.approve).length
    const required = Math.ceil(totalValidators * 2 / 3)

    const hasIt = approveVotes >= required

    if (hasIt) {
      console.log(
        `[Voting] QUORUM REACHED for block ${blockHash.slice(0, 8)}... ` +
        `(${approveVotes}/${totalValidators} votes, required ${required})`
      )
    }

    return hasIt
  }

  getQuorumStatus(blockHash: string, totalValidators: number) {
    const votes = this.getVotes(blockHash)
    const approveVotes = votes.filter(v => v.approve).length
    const rejectVotes = votes.filter(v => !v.approve).length
    const required = Math.ceil(totalValidators * 2 / 3)

    return {
      total: votes.length,
      approve: approveVotes,
      reject: rejectVotes,
      required,
      hasQuorum: approveVotes >= required,
    }
  }

  clearOldVotes(blockHash: string) {
    this.votes.delete(blockHash)
  }
}
