import mongoose from 'mongoose'

const activePetSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    // Core Stats
    stats: {
        hunger: { type: Number, default: 80 },
        happiness: { type: Number, default: 70 },
        energy: { type: Number, default: 90 },
        xp: { type: Number, default: 0 }
    },
    // Timestamps for decay and score calculation
    score: {
        startTime: { type: Number, required: true },
        actionsCompleted: { type: Number, default: 0 },
        lastUpdate: { type: Number, required: true } // Used for decay calc
    },
    // Cooldowns to prevent cheat-syncing
    cooldowns: {
        feed: { type: Number, default: 0 },
        play: { type: Number, default: 0 },
        sleep: { type: Number, default: 0 }
    },
    // Pet Metadata
    petType: {
        type: String,
        default: 'pikaclaw'
    },
    isAlive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

// Update timestamp on save
activePetSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

export default mongoose.model('ActivePet', activePetSchema)
