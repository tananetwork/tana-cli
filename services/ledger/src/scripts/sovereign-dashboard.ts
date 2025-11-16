/**
 * Sovereign Dashboard - Interactive CLI
 *
 * Allows sovereign to review and confirm pending deposits/withdrawals
 */

import { getSovereigns } from '../accounts/users'
import { getPendingDeposits, getPendingWithdraws, confirmTransaction } from '../transactions'
import * as readline from 'readline'

const LEDGER_API_URL = process.env.LEDGER_API_URL || 'http://localhost:8080'

interface PendingTransaction {
  id: string
  from: string
  to: string
  amount: string | null
  currencyCode: string | null
  type: string
  status: string
  createdAt: Date
  metadata: any
}

async function confirmDeposit(transactionId: string, sovereignId: string) {
  try {
    const response = await fetch(`${LEDGER_API_URL}/transactions/${transactionId}/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: transactionId,
        confirmerId: sovereignId
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Confirmation failed')
    }

    return await response.json()
  } catch (error: any) {
    throw new Error(`Failed to confirm: ${error.message}`)
  }
}

async function main() {
  console.log('\n👑 === SOVEREIGN DASHBOARD ===\n')

  // Check for sovereign
  console.log('🔍 Checking for sovereign user...')
  const sovereigns = await getSovereigns()

  if (sovereigns.length === 0) {
    console.log('\n❌ No sovereign found!')
    console.log('   Create a sovereign user first with role: "sovereign"\n')
    process.exit(1)
  }

  const sovereign = sovereigns[0]
  console.log(`✅ Logged in as: ${sovereign.username} (${sovereign.displayName})`)
  console.log(`   User ID: ${sovereign.id}\n`)

  // Get pending deposits and withdrawals
  console.log('📊 Fetching pending transactions...\n')
  const [deposits, withdraws] = await Promise.all([
    getPendingDeposits(),
    getPendingWithdraws()
  ])

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`💰 PENDING DEPOSITS: ${deposits.length}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  if (deposits.length === 0) {
    console.log('   No pending deposits\n')
  } else {
    deposits.forEach((tx, index) => {
      const meta = tx.metadata as any
      console.log(`${index + 1}. Transaction: ${tx.id}`)
      console.log(`   Amount: $${tx.amount} ${tx.currencyCode}`)
      console.log(`   User: ${tx.to}`)
      console.log(`   Reference: ${meta?.reference || 'N/A'}`)
      console.log(`   Created: ${new Date(tx.createdAt).toLocaleString()}`)
      console.log(`   Status: ${tx.status}`)
      console.log()
    })
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`💸 PENDING WITHDRAWALS: ${withdraws.length}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  if (withdraws.length === 0) {
    console.log('   No pending withdrawals\n')
  } else {
    withdraws.forEach((tx, index) => {
      const meta = tx.metadata as any
      console.log(`${index + 1}. Transaction: ${tx.id}`)
      console.log(`   Amount: $${tx.amount} ${tx.currencyCode}`)
      console.log(`   User: ${tx.from}`)
      console.log(`   Reference: ${meta?.reference || 'N/A'}`)
      console.log(`   Created: ${new Date(tx.createdAt).toLocaleString()}`)
      console.log(`   Status: ${tx.status}`)
      console.log()
    })
  }

  if (deposits.length === 0 && withdraws.length === 0) {
    console.log('✅ No pending transactions. All clear!\n')
    process.exit(0)
  }

  // Interactive confirmation
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  const question = (prompt: string): Promise<string> => {
    return new Promise(resolve => {
      rl.question(prompt, resolve)
    })
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  while (true) {
    const action = await question('Action: [c]onfirm deposit, [w]ithdraw confirm, [q]uit: ')

    if (action.toLowerCase() === 'q') {
      console.log('\n👋 Goodbye!\n')
      rl.close()
      process.exit(0)
    }

    if (action.toLowerCase() === 'c') {
      if (deposits.length === 0) {
        console.log('❌ No deposits to confirm\n')
        continue
      }

      const txNum = await question(`Enter deposit number (1-${deposits.length}): `)
      const index = parseInt(txNum) - 1

      if (index < 0 || index >= deposits.length) {
        console.log('❌ Invalid number\n')
        continue
      }

      const tx = deposits[index]
      console.log(`\n🔄 Confirming deposit of $${tx.amount} ${tx.currencyCode}...`)

      try {
        const confirmed = await confirmDeposit(tx.id, sovereign.id)
        console.log(`✅ Deposit confirmed!`)
        console.log(`   Transaction: ${confirmed.id}`)
        console.log(`   Status: ${confirmed.status}`)
        console.log(`   User balance has been credited\n`)

        // Remove from list
        deposits.splice(index, 1)

        if (deposits.length === 0 && withdraws.length === 0) {
          console.log('✅ All transactions processed!\n')
          rl.close()
          process.exit(0)
        }
      } catch (error: any) {
        console.log(`❌ Error: ${error.message}\n`)
      }
    } else if (action.toLowerCase() === 'w') {
      if (withdraws.length === 0) {
        console.log('❌ No withdrawals to confirm\n')
        continue
      }

      const txNum = await question(`Enter withdrawal number (1-${withdraws.length}): `)
      const index = parseInt(txNum) - 1

      if (index < 0 || index >= withdraws.length) {
        console.log('❌ Invalid number\n')
        continue
      }

      const tx = withdraws[index]
      console.log(`\n🔄 Confirming withdrawal of $${tx.amount} ${tx.currencyCode}...`)

      try {
        const confirmed = await confirmDeposit(tx.id, sovereign.id)
        console.log(`✅ Withdrawal confirmed!`)
        console.log(`   Transaction: ${confirmed.id}`)
        console.log(`   Status: ${confirmed.status}`)
        console.log(`   User balance has been debited\n`)

        // Remove from list
        withdraws.splice(index, 1)

        if (deposits.length === 0 && withdraws.length === 0) {
          console.log('✅ All transactions processed!\n')
          rl.close()
          process.exit(0)
        }
      } catch (error: any) {
        console.log(`❌ Error: ${error.message}\n`)
      }
    } else {
      console.log('❌ Invalid action\n')
    }
  }
}

main().catch((error) => {
  console.error('\n❌ Error:', error.message)
  process.exit(1)
})
