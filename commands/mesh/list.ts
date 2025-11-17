/**
 * tana mesh list
 *
 * List all nodes in the mesh network
 */

import { Command } from 'commander'

const MESH_URL = process.env.MESH_URL || 'http://mesh:8190'

/**
 * List command
 */
export const listCommand = new Command('list')
  .description('List all nodes in the mesh network')
  .option('--status <status>', 'Filter by status (pending, active, offline, denied)', 'active')
  .option('--all', 'Show all nodes regardless of status')
  .action(async (options) => {
    console.log('')
    console.log('📋 Listing nodes...')
    console.log('')

    const status = options.all ? undefined : options.status

    try {
      const url = status
        ? `${MESH_URL}/nodes?status=${status}`
        : `${MESH_URL}/nodes?status=pending&status=active&status=offline&status=denied`

      const response = await fetch(url)

      if (!response.ok) {
        const result = await response.json()
        console.error(`❌ Error: ${result.error || response.statusText}`)
        process.exit(1)
      }

      const { nodes } = await response.json()

      if (nodes.length === 0) {
        console.log('  No nodes found.')
        if (status) {
          console.log(`  (Filtered by status: ${status})`)
        }
        console.log('')
        console.log('  Try: tana mesh list --all')
        console.log('')
        return
      }

      console.log('━'.repeat(80))
      console.log(`  Nodes (${nodes.length} total)`)
      if (status && !options.all) {
        console.log(`  Filtered by: ${status}`)
      }
      console.log('━'.repeat(80))
      console.log('')

      // Group by status
      const grouped = nodes.reduce((acc: any, node: any) => {
        if (!acc[node.status]) {
          acc[node.status] = []
        }
        acc[node.status].push(node)
        return acc
      }, {})

      // Display each status group
      const statuses = ['active', 'pending', 'offline', 'denied']

      for (const statusGroup of statuses) {
        if (!grouped[statusGroup] || grouped[statusGroup].length === 0) continue

        console.log(`  ${getStatusEmoji(statusGroup)} ${statusGroup.toUpperCase()} (${grouped[statusGroup].length})`)
        console.log('  ' + '─'.repeat(78))
        console.log('')

        grouped[statusGroup].forEach((node: any) => {
          console.log(`    ${node.id.padEnd(20)} ${node.tailscale_hostname}`)
          console.log(`      Public Key: ${node.public_key.slice(0, 16)}...`)

          if (node.services && node.services.length > 0) {
            const serviceTypes = node.services.map((s: any) => s.service_type).join(', ')
            console.log(`      Services: ${serviceTypes}`)
          }

          if (node.last_heartbeat) {
            const lastSeen = getTimeSince(node.last_heartbeat)
            console.log(`      Last seen: ${lastSeen}`)
          }

          console.log('')
        })
      }

      console.log('━'.repeat(80))
      console.log('')
      console.log('  Commands:')
      console.log('    tana mesh status <nodeId>    - View detailed node status')
      console.log('    tana mesh approve <nodeId>   - Approve pending node (sovereign)')
      console.log('')

    } catch (err: any) {
      console.error('❌ Network error:', err.message)
      console.error('')
      console.error('   Is mesh coordinator running?')
      console.error(`   Check: ${MESH_URL}/health`)
      process.exit(1)
    }
  })

function getStatusEmoji(status: string): string {
  switch (status) {
    case 'pending': return '⏳'
    case 'active': return '✅'
    case 'offline': return '⚠️'
    case 'denied': return '❌'
    default: return '❓'
  }
}

function getTimeSince(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return `${seconds}s ago`
}
