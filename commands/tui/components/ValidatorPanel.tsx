/**
 * Validator List Panel
 * Shows validator status in text mode (graph mode omitted for TUI)
 */

import React from 'react'
import { useKeyboard } from '@opentui/react'
import type { ValidatorStatus } from '../types.js'

interface ValidatorPanelProps {
  validators: ValidatorStatus[]
  height: number
  selectedId: string
  onSelectId: (id: string) => void
  focused: boolean
}

export function ValidatorPanel({
  validators,
  height,
  selectedId,
  onSelectId,
  focused
}: ValidatorPanelProps) {
  const selectedIndex = validators.findIndex(v => v.id === selectedId)

  // Keyboard navigation
  useKeyboard((key) => {
    if (!focused) return

    if (key === 'up' && selectedIndex > 0) {
      onSelectId(validators[selectedIndex - 1].id)
    } else if (key === 'down' && selectedIndex < validators.length - 1) {
      onSelectId(validators[selectedIndex + 1].id)
    }
  })

  return (
    <box border borderStyle={focused ? 'double' : 'single'} height={height}>
      <box flexDirection="column">
        <box paddingX={1}>
          <text>
            <span fg="green">
              <strong>Validators</strong>
            </span>
          </text>
        </box>

        <scrollbox height={height - 3}>
          {validators.length === 0 ? (
            <box paddingX={2}>
              <text>
                <span fg="gray">No validators online</span>
              </text>
            </box>
          ) : (
            validators.map((validator) => (
              <box
                key={validator.id}
                paddingX={1}
                bg={validator.id === selectedId && focused ? 'blue' : undefined}
              >
                <box flexDirection="column">
                  <text>
                    <span fg={validator.id === selectedId ? 'white' : 'cyan'}>
                      {validator.id === selectedId ? '▶ ' : '  '}
                      {validator.id}
                    </span>
                    {validator.isLeader && <span> 👑</span>}
                    {validator.healthy ? (
                      <span fg="green"> ✓ HEALTHY</span>
                    ) : (
                      <span fg="red"> ✗ UNHEALTHY</span>
                    )}
                  </text>
                  <text>
                    <span fg="gray">
                      {'  '}Height: {validator.currentHeight} | Peers: {validator.peerCount} |
                      Seen: {new Date(validator.lastSeen).toLocaleTimeString()}
                    </span>
                  </text>
                </box>
              </box>
            ))
          )}
        </scrollbox>
      </box>
    </box>
  )
}
