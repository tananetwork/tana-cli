/**
 * Service Status Ticker
 * Shows all services in a horizontal bar with green/red status
 */

import React from 'react'
import type { ServiceStatus } from '../types.js'

interface ServiceTickerProps {
  services: ServiceStatus[]
}

export function ServiceTicker({ services }: ServiceTickerProps) {
  return (
    <box border borderStyle="round" paddingX={1}>
      <box flexDirection="row" gap={1}>
        {services.map(service => (
          <text key={service.name}>
            {service.status === 'running' && <span fg="green">● {service.name}</span>}
            {service.status === 'starting' && <span fg="yellow">◐ {service.name}</span>}
            {service.status === 'stopped' && <span fg="gray">○ {service.name}</span>}
            {service.status === 'failed' && <span fg="red">✗ {service.name}</span>}
          </text>
        ))}
      </box>
    </box>
  )
}
