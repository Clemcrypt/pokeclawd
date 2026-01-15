import { useState, useEffect, useCallback, useRef } from 'react'
import { saveScore } from '../api/client'

const INITIAL_STATS = {
    hunger: 80,
    happiness: 70,
    energy: 90
}

// Decay rates - stats drop over time
const DECAY_RATE = {
    hunger: 0.5,
    happiness: 0.3,
    energy: 0.2
}

const DECAY_INTERVAL = 3000 // 3 seconds

// All cooldowns are 5 minutes (300 seconds)
const COOLDOWNS = {
    feed: 300000,
    play: 300000,
    sleep: 300000
}

// Action effects
const ACTION_EFFECTS = {
    feed: { hunger: 25 },
    play: { happiness: 20, energy: -15 },
    sleep: { energy: 30, happiness: 5 }
}

export function usePetState(walletAddress = null) {
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem('tamaclaude-stats')
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch {
                return INITIAL_STATS
            }
        }
        return INITIAL_STATS
    })

    // Game state
    const [isAlive, setIsAlive] = useState(() => {
        const saved = localStorage.getItem('tamaclaude-alive')
        return saved !== 'false'
    })

    // Score tracking
    const [score, setScore] = useState(() => {
        const saved = localStorage.getItem('tamaclaude-score')
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch {
                return { actionsCompleted: 0, startTime: Date.now(), deathTime: null }
            }
        }
        return { actionsCompleted: 0, startTime: Date.now(), deathTime: null }
    })

    // High scores
    const [highScores, setHighScores] = useState(() => {
        const saved = localStorage.getItem('tamaclaude-highscores')
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch {
                return []
            }
        }
        return []
    })

    // Cooldown timestamps
    const [cooldowns, setCooldowns] = useState(() => {
        const saved = localStorage.getItem('tamaclaude-cooldowns')
        if (saved) {
            try {
                return JSON.parse(saved)
            } catch {
                return { feed: 0, play: 0, sleep: 0 }
            }
        }
        return { feed: 0, play: 0, sleep: 0 }
    })

    const [action, setAction] = useState(null)
    const [message, setMessage] = useState(null)
    const [, forceUpdate] = useState(0)

    // Save states to localStorage
    useEffect(() => {
        localStorage.setItem('tamaclaude-stats', JSON.stringify(stats))
    }, [stats])

    useEffect(() => {
        localStorage.setItem('tamaclaude-alive', String(isAlive))
    }, [isAlive])

    useEffect(() => {
        localStorage.setItem('tamaclaude-score', JSON.stringify(score))
    }, [score])

    useEffect(() => {
        localStorage.setItem('tamaclaude-highscores', JSON.stringify(highScores))
    }, [highScores])

    useEffect(() => {
        localStorage.setItem('tamaclaude-cooldowns', JSON.stringify(cooldowns))
    }, [cooldowns])

    // Check for death condition
    useEffect(() => {
        if (isAlive && (stats.hunger <= 0 || stats.happiness <= 0 || stats.energy <= 0)) {
            handleDeath()
        }
    }, [stats, isAlive])

    // Handle pet death
    const handleDeath = useCallback(async () => {
        const deathTime = Date.now()
        const timeAlive = deathTime - score.startTime
        const finalScore = calculateFinalScore(timeAlive, score.actionsCompleted)
        const causeOfDeath = stats.hunger <= 0 ? 'starvation' : stats.happiness <= 0 ? 'sadness' : 'exhaustion'

        // Save to high scores locally
        const newHighScore = {
            score: finalScore,
            timeAlive,
            actionsCompleted: score.actionsCompleted,
            date: new Date().toISOString(),
            causeOfDeath
        }

        // Freeze the time by saving death time
        setScore(prev => ({
            ...prev,
            deathTime
        }))

        setHighScores(prev => {
            const updated = [...prev, newHighScore]
                .sort((a, b) => b.score - a.score)
                .slice(0, 10)
            return updated
        })

        // Save to API if wallet is connected
        if (walletAddress) {
            try {
                await saveScore({
                    walletAddress,
                    score: finalScore,
                    timeAliveMs: timeAlive,
                    actionsCompleted: score.actionsCompleted,
                    causeOfDeath
                })
                console.log('Score saved to API')
            } catch (error) {
                console.error('Failed to save score to API:', error)
            }
        }

        setIsAlive(false)
        setMessage('💀 Game Over!')
    }, [score, stats, walletAddress])

    // Calculate final score: 1 point per second alive + 100 points per action
    const calculateFinalScore = (timeAlive, actions) => {
        const secondsAlive = Math.floor(timeAlive / 1000)
        return secondsAlive + (actions * 100)
    }

    // Get current score
    const getCurrentScore = useCallback(() => {
        const endTime = score.deathTime || Date.now()
        const timeAlive = endTime - score.startTime
        return calculateFinalScore(timeAlive, score.actionsCompleted)
    }, [score])

    // Get time alive formatted
    const getTimeAlive = useCallback(() => {
        const endTime = score.deathTime || Date.now()
        const timeAlive = endTime - score.startTime
        const seconds = Math.floor(timeAlive / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)

        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`
        }
        return `${seconds}s`
    }, [score.startTime])

    // Restart game
    const restartGame = useCallback(() => {
        setStats(INITIAL_STATS)
        setScore({ actionsCompleted: 0, startTime: Date.now(), deathTime: null })
        setCooldowns({ feed: 0, play: 0, sleep: 0 })
        setIsAlive(true)
        setMessage('🐣 New pet!')
    }, [])

    // Decay stats over time (only if alive)
    useEffect(() => {
        if (!isAlive) return

        const interval = setInterval(() => {
            setStats(prev => ({
                hunger: Math.max(0, prev.hunger - DECAY_RATE.hunger),
                happiness: Math.max(0, prev.happiness - DECAY_RATE.happiness),
                energy: Math.max(0, prev.energy - DECAY_RATE.energy)
            }))
        }, DECAY_INTERVAL)

        return () => clearInterval(interval)
    }, [isAlive])

    // Update display every second
    useEffect(() => {
        const interval = setInterval(() => {
            forceUpdate(n => n + 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    // Clear action after animation
    useEffect(() => {
        if (action) {
            const timeout = setTimeout(() => setAction(null), 1500)
            return () => clearTimeout(timeout)
        }
    }, [action])

    // Clear message after display
    useEffect(() => {
        if (message) {
            const timeout = setTimeout(() => setMessage(null), 2500)
            return () => clearTimeout(timeout)
        }
    }, [message])

    // Check if action is on cooldown
    const isOnCooldown = useCallback((actionType) => {
        return Date.now() < cooldowns[actionType]
    }, [cooldowns])

    // Get remaining cooldown time in seconds
    const getCooldownRemaining = useCallback((actionType) => {
        const remaining = cooldowns[actionType] - Date.now()
        return remaining > 0 ? Math.ceil(remaining / 1000) : 0
    }, [cooldowns])

    // Format cooldown as mm:ss
    const formatCooldown = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // Set cooldown for an action
    const startCooldown = useCallback((actionType) => {
        setCooldowns(prev => ({
            ...prev,
            [actionType]: Date.now() + COOLDOWNS[actionType]
        }))
    }, [])

    // Increment action counter
    const incrementActions = useCallback(() => {
        setScore(prev => ({
            ...prev,
            actionsCompleted: prev.actionsCompleted + 1
        }))
    }, [])

    const feed = useCallback(() => {
        if (!isAlive) return

        if (isOnCooldown('feed')) {
            setMessage(`Wait ${formatCooldown(getCooldownRemaining('feed'))}! 🍔`)
            return
        }

        if (stats.hunger > 95) {
            setMessage("I'm full! 🫃")
            return
        }

        setStats(prev => ({
            ...prev,
            hunger: Math.min(100, prev.hunger + ACTION_EFFECTS.feed.hunger)
        }))
        setAction('eating')
        setMessage('Yummy! 🍔')
        startCooldown('feed')
        incrementActions()
    }, [isAlive, stats.hunger, isOnCooldown, getCooldownRemaining, startCooldown, incrementActions])

    const play = useCallback(() => {
        if (!isAlive) return

        if (isOnCooldown('play')) {
            setMessage(`Wait ${formatCooldown(getCooldownRemaining('play'))}! 🎮`)
            return
        }

        if (stats.energy < 15) {
            setMessage('Too tired... 😴')
            return
        }

        if (stats.happiness > 95) {
            setMessage("So happy! 💖")
            return
        }

        setStats(prev => ({
            ...prev,
            happiness: Math.min(100, prev.happiness + ACTION_EFFECTS.play.happiness),
            energy: Math.max(0, prev.energy + ACTION_EFFECTS.play.energy)
        }))
        setAction('playing')
        setMessage('Wheee! ✨')
        startCooldown('play')
        incrementActions()
    }, [isAlive, stats.energy, stats.happiness, isOnCooldown, getCooldownRemaining, startCooldown, incrementActions])

    const sleep = useCallback(() => {
        if (!isAlive) return

        if (isOnCooldown('sleep')) {
            setMessage(`Wait ${formatCooldown(getCooldownRemaining('sleep'))}! 💤`)
            return
        }

        if (stats.energy > 95) {
            setMessage("Not sleepy! 😊")
            return
        }

        setStats(prev => ({
            ...prev,
            energy: Math.min(100, prev.energy + ACTION_EFFECTS.sleep.energy),
            happiness: Math.min(100, prev.happiness + ACTION_EFFECTS.sleep.happiness)
        }))
        setAction('sleeping')
        setMessage('Zzz... 💤')
        startCooldown('sleep')
        incrementActions()
    }, [isAlive, stats.energy, isOnCooldown, getCooldownRemaining, startCooldown, incrementActions])

    const getMood = useCallback(() => {
        if (!isAlive) return 'dead'
        const avg = (stats.hunger + stats.happiness + stats.energy) / 3
        if (avg > 70) return 'happy'
        if (avg > 40) return 'neutral'
        return 'sad'
    }, [stats, isAlive])

    return {
        stats,
        action,
        message,
        mood: getMood(),
        isAlive,
        score: {
            current: getCurrentScore(),
            actionsCompleted: score.actionsCompleted,
            timeAlive: getTimeAlive()
        },
        highScores,
        cooldowns: {
            feed: getCooldownRemaining('feed'),
            play: getCooldownRemaining('play'),
            sleep: getCooldownRemaining('sleep')
        },
        feed,
        play,
        sleep,
        restartGame
    }
}
