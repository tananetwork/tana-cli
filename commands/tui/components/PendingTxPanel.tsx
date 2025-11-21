/**
 * Pending Transactions Panel
 * Scrollable list of pending transactions with detail view
 */

import React from 'react'
import { useKeyboard } from '@opentui/react'
import type { PendingTransaction } from '../types.js'
import { formatDistanceToNow } from 'date-fns'

interface PendingTxPanelProps {
  transactions: PendingTransaction[]
  height: number
  selectedIndex: number
  onSelectIndex: (index: number) => void
  focused: boolean
}

export function PendingTxPanel({
  transactions,
  height,
  selectedIndex,
  onSelectIndex,
  focused
}: PendingTxPanelProps) {
  // Keyboard navigation (only when focused)
  useKeyboard((key) => {
    if (!focused) return

    if (key === 'up' && selectedIndex > 0) {
      onSelectIndex(selectedIndex - 1)
    } else if (key === 'down' && selectedIndex < transactions.length - 1) {
      onSelectIndex(selectedIndex + 1)
    }
  })

  const selectedTx = transactions[selectedIndex]

  return (
    <box flexDirection="column" height={height}>
      {/* Transaction List */}
      <box border borderStyle={focused ? 'double' : 'single'} flex={1}>
        <box flexDirection="column">
          <box paddingX={1} paddingY={0}>
            <text>
              <span fg="yellow">
                <strong>Pending Transactions</strong>
              </span>
            </text>
          </box>

          <scrollbox height={height - 10}>
            {transactions.length === 0 ? (
              <box paddingX={2}>
                <text>
                  <span fg="gray">No pending transactions</span>
                </text>
              </box>
            ) : (
              transactions.map((tx, i) => (
                <box
                  key={tx.id}
                  paddingX={1}
                  bg={i === selectedIndex && focused ? 'blue' : undefined}
                >
                  <text>
                    <span fg={i === selectedIndex ? 'white' : 'gray'}>
                      {i === selectedIndex ? '▶' : ' '} {tx.id.substring(0, 12)}... [{tx.type}]
                    </span>
                  </text>
                </box>
              ))
            )}
          </scrollbox>
        </box>
      </box>

      {/* Transaction Detail */}
      {selectedTx && (
        <box border borderStyle="single" marginTop={1} padding={1}>
          <box flexDirection="column">
            <text>
              <span fg="cyan">
                <strong>Transaction Details</strong>
              </span>
            </text>
            <text> </text>
            <text>
              <span fg="gray">ID:</span> {selectedTx.id}
            </text>
            <text>
              <span fg="gray">Type:</span> {selectedTx.type}
            </text>
            {selectedTx.from && (
              <text>
                <span fg="gray">From:</span> {selectedTx.from}
              </text>
            )}
            {selectedTx.to && (
              <text>
                <span fg="gray">To:</span> {selectedTx.to}
              </text>
            )}
            <text>
              <span fg="gray">Age:</span> {formatDistanceToNow(selectedTx.timestamp)} ago
            </text>
          </box>
        </box>
      )}
    </box>
  )
}
