// Pet type registry - all available PokeClawd species

// Pikaclaw sprites
import pikaclawIdle from '../assets/pokeclaude-idle.png'
import pikaclawFeed from '../assets/pokeclaude-feed.png'
import pikaclawPlay from '../assets/pokeclaude-play.png'
import pikaclawSleep from '../assets/pokeclaude-sleep.png'

// Krabbyclaw sprites
import krabbyclawIdle from '../assets/krabbyclaw-idle.png'
import krabbyclawFeed from '../assets/krabbyclaw-feed.png'
import krabbyclawPlay from '../assets/krabbyclaw-play.png'
import krabbyclawSleep from '../assets/krabbyclaw-sleep.png'

export const PET_TYPES = {
    pikaclaw: {
        id: 'pikaclaw',
        name: 'Pikaclaw',
        type: '⚡ Electric',
        description: 'A fluffy creature with a glowing antenna and a big heart.',
        sprites: {
            idle: pikaclawIdle,
            eating: pikaclawFeed,
            playing: pikaclawPlay,
            sleeping: pikaclawSleep
        }
    },
    krabbyclaw: {
        id: 'krabbyclaw',
        name: 'Krabbyclaw',
        type: '🌊 Water',
        description: 'A feisty crab with powerful pincers and a gem on its head.',
        sprites: {
            idle: krabbyclawIdle,
            eating: krabbyclawFeed,
            playing: krabbyclawPlay,
            sleeping: krabbyclawSleep
        }
    }
}

export const PET_LIST = Object.values(PET_TYPES)
