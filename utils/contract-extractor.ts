/**
 * Contract Function Extractor
 *
 * Extracts individual functions (init, contract, get, post) from a single
 * TypeScript contract file for separate storage and execution.
 */

interface ExtractedContract {
  initCode: string | null
  contractCode: string | null
  getCode: string | null
  postCode: string | null
  hasInit: boolean
  hasContract: boolean
  hasGet: boolean
  hasPost: boolean
}

/**
 * Extract all exported functions from a contract source file
 */
export function extractContractFunctions(sourceCode: string): ExtractedContract {
  // Validate contract has required exports using Bun.Transpiler
  const transpiler = new Bun.Transpiler({ loader: 'ts' })
  const scanResult = transpiler.scan(sourceCode)

  const exports = scanResult.exports || []

  // Check for required contract() function
  const hasContract = exports.includes('contract')
  if (!hasContract) {
    throw new Error('Contract must export a contract() function')
  }

  // Extract each function
  const initCode = exports.includes('init')
    ? extractFunction(sourceCode, 'init')
    : null

  const contractCode = extractFunction(sourceCode, 'contract')

  const getCode = exports.includes('get')
    ? extractFunction(sourceCode, 'get')
    : null

  const postCode = exports.includes('post')
    ? extractFunction(sourceCode, 'post')
    : null

  return {
    initCode,
    contractCode,
    getCode,
    postCode,
    hasInit: initCode !== null,
    hasContract: true,
    hasGet: getCode !== null,
    hasPost: postCode !== null,
  }
}

/**
 * Extract a single exported function from source code
 * Returns the function with all necessary imports
 */
function extractFunction(sourceCode: string, functionName: string): string | null {
  // Extract all imports from the source
  const imports = extractImports(sourceCode)

  // Find the function declaration
  const functionCode = extractFunctionDeclaration(sourceCode, functionName)

  if (!functionCode) {
    return null
  }

  // Combine imports + function
  const extracted = [
    ...imports,
    '',
    functionCode,
  ].join('\n')

  return extracted
}

/**
 * Extract all import statements from source code
 */
function extractImports(sourceCode: string): string[] {
  const importRegex = /^import\s+.*$/gm
  const imports = sourceCode.match(importRegex) || []
  return imports
}

/**
 * Extract a function declaration by name
 * Handles both sync and async functions, with or without type annotations
 */
function extractFunctionDeclaration(sourceCode: string, functionName: string): string | null {
  // Pattern: export [async] function name(...) [: ReturnType] {
  const functionPattern = new RegExp(
    `export\\s+(async\\s+)?function\\s+${functionName}\\s*\\([^)]*\\)\\s*(?::\\s*[^{]+)?\\s*\\{`,
    'm'
  )

  const match = sourceCode.match(functionPattern)
  if (!match) {
    return null
  }

  const startIndex = match.index!

  // Extract the complete function body with balanced braces
  const functionBody = extractBalancedBraces(sourceCode, startIndex)

  return functionBody
}

/**
 * Extract text from start index to matching closing brace
 * Handles nested braces correctly
 */
function extractBalancedBraces(text: string, startIndex: number): string {
  // Find the opening brace
  let braceDepth = 0
  let currentIndex = startIndex
  let foundOpenBrace = false

  // Scan until we find the opening brace
  while (currentIndex < text.length) {
    if (text[currentIndex] === '{') {
      foundOpenBrace = true
      braceDepth = 1
      currentIndex++
      break
    }
    currentIndex++
  }

  if (!foundOpenBrace) {
    throw new Error('Could not find opening brace for function')
  }

  // Now scan for the matching closing brace
  while (currentIndex < text.length && braceDepth > 0) {
    const char = text[currentIndex]

    // Skip strings to avoid counting braces inside them
    if (char === '"' || char === "'" || char === '`') {
      currentIndex = skipString(text, currentIndex)
      continue
    }

    // Skip comments
    if (char === '/' && currentIndex + 1 < text.length) {
      if (text[currentIndex + 1] === '/') {
        currentIndex = skipLineComment(text, currentIndex)
        continue
      }
      if (text[currentIndex + 1] === '*') {
        currentIndex = skipBlockComment(text, currentIndex)
        continue
      }
    }

    if (char === '{') {
      braceDepth++
    } else if (char === '}') {
      braceDepth--
    }

    currentIndex++
  }

  // Extract the complete function from start to end
  return text.substring(startIndex, currentIndex)
}

/**
 * Skip over a string literal (handles escapes)
 */
function skipString(text: string, startIndex: number): number {
  const quote = text[startIndex]
  let index = startIndex + 1

  while (index < text.length) {
    if (text[index] === '\\') {
      index += 2 // Skip escaped character
      continue
    }
    if (text[index] === quote) {
      return index + 1
    }
    index++
  }

  return index
}

/**
 * Skip over a line comment
 */
function skipLineComment(text: string, startIndex: number): number {
  let index = startIndex + 2
  while (index < text.length && text[index] !== '\n') {
    index++
  }
  return index + 1
}

/**
 * Skip over a block comment
 */
function skipBlockComment(text: string, startIndex: number): number {
  let index = startIndex + 2
  while (index < text.length - 1) {
    if (text[index] === '*' && text[index + 1] === '/') {
      return index + 2
    }
    index++
  }
  return index
}
