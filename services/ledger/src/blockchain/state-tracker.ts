/**
 * State Change Tracker
 *
 * Captures before/after snapshots of state during block production
 */

import { db } from '../db'
import { users, balances } from '../db/schema'
import { eq, and } from 'drizzle-orm'
import type { StateChange, BalanceChange, UserCreation, ContractDeployment, RoleChange } from '../types/block'

// ============================================================================
// STATE SNAPSHOT
// ============================================================================

export class StateTracker {
  private changes: StateChange[] = []

  /**
   * Capture balance before transaction
   */
  async captureBalanceBefore(userId: string, currencyCode: string): Promise<string | null> {
    const [balance] = await db
      .select()
      .from(balances)
      .where(
        and(
          eq(balances.userId, userId),
          eq(balances.currencyCode, currencyCode)
        )
      )
      .limit(1)

    return balance ? balance.amount : null
  }

  /**
   * Record balance change
   */
  async recordBalanceChange(
    userId: string,
    currencyCode: string,
    before: string | null
  ): Promise<void> {
    // Get current balance (after change)
    const after = await this.captureBalanceBefore(userId, currencyCode)

    // Only record if changed
    if (before !== after) {
      const change: BalanceChange = {
        type: 'balance_update',
        userId,
        currencyCode,
        before,
        after: after!
      }
      this.changes.push(change)
    }
  }

  /**
   * Record user creation
   */
  recordUserCreation(
    userId: string,
    username: string,
    publicKey: string,
    role: 'sovereign' | 'staff' | 'user'
  ): void {
    const change: UserCreation = {
      type: 'user_created',
      userId,
      username,
      publicKey,
      role
    }
    this.changes.push(change)
  }

  /**
   * Record contract deployment
   */
  recordContractDeployment(
    contractId: string,
    ownerId: string,
    name: string,
    codeHash: string
  ): void {
    const change: ContractDeployment = {
      type: 'contract_deployed',
      contractId,
      ownerId,
      name,
      codeHash
    }
    this.changes.push(change)
  }

  /**
   * Record role change
   */
  recordRoleChange(
    userId: string,
    before: 'sovereign' | 'staff' | 'user',
    after: 'sovereign' | 'staff' | 'user'
  ): void {
    const change: RoleChange = {
      type: 'role_changed',
      userId,
      before,
      after
    }
    this.changes.push(change)
  }

  /**
   * Get all recorded changes
   */
  getChanges(): StateChange[] {
    return this.changes
  }

  /**
   * Clear all changes
   */
  clear(): void {
    this.changes = []
  }
}

// ============================================================================
// STATE ROOT COMPUTATION
// ============================================================================

import { computeStateRoot as computeMerkleStateRoot, type StateItem } from '../utils/merkle'

/**
 * Compute state root from current database state
 */
export async function computeStateRoot(): Promise<string> {
  // Collect all state items
  const stateItems: StateItem[] = []

  // 1. Add all users
  const allUsers = await db.select().from(users)
  for (const user of allUsers) {
    stateItems.push({
      key: `user:${user.id}`,
      value: {
        id: user.id,
        username: user.username,
        publicKey: user.publicKey,
        role: user.role,
        nonce: user.nonce,
        stateHash: user.stateHash
      }
    })
  }

  // 2. Add all balances
  const allBalances = await db.select().from(balances)
  for (const balance of allBalances) {
    stateItems.push({
      key: `balance:${balance.userId}:${balance.currencyCode}`,
      value: {
        userId: balance.userId,
        currencyCode: balance.currencyCode,
        amount: balance.amount
      }
    })
  }

  // 3. Compute Merkle root
  return computeMerkleStateRoot(stateItems)
}
