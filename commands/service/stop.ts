/**
 * tana stop
 *
 * Stops running services by reading PIDs from ~/.config/tana/pids/
 */

import chalk from 'chalk'
import { isLedgerReachable } from '../../utils/config'
import { StartupManager } from '../../services/startup-manager'
import { spawn } from 'bun'

export async function stop() {
  console.log(chalk.bold('\n🛑 Stopping Tana services...\n'))

  // Get all running service PIDs
  const pids = StartupManager.getRunningPIDs()

  if (pids.size === 0 && !(await isLedgerReachable())) {
    console.log(chalk.gray('No services are currently running.\n'))
    return
  }

  let stoppedCount = 0
  let failedCount = 0

  // Stop each service
  for (const [serviceName, pid] of pids.entries()) {
    try {
      // Check if process is still running
      try {
        process.kill(pid, 0) // Signal 0 just checks if process exists
      } catch {
        // Process already dead, skip
        console.log(chalk.gray(`  ${serviceName.padEnd(15)} (already stopped)`))
        continue
      }

      // Send SIGTERM to gracefully stop
      const killed = StartupManager.killProcess(pid)

      if (killed) {
        console.log(chalk.green(`  ✓ ${serviceName.padEnd(15)} (PID ${pid})`))
        stoppedCount++

        // Wait a bit for graceful shutdown
        await new Promise(resolve => setTimeout(resolve, 500))

        // If still running after 2 seconds, send SIGKILL
        setTimeout(() => {
          try {
            process.kill(pid, 0)
            // Still running, force kill
            process.kill(pid, 'SIGKILL')
            console.log(chalk.yellow(`  ⚠️  ${serviceName} force killed`))
          } catch {
            // Already stopped, good
          }
        }, 2000)
      } else {
        console.log(chalk.red(`  ✗ ${serviceName.padEnd(15)} (failed to stop)`))
        failedCount++
      }
    } catch (error) {
      console.log(chalk.red(`  ✗ ${serviceName.padEnd(15)} (error: ${error})`))
      failedCount++
    }
  }

  // Stop Docker services
  console.log()
  console.log(chalk.gray('Stopping Docker services...'))

  try {
    const proc = spawn(['docker', 'compose', 'down'], {
      cwd: new URL('../../../docker-compose.yml', import.meta.url).pathname.replace('/docker-compose.yml', ''),
      stdout: 'pipe',
      stderr: 'pipe'
    })

    await proc.exited

    if (proc.exitCode === 0) {
      console.log(chalk.green('  ✓ Docker services stopped'))
    } else {
      console.log(chalk.yellow('  ⚠️  Docker services may still be running'))
    }
  } catch (error) {
    console.log(chalk.yellow('  ⚠️  Could not stop Docker services'))
  }

  // Summary
  console.log()
  console.log(chalk.gray('━'.repeat(60)))
  if (stoppedCount > 0) {
    console.log(chalk.green(`✓ Stopped ${stoppedCount} service${stoppedCount > 1 ? 's' : ''}`))
  }
  if (failedCount > 0) {
    console.log(chalk.yellow(`⚠️  Failed to stop ${failedCount} service${failedCount > 1 ? 's' : ''}`))
  }
  console.log()
}
