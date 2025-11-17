#!/usr/bin/env node

const os = require('os')
const path = require('path')
const { spawnSync } = require('child_process')
const { execSync } = require('child_process')

// Detect platform and architecture
const platform = os.platform()
const arch = os.arch()

// Map to package names
let platformPackage
if (platform === 'darwin' && arch === 'arm64') {
  platformPackage = '@tananetwork/tana-darwin-arm64'
} else if (platform === 'darwin' && arch === 'x64') {
  platformPackage = '@tananetwork/tana-darwin-x64'
} else if (platform === 'linux' && arch === 'x64') {
  platformPackage = '@tananetwork/tana-linux-x64'
} else if (platform === 'win32' && arch === 'x64') {
  platformPackage = '@tananetwork/tana-windows-x64'
} else {
  console.error(`Unsupported platform: ${platform}-${arch}`)
  console.error('Tana CLI supports: darwin-arm64, darwin-x64, linux-x64, win32-x64')
  process.exit(1)
}

// Check if installed globally
function is_global() {
  try {
    const globalPath = execSync('npm root -g', { encoding: 'utf-8' }).trim()
    return __dirname.startsWith(globalPath)
  } catch {
    return false
  }
}

// Resolve binary path
let binaryPath
const binaryName = platform === 'win32' ? 'tana.exe' : 'tana'

try {
  if (is_global()) {
    // Global installation
    const globalModules = path.resolve(__dirname, '..', '..', platformPackage)
    binaryPath = path.join(globalModules, binaryName)
  } else {
    // Local installation - use require.resolve to find the platform package
    const packagePath = require.resolve(`${platformPackage}/package.json`)
    binaryPath = path.join(path.dirname(packagePath), binaryName)
  }
} catch (error) {
  console.error(`Failed to locate ${platformPackage}:`, error.message)
  console.error('Try reinstalling: npm install -g @tananetwork/tana')
  process.exit(1)
}

// Execute the binary with all arguments
const result = spawnSync(binaryPath, process.argv.slice(2), {
  stdio: 'inherit',
  env: process.env
})

// Exit with the same code as the binary
process.exit(result.status !== null ? result.status : 1)
