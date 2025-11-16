/**
 * Blockchain Event Listener
 *
 * Monitors new blocks and sends push notifications for relevant events:
 * - Balance updates (transfers received)
 * - Money requests
 * - Contract executions
 * - Role changes
 * - Security alerts
 *
 * Usage: bun run src/events/block-listener.ts
 */

import { db } from '../db'
import { blocks, transactions, users } from '../db/schema'
import { eq, gt, desc } from 'drizzle-orm'

const NOTIFICATIONS_API_URL = process.env.NOTIFICATIONS_API_URL || 'http://localhost:8091'
const POLL_INTERVAL_MS = 3000 // Check for new blocks every 3 seconds

/**
 * Track last processed block height
 */
let lastProcessedHeight = 0

/**
 * Send notification via notifications service
 */
async function sendNotification(params: {
  userId: string
  type: 'balance_update' | 'payment_received' | 'money_request' | 'contract_event' | 'security_alert' | 'role_change'
  title: string
  body: string
  data?: any
}) {
  try {
    const response = await fetch(`${NOTIFICATIONS_API_URL}/notifications/send/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error(`[Notifications] Failed to send notification:`, error)
      return false
    }

    const result = await response.json()
    console.log(`  ✓ Notification sent to user ${params.userId}`)
    return true
  } catch (error: any) {
    console.error(`[Notifications] Error sending notification:`, error.message)
    return false
  }
}

/**
 * Process a new block and send notifications for relevant transactions
 */
async function processBlock(block: any) {
  console.log(`\n📦 Processing block #${block.height} (${block.txCount} transactions)`)

  // Get all transactions in this block
  const blockTxs = await db
    .select()
    .from(transactions)
    .where(eq(transactions.blockHeight, block.height))

  if (blockTxs.length === 0) {
    console.log('  No transactions in block')
    return
  }

  // Process each transaction
  for (const tx of blockTxs) {
    console.log(`  Transaction ${tx.type}: ${tx.id}`)

    // Skip failed transactions
    if (tx.status === 'failed') {
      console.log('    ⚠️  Transaction failed, skipping notification')
      continue
    }

    switch (tx.type) {
      case 'transfer': {
        // Notify recipient of incoming payment
        if (tx.to && tx.amount && tx.currencyCode) {
          // Get sender username
          const [sender] = await db
            .select()
            .from(users)
            .where(eq(users.id, tx.from))
            .limit(1)

          const senderName = sender?.username || 'Unknown'
          const amount = tx.amount.toString()

          await sendNotification({
            userId: tx.to,
            type: 'payment_received',
            title: 'Payment Received',
            body: `You received ${amount} ${tx.currencyCode} from @${senderName}`,
            data: {
              transactionId: tx.id,
              from: tx.from,
              amount,
              currencyCode: tx.currencyCode,
              blockHeight: block.height,
            },
          })
        }
        break
      }

      case 'user_creation': {
        // Welcome notification for new users
        if (tx.to) {
          await sendNotification({
            userId: tx.to,
            type: 'security_alert',
            title: 'Welcome to Tana!',
            body: 'Your account has been created successfully.',
            data: {
              transactionId: tx.id,
              blockHeight: block.height,
            },
          })
        }
        break
      }

      case 'contract_call': {
        // Notify contract owner of execution
        if (tx.contractId) {
          // Get contract to find owner
          const contractData = tx.metadata as any

          if (contractData?.ownerId) {
            const [caller] = await db
              .select()
              .from(users)
              .where(eq(users.id, tx.from))
              .limit(1)

            const callerName = caller?.username || 'Unknown'

            await sendNotification({
              userId: contractData.ownerId,
              type: 'contract_event',
              title: 'Contract Executed',
              body: `@${callerName} executed your contract`,
              data: {
                transactionId: tx.id,
                contractId: tx.contractId,
                caller: tx.from,
                blockHeight: block.height,
              },
            })
          }
        }
        break
      }

      case 'role_change': {
        // Notify user of role change
        const roleData = tx.contractInput as any

        if (roleData?.userId && roleData?.newRole) {
          const roleEmoji = roleData.newRole === 'sovereign' ? '👑' : roleData.newRole === 'staff' ? '⭐' : '👤'

          await sendNotification({
            userId: roleData.userId,
            type: 'security_alert',
            title: 'Role Changed',
            body: `Your role has been changed to ${roleEmoji} ${roleData.newRole}`,
            data: {
              transactionId: tx.id,
              oldRole: roleData.oldRole,
              newRole: roleData.newRole,
              blockHeight: block.height,
            },
          })
        }
        break
      }

      case 'contract_deployment': {
        // Notify contract deployer of successful deployment
        if (tx.from) {
          const contractData = tx.contractInput as any

          await sendNotification({
            userId: tx.from,
            type: 'contract_event',
            title: 'Contract Deployed',
            body: `Your contract "${contractData?.name || 'Unknown'}" has been deployed successfully`,
            data: {
              transactionId: tx.id,
              contractId: tx.to,
              blockHeight: block.height,
            },
          })
        }
        break
      }

      default:
        console.log(`    ℹ️  No notification handler for type: ${tx.type}`)
    }
  }

  console.log(`✓ Processed block #${block.height}`)
}

/**
 * Poll for new blocks and process them
 */
async function pollForBlocks() {
  try {
    // Get latest block
    const [latestBlock] = await db
      .select()
      .from(blocks)
      .orderBy(desc(blocks.height))
      .limit(1)

    if (!latestBlock) {
      console.log('No blocks found in database')
      return
    }

    // Initialize last processed height on first run
    if (lastProcessedHeight === 0) {
      lastProcessedHeight = latestBlock.height
      console.log(`\n🚀 Block listener started at block #${lastProcessedHeight}`)
      console.log(`📡 Monitoring for new blocks every ${POLL_INTERVAL_MS}ms...\n`)
      return
    }

    // Check if there are new blocks
    if (latestBlock.height > lastProcessedHeight) {
      console.log(`\n🔔 New block(s) detected! (${lastProcessedHeight + 1} → ${latestBlock.height})`)

      // Get all new blocks (in case we missed multiple)
      const newBlocks = await db
        .select()
        .from(blocks)
        .where(gt(blocks.height, lastProcessedHeight))
        .orderBy(blocks.height) // Process in order

      // Process each new block
      for (const block of newBlocks) {
        await processBlock(block)
        lastProcessedHeight = block.height
      }
    }
  } catch (error: any) {
    console.error('❌ Error polling for blocks:', error.message)
  }
}

/**
 * Main event listener loop
 */
async function startListener() {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('  Tana Blockchain Event Listener')
  console.log('  Monitoring blockchain for notification events...')
  console.log('═══════════════════════════════════════════════════════════')
  console.log(`  Notifications API: ${NOTIFICATIONS_API_URL}`)
  console.log(`  Poll interval: ${POLL_INTERVAL_MS}ms`)
  console.log('═══════════════════════════════════════════════════════════\n')

  // Start polling loop
  setInterval(pollForBlocks, POLL_INTERVAL_MS)

  // Initial poll
  await pollForBlocks()
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down block listener...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n\n👋 Shutting down block listener...')
  process.exit(0)
})

// Start the listener
startListener().catch((error) => {
  console.error('❌ Failed to start block listener:', error)
  process.exit(1)
})
