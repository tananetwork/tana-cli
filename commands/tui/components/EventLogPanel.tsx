/**
 * Event Log Panel
 * Scrollable list of validator events
 */

import React from 'react'
import type { ValidatorEvent } from '../types.js'

interface EventLogPanelProps {
  events: ValidatorEvent[]
  height: number
  focused: boolean
}

const EVENT_ICONS: Record<string, string> = {
  online: '🟢',
  offline: '🔴',
  leader: '👑',
  follower: '👤',
  block: '📦',
  recovered: '✅',
  unhealthy: '⚠️'
}

export function EventLogPanel({ events, height, focused }: EventLogPanelProps) {
  return (
    <box border borderStyle={focused ? 'double' : 'single'} height={height}>
      <box flexDirection="column">
        <box paddingX={1}>
          <text>
            <span fg="magenta">
              <strong>Event Log</strong>
            </span>
          </text>
        </box>

        <scrollbox height={height - 3}>
          {events.length === 0 ? (
            <box paddingX={2}>
              <text>
                <span fg="gray">No events yet</span>
              </text>
            </box>
          ) : (
            events.map((event) => (
              <box key={event.id} paddingX={1}>
                <text>
                  {EVENT_ICONS[event.event] || '•'}{' '}
                  <span fg="cyan">{event.validatorId}</span>{' '}
                  <span fg="gray">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                  {' - '}
                  {event.details}
                </text>
              </box>
            ))
          )}
        </scrollbox>
      </box>
    </box>
  )
}
