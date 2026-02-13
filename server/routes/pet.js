import express from 'express'
import ActivePet from '../models/ActivePet.js'

const router = express.Router()

/**
 * GET /api/pet/:wallet
 * Get active pet state for a wallet
 */
router.get('/:wallet', async (req, res) => {
    try {
        const { wallet } = req.params

        const pet = await ActivePet.findOne({ walletAddress: wallet })

        if (!pet) {
            return res.status(404).json({ message: 'No active pet found' })
        }

        res.json(pet)
    } catch (error) {
        console.error('Error fetching active pet:', error)
        res.status(500).json({ error: 'Failed to fetch active pet' })
    }
})

/**
 * PUT /api/pet/:wallet
 * Sync/Update active pet state
 */
router.put('/:wallet', async (req, res) => {
    try {
        const { wallet } = req.params
        const { stats, score, cooldowns, petType, isAlive, lastUpdate } = req.body

        // Validate basic structure
        if (!stats || !score) {
            return res.status(400).json({ error: 'Missing required state fields' })
        }

        const updateData = {
            walletAddress: wallet,
            stats,
            score,
            cooldowns,
            petType,
            isAlive,
            updatedAt: Date.now()
        }

        // Upsert (update if exists, insert if new)
        const pet = await ActivePet.findOneAndUpdate(
            { walletAddress: wallet },
            updateData,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )

        res.json(pet)
    } catch (error) {
        console.error('Error syncing active pet:', error)
        res.status(500).json({ error: 'Failed to sync active pet' })
    }
})

export default router
