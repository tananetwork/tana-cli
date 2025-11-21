/**
 * Type definitions for Tana TUI
 */

export interface Service {
  name: string
  displayName: string
  command: string
  cwd: string
  port?: number
  env?: Record<string, string>
  healthCheck?: string
  dependsOn?: string[]
}

export interface ServiceStatus {
  name: string
  status: 'stopped' | 'starting' | 'running' | 'failed'
  pid?: number
  error?: string
}

export interface ValidatorStatus {
  id: string
  healthy: boolean
  currentHeight: number
  peerCount: number
  isLeader: boolean
  lastSeen: number
}

export interface NetworkEdge {
  source: string
  target: string
  type: 'peer' | 'proposal' | 'vote'
}

export interface PendingTransaction {
  id: string
  type: string
  from?: string
  to?: string
  timestamp: number
}

export interface ValidatorEvent {
  id: string
  timestamp: number
  validatorId: string
  event: string
  details?: string
}

export interface NetworkState {
  validators: ValidatorStatus[]
  edges: NetworkEdge[]
  pendingTransactions: PendingTransaction[]
  events: ValidatorEvent[]
  lastUpdate: number
}
