import { useMemo } from 'react'

export function Pet({ action, message, mood, isAlive = true, petType }) {
    const sprites = petType?.sprites

    const currentImage = useMemo(() => {
        if (!sprites) return null
        if (!isAlive) return sprites.idle
        if (action && sprites[action]) return sprites[action]
        return sprites.idle
    }, [action, isAlive, sprites])

    const animationClass = action || 'idle'

    if (!currentImage) return null

    return (
        <div className="pet-container">
            {message && (
                <div className="pet-message">{message}</div>
            )}

            <img
                src={currentImage}
                alt={petType?.name || 'PokeClawd'}
                className={`pet-sprite action-sprite ${animationClass} ${!isAlive ? 'dead' : ''}`}
            />
        </div>
    )
}
