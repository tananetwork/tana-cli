/**
 * Main Dashboard Component
 * Two-column layout matching the web GUI design
 */

import React, { useState, useEffect } from 'react'
import { useTerminalDimensions, useKeyboard } from '@opentui/react'
import type { NetworkState, ServiceStatus } from '../types.js'
import { ServiceTicker } from './ServiceTicker.js'
import { PendingTxPanel } from './PendingTxPanel.js'
import { ValidatorPanel } from './ValidatorPanel.js'
import { EventLogPanel } from './EventLogPanel.js'
import { ChaosPanel } from './ChaosPanel.js'

interface DashboardProps {
  networkState: NetworkState | null
  services: ServiceStatus[]
  wsStatus: 'connecting' | 'connected' | 'disconnected'
}

export function Dashboard({ networkState, services, wsStatus }: DashboardProps) {
  const { width, height } = useTerminalDimensions()
  const [selectedPanel, setSelectedPanel] = useState<'tx' | 'validators' | 'events' | 'chaos'>('validators')
  const [selectedTxIndex, setSelectedTxIndex] = useState(0)
  const [selectedValidatorId, setSelectedValidatorId] = useState<string>('')

  // Keyboard navigation
  useKeyboard((key, modifiers) => {
    if (key === 'tab') {
      // Cycle through panels
      const panels: Array<'tx' | 'validators' | 'events' | 'chaos'> = ['tx', 'validators', 'events', 'chaos']
      const currentIndex = panels.indexOf(selectedPanel)
      setSelectedPanel(panels[(currentIndex + 1) % panels.length])
    } else if (key === 'q' && modifiers.ctrl) {
      process.exit(0)
    }
  })

  // Calculate layout dimensions
  const leftWidth = Math.floor(width * 0.35)
  const rightWidth = width - leftWidth - 2
  const panelHeight = Math.floor((height - 8) / 3)

  return (
    <box flexDirection="column" width={width} height={height}>
      {/* Header */}
      <box border borderStyle="round" paddingX={2}>
        <box flexDirection="row" justifyContent="space-between">
          <text>
            <span fg="cyan">
              <strong>Tana Network Dashboard</strong>
            </span>
          </text>
          <text>
            <span fg={wsStatus === 'connected' ? 'green' : 'red'}>
              {wsStatus === 'connected' ? '● Connected' : '○ Disconnected'}
            </span>
          </text>
        </box>
      </box>

      {/* Service Ticker */}
      <ServiceTicker services={services} />

      {/* Stats Bar */}
      <box border borderStyle="round" paddingX={2}>
        <box flexDirection="row" gap={3}>
          <text>
            <span fg="blue">Validators:</span> {networkState?.validators.length || 0}
          </text>
          <text>
            <span fg="blue">Height:</span>{' '}
            {Math.max(...(networkState?.validators.map(v => v.currentHeight) || [0]))}
          </text>
          <text>
            <span fg="blue">Pending TX:</span> {networkState?.pendingTransactions.length || 0}
          </text>
        </box>
      </box>

      {/* Main Content - Two Columns */}
      <box flexDirection="row" flex={1}>
        {/* Left Column - Pending Transactions */}
        <box width={leftWidth} paddingRight={1}>
          <PendingTxPanel
            transactions={networkState?.pendingTransactions || []}
            height={height - 8}
            selectedIndex={selectedTxIndex}
            onSelectIndex={setSelectedTxIndex}
            focused={selectedPanel === 'tx'}
          />
        </box>

        {/* Right Column - 3 Panels Stacked */}
        <box flexDirection="column" flex={1}>
          {/* Validators */}
          <box height={panelHeight}>
            <ValidatorPanel
              validators={networkState?.validators || []}
              height={panelHeight}
              selectedId={selectedValidatorId}
              onSelectId={setSelectedValidatorId}
              focused={selectedPanel === 'validators'}
            />
          </box>

          {/* Event Log */}
          <box height={panelHeight}>
            <EventLogPanel
              events={networkState?.events || []}
              height={panelHeight}
              focused={selectedPanel === 'events'}
            />
          </box>

          {/* Chaos Panel */}
          <box flex={1}>
            <ChaosPanel
              validators={networkState?.validators || []}
              selectedId={selectedValidatorId}
              onSelectId={setSelectedValidatorId}
              focused={selectedPanel === 'chaos'}
            />
          </box>
        </box>
      </box>

      {/* Footer */}
      <box border borderStyle="round" paddingX={2}>
        <text>
          <span fg="gray">
            [Tab] Switch Panel | [↑↓] Navigate | [Enter] Select | [Ctrl+Q] Quit
          </span>
        </text>
      </box>
    </box>
  )
}
