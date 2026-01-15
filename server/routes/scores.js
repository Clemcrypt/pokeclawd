import express from 'express'
import PetHistory from '../models/PetHistory.js'
import { verifySignature } from '../utils/verifySignature.js'

const router = express.Router()

/**
 * POST /api/scores
 * Save a pet run score
 * Body: { walletAddress, score, timeAliveMs, actionsCompleted, causeOfDeath, message, signature }
 */
router.post('/', async (req, res) => {
    try {
        const { walletAddress, score, timeAliveMs, actionsCompleted, causeOfDeath, message, signature } = req.body

        // Validate required fields
        if (!walletAddress || score === undefined || !timeAliveMs || !actionsCompleted || !causeOfDeath) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        // Verify signature if provided (optional for now, can be made required)
        if (signature && message) {
            const isValid = verifySignature(message, signature, walletAddress)
            if (!isValid) {
                return res.status(401).json({ error: 'Invalid signature' })
            }
        }

        // Create new pet history entry
        const petHistory = new PetHistory({
            walletAddress,
            score,
            timeAliveMs,
            actionsCompleted,
            causeOfDeath
        })

        await petHistory.save()

        res.status(201).json({
            success: true,
            id: petHistory._id,
            message: 'Score saved successfully'
        })
    } catch (error) {
        console.error('Error saving score:', error)
        res.status(500).json({ error: 'Failed to save score' })
    }
})

/**
 * GET /api/scores/:wallet
 * Get all pet history for a wallet
 */
router.get('/:wallet', async (req, res) => {
    try {
        const { wallet } = req.params
        const { limit = 10 } = req.query

        const history = await PetHistory.find({ walletAddress: wallet })
            .sort({ createdAt: -1 })
            .limit(parseInt(limit))
            .lean()

        const stats = await PetHistory.aggregate([
            { $match: { walletAddress: wallet } },
            {
                $group: {
                    _id: null,
                    totalPets: { $sum: 1 },
                    highScore: { $max: '$score' },
                    totalActions: { $sum: '$actionsCompleted' },
                    avgTimeAlive: { $avg: '$timeAliveMs' }
                }
            }
        ])

        res.json({
            history,
            stats: stats[0] || { totalPets: 0, highScore: 0, totalActions: 0, avgTimeAlive: 0 }
        })
    } catch (error) {
        console.error('Error fetching history:', error)
        res.status(500).json({ error: 'Failed to fetch history' })
    }
})

/**
 * GET /api/scores/leaderboard/top
 * Get global top scores
 */
router.get('/leaderboard/top', async (req, res) => {
    try {
        const { limit = 10 } = req.query

        const leaderboard = await PetHistory.find()
            .sort({ score: -1 })
            .limit(parseInt(limit))
            .select('walletAddress score timeAliveMs actionsCompleted createdAt')
            .lean()

        // Truncate wallet addresses for privacy
        const formatted = leaderboard.map((entry, index) => ({
            rank: index + 1,
            walletAddress: `${entry.walletAddress.slice(0, 4)}...${entry.walletAddress.slice(-4)}`,
            fullWallet: entry.walletAddress,
            score: entry.score,
            timeAliveMs: entry.timeAliveMs,
            actionsCompleted: entry.actionsCompleted,
            createdAt: entry.createdAt
        }))

        res.json(formatted)
    } catch (error) {
        console.error('Error fetching leaderboard:', error)
        res.status(500).json({ error: 'Failed to fetch leaderboard' })
    }
})

export default router
