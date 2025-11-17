/**
 * mesh commands
 *
 * Network discovery and coordination commands
 */

import { Command } from 'commander'
import { registerCommand } from './register'
import { approveCommand } from './approve'
import { statusCommand } from './status'
import { listCommand } from './list'

export const meshCommand = new Command('mesh')
  .description('Mesh network coordination commands')
  .addCommand(registerCommand)
  .addCommand(approveCommand)
  .addCommand(statusCommand)
  .addCommand(listCommand)
