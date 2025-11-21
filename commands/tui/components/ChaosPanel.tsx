/**
 * Chaos Engineering Panel
 * Validator selector and action buttons
 */

import React, { useState } from 'react'
import { useKeyboard } from '@opentui/react'
import type { ValidatorStatus } from '../types.js'

interface ChaosPanelProps {
  validators: ValidatorStatus[]
  selectedId: string
  onSelectId: (id: string) => void
  focused: boolean
}

const CHAOS_ACTIONS = [
  { key: 'k', label: 'Kill', emoji: '💀' },
  { key: 'p', label: 'Partition', emoji: '🌐' },
  { key: 'c', label: 'Corrupt', emoji: '💥' },
  { key: 'l', label: 'Lag', emoji: '⏱️' },
  { key: 'b', label: 'Byzantine', emoji: '🤖' },
  { key: 'r', label: 'Recover', emoji: '✨' }
]

export function ChaosPanel({
  validators,
  selectedId,
  onSelectId,
  focused
}: ChaosPanelProps) {
  const [message, setMessage] = useState<string>('')

  useKeyboard(async (key) => {
    if (!focused || !selectedId) return

    const action = CHAOS_ACTIONS.find(a => a.key === key)
    if (!action) return

    try {
      const endpoint = action.label.toLowerCase()
      const response = await fetch(`http://localhost:3001/api/chaos/${endpoint}-validator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ validatorId: selectedId })
      })

      const result = await response.json()
      setMessage(result.message || result.error || 'Action completed')
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      setMessage(`Error: ${String(error)}`)
      setTimeout(() => setMessage(''), 5000)
    }
  })

  return (
    <box border borderStyle={focused ? 'double' : 'single'} flex={1}>
      <box flexDirection="column" padding={1}>
        <text>
          <span fg="red">
            <strong>⚡ Chaos Engineering</strong>
          </span>
        </text>
        <text> </text>

        <box flexDirection="row">
          {/* Left: Validator Selector */}
          <box flex={1}>
            <box flexDirection="column">
              <text>
                <span fg="gray">Selected Validator:</span>
              </text>
              <select
                value={selectedId}
                onChange={(value) => onSelectId(value)}
                focused={focused}
              >
                <option value="">Select Validator</option>
                {validators.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.id} {v.isLeader ? '👑' : ''}
                  </option>
                ))}
              </select>
            </box>
          </box>

          {/* Right: Actions */}
          <box flex={1} paddingLeft={2}>
            <box flexDirection="column">
              <text>
                <span fg="gray">Actions:</span>
              </text>
              {CHAOS_ACTIONS.map(action => (
                <text key={action.key}>
                  {action.emoji} [{action.key}] {action.label}
                </text>
              ))}
            </box>
          </box>
        </box>

        {message && (
          <box marginTop={1} padding={1} border borderStyle="single">
            <text>
              <span fg="yellow">{message}</span>
            </text>
          </box>
        )}
      </box>
    </box>
  )
}
