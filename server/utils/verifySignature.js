import nacl from 'tweetnacl'
import bs58 from 'bs58'

/**
 * Verify a Solana wallet signature
 * @param {string} message - The message that was signed
 * @param {string} signature - Base58 encoded signature
 * @param {string} publicKey - Base58 encoded public key (wallet address)
 * @returns {boolean} - True if signature is valid
 */
export function verifySignature(message, signature, publicKey) {
    try {
        const messageBytes = new TextEncoder().encode(message)
        const signatureBytes = bs58.decode(signature)
        const publicKeyBytes = bs58.decode(publicKey)

        return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes)
    } catch (error) {
        console.error('Signature verification error:', error)
        return false
    }
}

/**
 * Generate a challenge message for signing
 * @param {string} walletAddress - The wallet address
 * @returns {string} - Message to sign
 */
export function generateChallengeMessage(walletAddress) {
    const timestamp = Date.now()
    return `Tamaclaude: Verify wallet ${walletAddress} at ${timestamp}`
}
