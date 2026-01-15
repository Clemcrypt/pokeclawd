import mongoose from 'mongoose'

const petHistorySchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
        index: true
    },
    score: {
        type: Number,
        required: true
    },
    timeAliveMs: {
        type: Number,
        required: true
    },
    actionsCompleted: {
        type: Number,
        required: true
    },
    causeOfDeath: {
        type: String,
        enum: ['starvation', 'sadness', 'exhaustion'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Compound index for efficient queries
petHistorySchema.index({ walletAddress: 1, createdAt: -1 })
petHistorySchema.index({ score: -1 }) // For leaderboard

export default mongoose.model('PetHistory', petHistorySchema)
