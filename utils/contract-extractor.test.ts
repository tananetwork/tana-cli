import { describe, test, expect } from 'bun:test'
import { extractContractFunctions } from './contract-extractor'

describe('Contract Function Extractor', () => {
  test('extracts all four functions', () => {
    const source = `
import { console } from 'tana/core'
import { data } from 'tana/data'
import { Response } from 'tana/net'

export function init() {
  console.log('Initializing contract')
  data.set('initialized', Date.now())
}

export function contract() {
  return { success: true }
}

export function get(req) {
  return Response.json({ message: 'Hello' })
}

export function post(req) {
  return Response.json({ received: req.body })
}
`

    const result = extractContractFunctions(source)

    expect(result.hasInit).toBe(true)
    expect(result.hasContract).toBe(true)
    expect(result.hasGet).toBe(true)
    expect(result.hasPost).toBe(true)

    expect(result.initCode).toContain('export function init()')
    expect(result.initCode).toContain("import { console } from 'tana/core'")
    expect(result.initCode).toContain("import { data } from 'tana/data'")

    expect(result.contractCode).toContain('export function contract()')
    expect(result.getCode).toContain('export function get(req)')
    expect(result.postCode).toContain('export function post(req)')
  })

  test('handles contract with only required contract() function', () => {
    const source = `
import { console } from 'tana/core'

export function contract() {
  console.log('Running contract')
  return { success: true }
}
`

    const result = extractContractFunctions(source)

    expect(result.hasInit).toBe(false)
    expect(result.hasContract).toBe(true)
    expect(result.hasGet).toBe(false)
    expect(result.hasPost).toBe(false)

    expect(result.initCode).toBe(null)
    expect(result.contractCode).toContain('export function contract()')
    expect(result.getCode).toBe(null)
    expect(result.postCode).toBe(null)
  })

  test('handles async functions', () => {
    const source = `
import { data } from 'tana/data'

export async function init() {
  await data.set('key', 'value')
}

export async function contract() {
  const value = await data.get('key')
  return { value }
}

export async function get(req) {
  return Response.json({ async: true })
}
`

    const result = extractContractFunctions(source)

    expect(result.initCode).toContain('export async function init()')
    expect(result.contractCode).toContain('export async function contract()')
    expect(result.getCode).toContain('export async function get(req)')
  })

  test('handles functions with type annotations', () => {
    const source = `
import { Request, Response } from 'tana/net'

export function contract(): { success: boolean } {
  return { success: true }
}

export function get(req: Request): Response {
  return Response.json({ data: 'test' })
}
`

    const result = extractContractFunctions(source)

    expect(result.contractCode).toContain('export function contract(): { success: boolean }')
    expect(result.getCode).toContain('export function get(req: Request): Response')
  })

  test('handles nested braces in function bodies', () => {
    const source = `
export function contract() {
  const data = {
    nested: {
      value: 'test'
    }
  }

  if (true) {
    const inner = {
      more: 'nesting'
    }
  }

  return data
}
`

    const result = extractContractFunctions(source)

    expect(result.contractCode).toContain('nested: {')
    expect(result.contractCode).toContain('more: ')
    expect(result.contractCode).toContain('return data')
  })

  test('handles strings with braces', () => {
    const source = `
export function contract() {
  const message = "This {has} some {braces}"
  const template = \`Also {template} strings\`
  return { message }
}
`

    const result = extractContractFunctions(source)

    expect(result.contractCode).toContain('{has}')
    expect(result.contractCode).toContain('{template}')
  })

  test('handles comments with braces', () => {
    const source = `
export function contract() {
  // This comment has { braces }
  /* Block comment with {braces} */
  return { success: true }
}
`

    const result = extractContractFunctions(source)

    expect(result.contractCode).toContain('// This comment has { braces }')
    expect(result.contractCode).toContain('/* Block comment with {braces} */')
  })

  test('throws error when contract() function is missing', () => {
    const source = `
export function init() {
  console.log('Only init')
}
`

    expect(() => {
      extractContractFunctions(source)
    }).toThrow('Contract must export a contract() function')
  })

  test('preserves all imports for each extracted function', () => {
    const source = `
import { console } from 'tana/core'
import { data } from 'tana/data'
import { Response } from 'tana/net'

export function contract() {
  return { success: true }
}

export function get(req) {
  return Response.json({ message: 'Hello' })
}
`

    const result = extractContractFunctions(source)

    // All imports should be in both extracted functions
    expect(result.contractCode).toContain("import { console } from 'tana/core'")
    expect(result.contractCode).toContain("import { data } from 'tana/data'")
    expect(result.contractCode).toContain("import { Response } from 'tana/net'")

    expect(result.getCode).toContain("import { console } from 'tana/core'")
    expect(result.getCode).toContain("import { data } from 'tana/data'")
    expect(result.getCode).toContain("import { Response } from 'tana/net'")
  })
})
