#!/usr/bin/env bun
import { Command } from 'commander'
import * as commands from './commands/index'
import { meshCommand } from './commands/mesh'
import { initValidator } from './commands/init'
import packageJson from './package.json'

const program = new Command()

program
  .name('tana')
  .version(packageJson.version)
  .description('Tana blockchain CLI - https://tana.network')

// ============================================================================
// NEW COMMANDS - Create new entities
// ============================================================================

const newCommand = program
  .command('new')
  .description('Create new chain, node, user, or contract')
  .action(() => {
    newCommand.help()
  })

newCommand
  .command('chain <name>')
  .description('Create a new blockchain (you become the genesis leader)')
  .action(async (name: string) => {
    await commands.newChain(name)
  })

newCommand
  .command('node')
  .description('Create a new node to join an existing chain')
  .option('--connect <url>', 'Chain URL to connect to')
  .action(async (options) => {
    await commands.newNode(options.connect)
  })

newCommand
  .command('user <username>')
  .description('Create a new user account')
  .option('-n, --name <name>', 'Display name')
  .option('-b, --bio <bio>', 'User bio')
  .option('-r, --role <role>', 'User role (sovereign, staff, or user)', 'user')
  .action(async (username: string, options) => {
    await commands.newUser(username, options)
  })

newCommand
  .command('contract [name]')
  .description('Scaffold a new smart contract')
  .action(async (name?: string) => {
    await commands.newContract(name)
  })

// ============================================================================
// INIT COMMANDS - Initialize validator and other components
// ============================================================================

const initCommand = program
  .command('init')
  .description('Initialize validator node or other components')
  .action(() => {
    initCommand.help()
  })

initCommand
  .command('validator')
  .description('Initialize a new validator node for consensus')
  .option('-p, --port <port>', 'WebSocket port for consensus', '9000')
  .option('--http-port <port>', 'HTTP port for consensus API', '9001')
  .option('--peers <peers>', 'Comma-separated peer URLs (e.g., ws://val1:9000,ws://val2:9000)')
  .action(async (options) => {
    await initValidator(options)
  })

// ============================================================================
// DEPLOY COMMANDS - Deploy entities to blockchain
// ============================================================================

const deployCommand = program
  .command('deploy')
  .description('Deploy user, contract, or blockchain to network')
  .action(() => {
    deployCommand.help()
  })

deployCommand
  .command('user <username>')
  .description('Deploy user account to blockchain')
  .option('-t, --target <url>', 'Target chain URL')
  .action(async (username: string, options) => {
    await commands.deployUser(username, options.target)
  })

deployCommand
  .command('contract <path>')
  .description('Deploy smart contract to blockchain')
  .option('-t, --target <url>', 'Target chain URL')
  .action(async (path: string, options) => {
    await commands.deployContract(path, options.target)
  })

// ============================================================================
// SERVICE COMMANDS - Manage running services
// ============================================================================

program
  .command('start [mode]')
  .description('Start local chain/node services (mode: tui | webui)')
  .option('-c, --chain <name>', 'Specific chain to start')
  .option('--genesis', 'Initialize genesis block (first-time setup)')
  .action(async (mode: string | undefined, options) => {
    await commands.start({
      mode,
      chain: options.chain,
      genesis: options.genesis
    })
  })

program
  .command('stop')
  .description('Stop running services')
  .action(async () => {
    await commands.stop()
  })

program
  .command('status')
  .description('Show status of running services and chains')
  .action(async () => {
    await commands.status()
  })

// ============================================================================
// BLOCK COMMANDS - Block production
// ============================================================================

program
  .command('block produce')
  .alias('produce')
  .description('Produce a new block from pending transactions')
  .action(async () => {
    await commands.produceBlock()
  })

// ============================================================================
// MESH COMMANDS - Network coordination
// ============================================================================

program.addCommand(meshCommand)

// ============================================================================
// UTILITY COMMANDS
// ============================================================================

program
  .command('run <contract>')
  .description('Test run a contract locally')
  .action(async (contract: string) => {
    await commands.runContract(contract)
  })

program
  .command('balance <user>')
  .description('Check user balance')
  .option('-c, --currency <code>', 'Currency code (default: USD)', 'USD')
  .action(async (user: string, options) => {
    await commands.checkBalance(user, options.currency)
  })

program
  .command('transfer <from> <to> <amount> <currency>')
  .description('Transfer funds between users')
  .action(async (from: string, to: string, amount: string, currency: string) => {
    await commands.transfer(from, to, amount, currency)
  })

program
  .command('check')
  .description('Validate system requirements')
  .action(async () => {
    await commands.check()
  })

program.parse()