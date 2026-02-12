import { useMemo } from 'react'
import pokeIdle from '../assets/pokeclaude-idle.png'
import pokeFeed from '../assets/pokeclaude-feed.png'
import pokePlay from '../assets/pokeclaude-play.png'
import pokeSleep from '../assets/pokeclaude-sleep.png'

// Individual images for each state
const STATE_IMAGES = {
    idle: pokeIdle,
    eating: pokeFeed,
    playing: pokePlay,
    sleeping: pokeSleep
}

export function Pet({ action, message, mood, isAlive = true }) {
    const currentImage = useMemo(() => {
        if (!isAlive) return pokeIdle // Dead state uses idle image with CSS filter
        if (action && STATE_IMAGES[action]) return STATE_IMAGES[action]
        return pokeIdle
    }, [action, isAlive])

    const animationClass = action || 'idle'

    return (
        <div className="pet-container">
            {message && (
                <div className="pet-message">{message}</div>
            )}

            <img
                src={currentImage}
                alt="PokeClawd"
                className={`pet-sprite action-sprite ${animationClass} ${!isAlive ? 'dead' : ''}`}
            />
        </div>
    )
}
