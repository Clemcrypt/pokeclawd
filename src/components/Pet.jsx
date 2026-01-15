import { useMemo } from 'react'
import petSprites from '../assets/pet-sprites.png'

const SPRITE_POSITIONS = {
    idle: { row: 0, col: 0 },
    eating: { row: 0, col: 1 },
    playing: { row: 1, col: 0 },
    sleeping: { row: 1, col: 1 }
}

export function Pet({ action, message, mood, isAlive = true }) {
    const currentSprite = useMemo(() => {
        if (!isAlive) return 'sleeping' // Use sleeping sprite for dead state
        if (action) return action
        return 'idle'
    }, [action, isAlive])

    const position = SPRITE_POSITIONS[currentSprite] || SPRITE_POSITIONS.idle

    // Calculate background position for sprite sheet (2x2 grid)
    const bgPosition = `${-position.col * 50}% ${-position.row * 50}%`

    return (
        <div className="pet-container">
            {message && (
                <div className="pet-message">{message}</div>
            )}
            <div
                className={`pet-sprite ${action || ''} ${!isAlive ? 'dead' : ''}`}
                style={{
                    backgroundImage: `url(${petSprites})`,
                    backgroundSize: '200% 200%',
                    backgroundPosition: bgPosition,
                    backgroundRepeat: 'no-repeat'
                }}
                title={`Mood: ${mood}`}
            />
        </div>
    )
}
