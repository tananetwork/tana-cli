/**
 * Test AST-based validation vs regex-based validation
 *
 * Demonstrates that AST parsing can't be fooled by strings/comments
 */

import { validateHttpHandlerExports } from './contract-validator'

console.log('Testing AST-based validation (no false positives)\n')

// Test 1: False positive with strings (AST should pass, regex would fail)
const falsePositiveCode = `
import { kv } from 'tana/kv'
import { console } from 'tana/core'

// This comment mentions: function init() should not trigger
const tutorial = "Here's how to write function init() {...}"
const example = \`
  Example code:
  function init() {
    console.log('example')
  }
\`

async function Get(req: any) {
  console.log('Documentation about init():', tutorial)
  return {
    status: 200,
    body: { message: 'This should pass - no actual init export' }
  }
}

export { Get as get }
`

console.log('Test 1: Strings/Comments containing "function init()"')
const result1 = validateHttpHandlerExports(falsePositiveCode, 'get')
console.log('Result:', result1.valid ? '✅ PASS' : '❌ FAIL')
console.log('Exports found:', result1.exports)
if (result1.error) console.log('Error:', result1.error)
console.log()

// Test 2: Actual violation (should fail)
const actualViolationCode = `
import { kv } from 'tana/kv'

async function init() {
  await kv.put('forbidden', 'value')
  return { initialized: true }
}

async function get(req: any) {
  return { status: 200, body: {} }
}

export { init, get }
`

console.log('Test 2: Actual init() export (should be caught)')
const result2 = validateHttpHandlerExports(actualViolationCode, 'get')
console.log('Result:', result2.valid ? '❌ FAIL (should have been blocked!)' : '✅ PASS (correctly blocked)')
console.log('Exports found:', result2.exports)
if (result2.error) console.log('Error:', result2.error.split('\n')[0])
console.log()

// Test 3: Case insensitivity
const caseInsensitiveCode = `
async function Init() {
  return { initialized: true }
}

async function get(req: any) {
  return { status: 200, body: {} }
}

export { Init, get }
`

console.log('Test 3: Capitalized Init() (should be caught)')
const result3 = validateHttpHandlerExports(caseInsensitiveCode, 'get')
console.log('Result:', result3.valid ? '❌ FAIL (should have been blocked!)' : '✅ PASS (correctly blocked)')
console.log('Exports found:', result3.exports)
if (result3.error) console.log('Error:', result3.error.split('\n')[0])
console.log()

// Test 4: Contract() function (should fail)
const contractViolationCode = `
async function contract() {
  return { success: true }
}

async function get(req: any) {
  return { status: 200, body: {} }
}

export { contract, get }
`

console.log('Test 4: contract() export in get handler (should be caught)')
const result4 = validateHttpHandlerExports(contractViolationCode, 'get')
console.log('Result:', result4.valid ? '❌ FAIL (should have been blocked!)' : '✅ PASS (correctly blocked)')
console.log('Exports found:', result4.exports)
if (result4.error) console.log('Error:', result4.error.split('\n')[0])
console.log()

// Test 5: Clean get handler (should pass)
const cleanCode = `
import { kv } from 'tana/kv'
import { console } from 'tana/core'

async function Get(req: any) {
  const value = await kv.get('some-key', { type: 'text' })
  return {
    status: 200,
    body: { value }
  }
}

export { Get as get }
`

console.log('Test 5: Clean get handler (should pass)')
const result5 = validateHttpHandlerExports(cleanCode, 'get')
console.log('Result:', result5.valid ? '✅ PASS' : '❌ FAIL')
console.log('Exports found:', result5.exports)
console.log()

console.log('===================================')
console.log('Summary:')
console.log('- AST parsing correctly identifies actual exports')
console.log('- Strings and comments cannot trigger false positives')
console.log('- Case-insensitive matching catches all variations')
console.log('- More robust than regex pattern matching')
