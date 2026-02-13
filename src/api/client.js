const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

/**
 * Save a pet run score to the API
 */
export async function saveScore({ walletAddress, score, timeAliveMs, actionsCompleted, causeOfDeath, petType }) {
    try {
        const response = await fetch(`${API_URL}/api/scores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                walletAddress,
                score,
                timeAliveMs,
                actionsCompleted,
                causeOfDeath,
                petType
            })
        })

        if (!response.ok) {
            throw new Error('Failed to save score')
        }

        return await response.json()
    } catch (error) {
        console.error('API Error (saveScore):', error)
        return null
    }
}

/**
 * Get pet history for a wallet
 */
export async function getWalletHistory(walletAddress, limit = 10) {
    try {
        const response = await fetch(`${API_URL}/api/scores/${walletAddress}?limit=${limit}`)

        if (!response.ok) {
            throw new Error('Failed to fetch history')
        }

        return await response.json()
    } catch (error) {
        console.error('API Error (getWalletHistory):', error)
        return { history: [], stats: null }
    }
}

/**
 * Get global leaderboard
 */
export async function getLeaderboard(limit = 10) {
    try {
        const response = await fetch(`${API_URL}/api/scores/leaderboard/top?limit=${limit}`)

        if (!response.ok) {
            throw new Error('Failed to fetch leaderboard')
        }

        return await response.json()
    } catch (error) {
        console.error('API Error (getLeaderboard):', error)
        return []
    }
}
/**
 * Get active pet state for a wallet
 */
export async function getActivePet(walletAddress) {
    try {
        const response = await fetch(`${API_URL}/api/pet/${walletAddress}`)

        if (response.status === 404) return null
        if (!response.ok) throw new Error('Failed to fetch active pet')

        return await response.json()
    } catch (error) {
        console.error('API Error (getActivePet):', error)
        return null
    }
}

/**
 * Sync active pet state to the API
 */
export async function syncActivePet({ walletAddress, stats, score, cooldowns, petType, isAlive }) {
    try {
        const response = await fetch(`${API_URL}/api/pet/${walletAddress}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                walletAddress,
                stats,
                score,
                cooldowns,
                petType,
                isAlive,
                lastUpdate: Date.now()
            })
        })

        if (!response.ok) throw new Error('Failed to sync active pet')

        return await response.json()
    } catch (error) {
        console.error('API Error (syncActivePet):', error)
        return null
    }
}
