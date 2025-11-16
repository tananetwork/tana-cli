/**
 * Contract Validation with Zod
 *
 * Validates contract structure, function exports, and return types
 */

import { z } from 'zod'

// ============================================================================
// JSON Schemas
// ============================================================================

/**
 * JSON Value Schema - Recursively validates JSON-serializable data
 */
export const JsonValueSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(JsonValueSchema),
    z.record(z.string(), JsonValueSchema),
  ])
)

export type JsonValue = z.infer<typeof JsonValueSchema>

// ============================================================================
// Contract Structure Schemas
// ============================================================================

/**
 * Contract function signature validation
 */
export const InitFunctionSchema = z.function()
  .returns(z.union([JsonValueSchema, z.void()]))

export const ContractFunctionSchema = z.function()
  .returns(JsonValueSchema)

export const GetFunctionSchema = z.function()
  .args(z.any()) // Request object
  .returns(JsonValueSchema)

export const PostFunctionSchema = z.function()
  .args(z.any()) // Request object
  .returns(JsonValueSchema)

/**
 * Complete contract module schema
 */
export const ContractModuleSchema = z.object({
  init: InitFunctionSchema.optional(),
  contract: ContractFunctionSchema, // Required
  get: GetFunctionSchema.optional(),
  post: PostFunctionSchema.optional(),
})

export type ContractModule = z.infer<typeof ContractModuleSchema>

// ============================================================================
// Context Schemas (for runtime validation)
// ============================================================================

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(1),
  publicKey: z.string().startsWith('ed25519_'),
})

export const ContractInfoSchema = z.object({
  id: z.string().uuid(),
  owner: UserSchema,
  name: z.string().min(1),
})

export const BlockContextSchema = z.object({
  height: z.number().int().nonnegative(),
  timestamp: z.number().int().positive(),
  hash: z.string().length(64),
})

export const SessionSchema = z.object({
  token: z.string(),
  expiresAt: z.number().int().positive(),
}).nullable()

export const RequestTanaContextSchema = z.object({
  caller: UserSchema.nullable(),
  contract: ContractInfoSchema,
  session: SessionSchema,
})

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate contract source code structure
 */
export interface ContractValidationResult {
  valid: boolean
  hasInit: boolean
  hasContract: boolean
  hasGet: boolean
  hasPost: boolean
  errors: string[]
}

export function validateContractStructure(sourceCode: string): ContractValidationResult {
  const errors: string[] = []

  // Use Bun.Transpiler to scan exports
  try {
    const transpiler = new Bun.Transpiler({ loader: 'ts' })
    const scanResult = transpiler.scan(sourceCode)
    const exports = scanResult.exports || []

    const hasInit = exports.includes('init')
    const hasContract = exports.includes('contract')
    const hasGet = exports.includes('get')
    const hasPost = exports.includes('post')

    // Validate required contract() function
    if (!hasContract) {
      errors.push('Contract must export a contract() function')
    }

    // Check for invalid exports
    const validExports = ['init', 'contract', 'get', 'post']
    const invalidExports = exports.filter(e => !validExports.includes(e))
    if (invalidExports.length > 0) {
      errors.push(`Invalid exports detected: ${invalidExports.join(', ')}. Only init, contract, get, post are allowed.`)
    }

    return {
      valid: errors.length === 0,
      hasInit,
      hasContract,
      hasGet,
      hasPost,
      errors,
    }
  } catch (error) {
    errors.push(`Failed to parse contract: ${error}`)
    return {
      valid: false,
      hasInit: false,
      hasContract: false,
      hasGet: false,
      hasPost: false,
      errors,
    }
  }
}

/**
 * Validate function return value is JSON-serializable
 */
export function validateJsonReturn(value: unknown, functionName: string): {
  valid: boolean
  data?: JsonValue
  error?: string
} {
  try {
    // Allow void/undefined for init()
    if (functionName === 'init' && value === undefined) {
      return { valid: true }
    }

    const result = JsonValueSchema.safeParse(value)

    if (!result.success) {
      return {
        valid: false,
        error: `${functionName}() must return JSON-serializable data: ${result.error.message}`,
      }
    }

    return {
      valid: true,
      data: result.data,
    }
  } catch (error) {
    return {
      valid: false,
      error: `${functionName}() validation failed: ${error}`,
    }
  }
}

/**
 * Validate request context data
 */
export function validateRequestContext(context: unknown): {
  valid: boolean
  data?: z.infer<typeof RequestTanaContextSchema>
  error?: string
} {
  const result = RequestTanaContextSchema.safeParse(context)

  if (!result.success) {
    return {
      valid: false,
      error: `Invalid request context: ${result.error.message}`,
    }
  }

  return {
    valid: true,
    data: result.data,
  }
}

/**
 * Validate contract deployment transaction
 */
export const ContractDeploymentSchema = z.object({
  ownerId: z.string().uuid(),
  name: z.string().min(1).max(100),
  sourceCode: z.string().min(1).max(500_000), // 500KB max
  codeHash: z.string().length(64),
  signature: z.string().startsWith('ed25519_'),
  timestamp: z.number().int().positive(),
  nonce: z.number().int().nonnegative(),
})

export function validateDeployment(data: unknown): {
  valid: boolean
  data?: z.infer<typeof ContractDeploymentSchema>
  errors?: z.ZodError
} {
  const result = ContractDeploymentSchema.safeParse(data)

  if (!result.success) {
    return {
      valid: false,
      errors: result.error,
    }
  }

  return {
    valid: true,
    data: result.data,
  }
}

// ============================================================================
// Runtime-Level Enforcement (AST-based, no false positives)
// ============================================================================

// TODO: INVESTIGATE - Why are we using Bun.Transpiler.scan() for validation?
// This creates a dependency on Bun runtime in our validator code.
// Questions to answer:
// 1. Can we use TypeScript compiler API instead?
// 2. Do we need AST parsing at all, or can tana-runtime do this validation?
// 3. Should validation happen in Rust (tana-runtime) instead of TypeScript?
// 4. Does this break if we want to run the CLI with Node.js instead of Bun?
// Priority: Medium - Works fine now, but architectural concern for portability

export interface RuntimeValidationResult {
  valid: boolean
  error?: string
  exports: string[]
}

/**
 * Validate that HTTP handler files (get/post) don't export state-changing functions
 *
 * Uses Bun.Transpiler.scan() to parse actual exports from AST,
 * avoiding false positives from strings/comments.
 */
export function validateHttpHandlerExports(
  sourceCode: string,
  handlerType: 'get' | 'post'
): RuntimeValidationResult {
  try {
    // Parse the source code AST to get actual exports
    const transpiler = new Bun.Transpiler({ loader: 'ts' })
    const scanResult = transpiler.scan(sourceCode)
    const exports = scanResult.exports || []

    // Check for forbidden exports (case-insensitive)
    const forbiddenExports = ['init', 'contract']
    const normalizedExports = exports.map(e => e.toLowerCase())

    for (const forbidden of forbiddenExports) {
      if (normalizedExports.includes(forbidden)) {
        return {
          valid: false,
          error: `Runtime Security Error: ${forbidden}() function exported in ${handlerType}() handler.

HTTP handlers (get/post) cannot export state-changing functions.
- init() and contract() must run in block producer (consensus-validated)
- get() and post() run in tana-edge (read-only HTTP handlers)

This separation ensures all state changes go through blockchain consensus.`,
          exports
        }
      }
    }

    return {
      valid: true,
      exports
    }
  } catch (error: any) {
    return {
      valid: false,
      error: `Failed to parse contract: ${error.message}`,
      exports: []
    }
  }
}

/**
 * Validate that runtime contract files (init/contract) don't export HTTP handlers
 *
 * This is informational/educational - returns a warning instead of blocking.
 */
export function validateRuntimeExports(
  sourceCode: string
): { hasHttpHandlers: boolean; handlers: string[] } {
  try {
    const transpiler = new Bun.Transpiler({ loader: 'ts' })
    const scanResult = transpiler.scan(sourceCode)
    const exports = scanResult.exports || []

    // Check for HTTP handler exports (case-insensitive)
    const httpHandlers = ['get', 'post']
    const normalizedExports = exports.map(e => e.toLowerCase())
    const foundHandlers = exports.filter(e =>
      httpHandlers.includes(e.toLowerCase())
    )

    return {
      hasHttpHandlers: foundHandlers.length > 0,
      handlers: foundHandlers
    }
  } catch (error) {
    return {
      hasHttpHandlers: false,
      handlers: []
    }
  }
}

/**
 * Get all exports from a contract file (for debugging/introspection)
 */
export function getContractExports(sourceCode: string): string[] {
  try {
    const transpiler = new Bun.Transpiler({ loader: 'ts' })
    const scanResult = transpiler.scan(sourceCode)
    return scanResult.exports || []
  } catch (error) {
    return []
  }
}

// ============================================================================
// Helper Functions for Contract Authors
// ============================================================================

/**
 * Type-safe JSON response builder
 */
export function jsonResponse<T extends JsonValue>(data: T): T {
  // Validate at runtime
  const validation = validateJsonReturn(data, 'jsonResponse')
  if (!validation.valid) {
    throw new Error(validation.error)
  }
  return data
}

/**
 * Validate and sanitize user input
 */
export function validateInput<T>(schema: z.ZodType<T>, data: unknown): T {
  return schema.parse(data)
}

// ============================================================================
// Common Input Schemas (for contract authors to use)
// ============================================================================

export const Schemas = {
  // Primitive types
  string: z.string(),
  number: z.number(),
  boolean: z.boolean(),

  // Common patterns
  uuid: z.string().uuid(),
  username: z.string().min(2).max(50).regex(/^@[a-z0-9_]+$/),
  amount: z.string().regex(/^\d+(\.\d{1,8})?$/),
  currencyCode: z.string().min(2).max(10).toUpperCase(),

  // Structured data
  transfer: z.object({
    to: z.string().uuid(),
    amount: z.string().regex(/^\d+(\.\d{1,8})?$/),
    currencyCode: z.string(),
  }),

  // Arrays
  stringArray: z.array(z.string()),
  numberArray: z.array(z.number()),

  // JSON
  json: JsonValueSchema,
}
