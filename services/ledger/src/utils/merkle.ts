/**
 * Merkle Tree Utilities
 *
 * Provides cryptographic verification for blockchain state
 */

import { createHash } from 'crypto'

// ============================================================================
// HASHING
// ============================================================================

/**
 * Compute SHA256 hash of any object (deterministic)
 */
export function hashObject(obj: any): string {
  // Sort keys for deterministic hashing
  const sortedJson = JSON.stringify(obj, Object.keys(obj).sort())
  return createHash('sha256').update(sortedJson).digest('hex')
}

/**
 * Compute SHA256 hash of a string
 */
export function hashString(str: string): string {
  return createHash('sha256').update(str).digest('hex')
}

/**
 * Compute SHA256 hash of concatenated strings
 */
export function hashConcat(...hashes: string[]): string {
  const combined = hashes.join('')
  return createHash('sha256').update(combined).digest('hex')
}

// ============================================================================
// MERKLE TREE
// ============================================================================

export interface MerkleProof {
  leaf: string         // Hash of the leaf value
  siblings: string[]   // Sibling hashes needed to compute root
  path: boolean[]      // Path: false = left, true = right
  root: string         // Expected root hash
}

/**
 * Build Merkle root from array of leaves
 */
export function buildMerkleRoot(leaves: any[]): string {
  if (leaves.length === 0) {
    return hashString('empty-tree')
  }

  // Hash all leaves
  const leafHashes = leaves.map(leaf => hashObject(leaf))

  return buildMerkleRootFromHashes(leafHashes)
}

/**
 * Build Merkle root from array of hashes
 */
export function buildMerkleRootFromHashes(hashes: string[]): string {
  if (hashes.length === 0) {
    return hashString('empty-tree')
  }

  if (hashes.length === 1) {
    return hashes[0]
  }

  // Build next level
  const nextLevel: string[] = []

  for (let i = 0; i < hashes.length; i += 2) {
    const left = hashes[i]
    const right = hashes[i + 1] || left // Duplicate last if odd
    const parent = hashConcat(left, right)
    nextLevel.push(parent)
  }

  // Recurse
  return buildMerkleRootFromHashes(nextLevel)
}

/**
 * Generate Merkle proof for a specific leaf
 */
export function generateMerkleProof(
  leaves: any[],
  leafIndex: number
): MerkleProof {
  if (leaves.length === 0) {
    throw new Error('Cannot generate proof for empty tree')
  }

  if (leafIndex < 0 || leafIndex >= leaves.length) {
    throw new Error('Leaf index out of bounds')
  }

  const leafHashes = leaves.map(leaf => hashObject(leaf))
  const leaf = leafHashes[leafIndex]
  const siblings: string[] = []
  const path: boolean[] = []

  // Build proof by walking up the tree
  let currentLevel = leafHashes
  let currentIndex = leafIndex

  while (currentLevel.length > 1) {
    // Find sibling
    const isRight = currentIndex % 2 === 1
    const siblingIndex = isRight ? currentIndex - 1 : currentIndex + 1

    if (siblingIndex < currentLevel.length) {
      siblings.push(currentLevel[siblingIndex])
      path.push(isRight)
    }

    // Move to next level
    const nextLevel: string[] = []
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i]
      const right = currentLevel[i + 1] || left
      nextLevel.push(hashConcat(left, right))
    }

    currentLevel = nextLevel
    currentIndex = Math.floor(currentIndex / 2)
  }

  const root = currentLevel[0]

  return { leaf, siblings, path, root }
}

/**
 * Verify Merkle proof
 */
export function verifyMerkleProof(proof: MerkleProof, value: any): boolean {
  const computedLeaf = hashObject(value)

  if (computedLeaf !== proof.leaf) {
    return false
  }

  let currentHash = proof.leaf

  // Walk up the tree using siblings
  for (let i = 0; i < proof.siblings.length; i++) {
    const sibling = proof.siblings[i]
    const isRight = proof.path[i]

    if (isRight) {
      currentHash = hashConcat(sibling, currentHash)
    } else {
      currentHash = hashConcat(currentHash, sibling)
    }
  }

  return currentHash === proof.root
}

// ============================================================================
// STATE ROOT COMPUTATION
// ============================================================================

export interface StateItem {
  key: string    // Unique identifier
  value: any     // Any JSON-serializable value
}

/**
 * Compute state root from array of state items
 * State items must be sorted by key for determinism
 */
export function computeStateRoot(items: StateItem[]): string {
  // Sort by key for deterministic ordering
  const sorted = items.slice().sort((a, b) => a.key.localeCompare(b.key))

  // Hash each item
  const hashes = sorted.map(item => hashObject(item))

  // Build Merkle root
  return buildMerkleRootFromHashes(hashes)
}

/**
 * Generate proof for a specific state item
 */
export function generateStateProof(
  items: StateItem[],
  key: string
): MerkleProof | null {
  // Sort by key
  const sorted = items.slice().sort((a, b) => a.key.localeCompare(b.key))

  // Find index
  const index = sorted.findIndex(item => item.key === key)
  if (index === -1) {
    return null
  }

  // Generate proof
  return generateMerkleProof(sorted, index)
}

// ============================================================================
// BLOCK HASHING
// ============================================================================

export interface BlockContent {
  height: number
  previousHash: string
  timestamp: Date | string
  producer: string
  transactions: any[]
  stateChanges: any[]
  contentRefs?: any[]
  txRoot: string
  stateRoot: string
  gasUsed: number
  gasLimit: number
}

/**
 * Compute block hash (used for block.hash and producer signature)
 */
export function computeBlockHash(content: BlockContent): string {
  // Create deterministic representation
  const canonical = {
    height: content.height,
    previousHash: content.previousHash,
    timestamp: content.timestamp.toString(),
    producer: content.producer,
    txRoot: content.txRoot,
    stateRoot: content.stateRoot,
    gasUsed: content.gasUsed,
    gasLimit: content.gasLimit,
    // Include full data for complete tamper detection
    transactions: content.transactions,
    stateChanges: content.stateChanges,
    contentRefs: content.contentRefs || []
  }

  return hashObject(canonical)
}

/**
 * Verify block hash
 */
export function verifyBlockHash(block: BlockContent, expectedHash: string): boolean {
  const computedHash = computeBlockHash(block)
  return computedHash === expectedHash
}
