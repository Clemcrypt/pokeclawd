import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import scoresRouter from './routes/scores.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}))
app.use(express.json())

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/scores', scoresRouter)

// Connect to MongoDB and start server
async function start() {
    try {
        const mongoUri = process.env.MONGODB_URI

        if (!mongoUri) {
            console.warn('⚠️  MONGODB_URI not set. Running without database.')
            console.warn('   Set MONGODB_URI environment variable to enable persistence.')
        } else {
            await mongoose.connect(mongoUri)
            console.log('✅ Connected to MongoDB')
        }

        app.listen(PORT, () => {
            console.log(`🚀 Tamaclaude API running on port ${PORT}`)
        })
    } catch (error) {
        console.error('❌ Failed to start server:', error)
        process.exit(1)
    }
}

start()
