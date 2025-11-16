/**
 * Test the full authentication flow
 *
 * This simulates a mobile app scanning a QR code and approving authentication
 */

import { signMessage } from '../../utils/crypto'

const BASE_URL = 'http://localhost:8090'

// Simulate a user's Ed25519 keypair (in production, this is on the mobile device)
const TEST_PRIVATE_KEY = 'ed25519_546e6707e94ae9fbcc5dd2639f282b8220ff1f2ff44d7a9d39e5c3e35c6bbec6'
const TEST_PUBLIC_KEY = 'ed25519_17956be6b8d4af0841d05ee4099a2f6f19a11a733b059f13998b6eff4b2d5660'
const TEST_USER_ID = '550e8400-e29b-41d4-a716-446655440000'
const TEST_USERNAME = 'alice'

async function testAuthFlow() {
  console.log('Testing Tana Identity Service Authentication Flow')
  console.log('='.repeat(60))

  try {
    // Step 1: Create a session (desktop/web)
    console.log('\n1. Creating authentication session...')
    const createResponse = await fetch(`${BASE_URL}/auth/session/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appName: 'Test App',
        returnUrl: 'http://localhost:3000/dashboard',
      }),
    })

    if (!createResponse.ok) {
      throw new Error(`Failed to create session: ${createResponse.statusText}`)
    }

    const session = await createResponse.json()
    console.log('   Session ID:', session.sessionId)
    console.log('   Challenge:', session.challenge)
    console.log('   Expires in:', session.expiresIn, 'seconds')
    console.log('   QR Data:', JSON.stringify(session.qrData, null, 2))

    // Step 2: Scan the QR code (mobile app)
    console.log('\n2. Scanning QR code (mobile app)...')
    const scanResponse = await fetch(`${BASE_URL}/auth/session/${session.sessionId}/scan`, {
      method: 'POST',
    })

    if (!scanResponse.ok) {
      throw new Error(`Failed to scan: ${scanResponse.statusText}`)
    }

    const scanResult = await scanResponse.json()
    console.log('   Scanned successfully')
    console.log('   Challenge received:', scanResult.challenge)

    // Step 3: Sign the challenge (mobile app)
    console.log('\n3. Signing authentication message...')
    const timestamp = Date.now()
    const message = JSON.stringify({
      sessionId: session.sessionId,
      challenge: session.challenge,
      userId: TEST_USER_ID,
      username: TEST_USERNAME,
      timestamp,
    })

    console.log('   Message to sign:', message)

    const signature = await signMessage(message, TEST_PRIVATE_KEY)
    console.log('   Signature:', signature)

    // Step 4: Approve the session (mobile app)
    console.log('\n4. Approving authentication...')
    const approveResponse = await fetch(`${BASE_URL}/auth/session/${session.sessionId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: TEST_USER_ID,
        username: TEST_USERNAME,
        publicKey: TEST_PUBLIC_KEY,
        signature,
        message,
      }),
    })

    if (!approveResponse.ok) {
      const error = await approveResponse.json()
      throw new Error(`Failed to approve: ${JSON.stringify(error)}`)
    }

    const approveResult = await approveResponse.json()
    console.log('   Approved successfully!')
    console.log('   Session token:', approveResult.sessionToken)
    console.log('   User ID:', approveResult.userId)
    console.log('   Username:', approveResult.username)

    // Step 5: Verify the session token
    console.log('\n5. Verifying session token...')
    const verifyResponse = await fetch(`${BASE_URL}/auth/session/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${approveResult.sessionToken}`,
      },
    })

    if (!verifyResponse.ok) {
      throw new Error(`Failed to verify: ${verifyResponse.statusText}`)
    }

    const verifyResult = await verifyResponse.json()
    console.log('   Token is valid!')
    console.log('   User ID:', verifyResult.userId)
    console.log('   Username:', verifyResult.username)
    console.log('   Public Key:', verifyResult.publicKey)
    console.log('   Expires at:', verifyResult.expiresAt)

    console.log('\n' + '='.repeat(60))
    console.log('Authentication flow completed successfully!')

  } catch (error: any) {
    console.error('\nError:', error.message)
    process.exit(1)
  }
}

testAuthFlow()
