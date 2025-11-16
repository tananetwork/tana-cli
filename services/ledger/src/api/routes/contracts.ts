/**
 * Contract API Routes
 */

import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import * as contractService from '../../contracts'

const app = new Hono()

// Validation schema for contract deployment
const deployContractSchema = z.object({
  ownerUsername: z.string().min(1),
  name: z.string().min(1).max(100),
  sourceCode: z.string().min(1),
  codeHash: z.string().length(64), // SHA-256 hash is 64 hex characters

  // Extracted functions (already extracted by CLI)
  initCode: z.string().nullable().optional(),
  contractCode: z.string().min(1), // Required function
  getCode: z.string().nullable().optional(),
  postCode: z.string().nullable().optional(),

  // Function availability flags
  hasInit: z.boolean(),
  hasGet: z.boolean(),
  hasPost: z.boolean(),

  version: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  signature: z.string().min(1), // Ed25519 signature
  timestamp: z.number().int().positive(),
  nonce: z.number().int().min(0)
})

// POST /contracts - Deploy new contract
app.post('/', zValidator('json', deployContractSchema), async (c) => {
  const body = c.req.valid('json')

  try {
    const result = await contractService.deployContract(body)
    return c.json(result, 201)
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
})

// GET /contracts - List all contracts
app.get('/', async (c) => {
  const limit = parseInt(c.req.query('limit') || '50')
  const offset = parseInt(c.req.query('offset') || '0')

  const contracts = await contractService.listContracts(limit, offset)
  return c.json(contracts)
})

// GET /contracts/:id - Get contract by ID
app.get('/:id', async (c) => {
  const { id } = c.req.param()
  const contract = await contractService.getContract(id)

  if (!contract) {
    return c.json({ error: 'Contract not found' }, 404)
  }

  return c.json(contract)
})

// GET /contracts/owner/:ownerId - Get contracts by owner
app.get('/owner/:ownerId', async (c) => {
  const { ownerId } = c.req.param()
  const limit = parseInt(c.req.query('limit') || '50')
  const offset = parseInt(c.req.query('offset') || '0')

  const contracts = await contractService.getContractsByOwner(ownerId, limit, offset)
  return c.json(contracts)
})

// POST /contracts/:id/deactivate - Deactivate contract
app.post('/:id/deactivate', async (c) => {
  const { id } = c.req.param()

  try {
    const contract = await contractService.deactivateContract(id)

    if (!contract) {
      return c.json({ error: 'Contract not found' }, 404)
    }

    return c.json(contract)
  } catch (error: any) {
    return c.json({ error: error.message }, 400)
  }
})

export default app
