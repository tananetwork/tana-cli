/**
 * tana start tui
 *
 * TUI interface for startup manager (interactive dashboard)
 */

import React, { useState, useEffect, useMemo } from 'react'
import { CliRenderer, createRoot } from '@opentui/react'
import { WebSocket } from 'ws'
import { StartupManager } from '../../services/startup-manager'
import { StartupSequence } from '../tui/components/StartupSequence'
import { Dashboard } from '../tui/components/Dashboard'
import type { NetworkState, ServiceStatus } from '../tui/types'
import { readGlobalConfig } from '../../utils/config'

type AppState = 'startup' | 'dashboard'

function TUIApp({ chainName }: { chainName?: string }) {
  const [appState, setAppState] = useState<AppState>('startup')
  const [networkState, setNetworkState] = useState<NetworkState | null>(null)
  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting')
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([])

  // Create StartupManager instance (shared with CLI)
  const startupManager = useMemo(() => new StartupManager(), [])

  // Initialize service statuses from manager
  useEffect(() => {
    const services = StartupManager.getServices()
    setServiceStatuses(
      services
        .filter((s: any) => s.type === 'tana') // Only show Tana services (not Docker)
        .map((s: any) => ({
          name: s.name,
          status: 'stopped'
        }))
    )
  }, [])

  // Connect to topology WebSocket after startup
  useEffect(() => {
    if (appState !== 'dashboard') return

    let ws: WebSocket | null = null
    let reconnectTimeout: NodeJS.Timeout

    const connect = () => {
      try {
        ws = new WebSocket('ws://localhost:8191')

        ws.on('open', () => {
          console.log('[TUI] WebSocket connected')
          setWsStatus('connected')
        })

        ws.on('message', (data: Buffer) => {
          try {
            const message = JSON.parse(data.toString())
            if (message.type === 'network_update') {
              setNetworkState(message.data)

              // Update service statuses based on validators
              setServiceStatuses((prev) =>
                prev.map((s) => {
                  // Check if service port is in use (validator running)
                  const isRunning = message.data.validators.some(
                    (v: any) => v.id.includes(s.name) || (s.port && v.currentHeight > 0)
                  )
                  return {
                    ...s,
                    status: isRunning ? 'running' : s.status,
                  }
                })
              )
            }
          } catch (error) {
            console.error('[TUI] Failed to parse message:', error)
          }
        })

        ws.on('error', (error) => {
          console.error('[TUI] WebSocket error:', error)
          setWsStatus('disconnected')
        })

        ws.on('close', () => {
          console.log('[TUI] WebSocket disconnected')
          setWsStatus('disconnected')

          // Reconnect after 3 seconds
          reconnectTimeout = setTimeout(connect, 3000)
        })
      } catch (error) {
        console.error('[TUI] Failed to connect:', error)
        setWsStatus('disconnected')
        reconnectTimeout = setTimeout(connect, 3000)
      }
    }

    connect()

    return () => {
      if (ws) {
        ws.close()
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
    }
  }, [appState])

  const handleStartupComplete = () => {
    // Get final statuses from manager
    const statuses = startupManager.getStatuses()
    const services = StartupManager.getServices()

    setServiceStatuses(
      services
        .filter((s: any) => s.type === 'tana')
        .map((s: any) => ({
          name: s.name,
          status: (statuses.get(s.name) || 'stopped') as ServiceStatus,
        }))
    )

    // Switch to dashboard
    setTimeout(() => {
      setAppState('dashboard')
    }, 500)
  }

  return (
    <>
      {appState === 'startup' && (
        <StartupSequence manager={startupManager} onComplete={handleStartupComplete} />
      )}

      {appState === 'dashboard' && (
        <Dashboard networkState={networkState} services={serviceStatuses} wsStatus={wsStatus} />
      )}
    </>
  )
}

export async function startTUI(chainName?: string) {
  // Determine which chain to start
  let targetChain = chainName
  if (!targetChain) {
    const config = readGlobalConfig()
    targetChain = config?.defaultChain || 'local'
  }

  // Initialize OpenTUI renderer
  const renderer = new CliRenderer()
  const root = createRoot(renderer)

  // Render app
  root.render(<TUIApp chainName={targetChain} />)

  // Handle cleanup
  const cleanup = () => {
    renderer.stop()
    process.exit(0)
  }

  process.on('SIGINT', cleanup)
  process.on('SIGTERM', cleanup)

  // Keep process alive
  await new Promise(() => {})
}
