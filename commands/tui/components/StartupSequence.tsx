/**
 * Startup Sequence Component
 * Shows services starting up using shared StartupManager
 */

import React, { useState, useEffect } from 'react'
import type { ServiceStatus } from '../types.js'

interface StartupSequenceProps {
  manager: any // StartupManager instance from CLI
  onComplete: () => void
}

interface ServiceState {
  name: string
  displayName: string
  status: ServiceStatus
}

export function StartupSequence({ manager, onComplete }: StartupSequenceProps) {
  const [services, setServices] = useState<ServiceState[]>([])
  const [message, setMessage] = useState<string>('Initializing...')

  useEffect(() => {
    // Get service list from manager
    const serviceList = manager.constructor.getServices()
    setServices(
      serviceList.map((s: any) => ({
        name: s.name,
        displayName: s.displayName,
        status: 'stopped' as ServiceStatus
      }))
    )

    // Listen to manager events
    manager.on('message', (msg: string) => {
      setMessage(msg)
    })

    manager.on('service_status', ({ service, status }: { service: string; status: ServiceStatus }) => {
      setServices(prev =>
        prev.map(s => (s.name === service ? { ...s, status } : s))
      )
    })

    manager.on('error', (error: string) => {
      setMessage(`Error: ${error}`)
    })

    manager.on('complete', () => {
      setMessage('All services started successfully!')
      setTimeout(onComplete, 1000)
    })

    // Start services
    manager.startAll().catch((error: Error) => {
      setMessage(`Startup failed: ${error.message}`)
    })
  }, [manager, onComplete])

  return (
    <box border borderStyle="round" padding={1} flexDirection="column">
      <text>
        <span fg="cyan">
          <strong>Tana Network - Starting Services</strong>
        </span>
      </text>
      <text> </text>

      <text>
        <span fg="gray">{message}</span>
      </text>
      <text> </text>

      {services.map(service => (
        <box key={service.name} paddingLeft={2}>
          <text>
            {service.status === 'stopped' && <span fg="gray">○ {service.displayName}</span>}
            {service.status === 'starting' && (
              <span fg="yellow">◐ {service.displayName}...</span>
            )}
            {service.status === 'running' && <span fg="green">● {service.displayName}</span>}
            {service.status === 'failed' && <span fg="red">✗ {service.displayName}</span>}
          </text>
        </box>
      ))}
    </box>
  )
}
