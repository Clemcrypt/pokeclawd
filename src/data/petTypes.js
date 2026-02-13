// Pet type registry - all available PokeClawd species

// Pikaclaw sprites (V2)
import pikaclawV2 from '../assets/pikaclaw-v2.png'
// import pikaclawIdle from '../assets/pokeclaude-idle.png'
// import pikaclawFeed from '../assets/pokeclaude-feed.png'
// import pikaclawPlay from '../assets/pokeclaude-play.png'
// import pikaclawSleep from '../assets/pokeclaude-sleep.png'

// Krabbyclaw sprites (V2)
import krabbyclawV2 from '../assets/krabbyclaw-v2.png'
// import krabbyclawIdle from '../assets/krabbyclaw-idle.png'
// import krabbyclawFeed from '../assets/krabbyclaw-feed.png'
// import krabbyclawPlay from '../assets/krabbyclaw-play.png'
// import krabbyclawSleep from '../assets/krabbyclaw-sleep.png'

export const PET_TYPES = {
    pikaclaw: {
        id: 'pikaclaw',
        name: 'Pikaclaw',
        type: '⚡ Electric',
        description: 'A fluffy creature with a glowing antenna and a big heart.',
        sprites: {
            idle: pikaclawV2,
            eating: pikaclawV2,
            playing: pikaclawV2,
            sleeping: pikaclawV2
        }
    },
    krabbyclaw: {
        id: 'krabbyclaw',
        name: 'Krabbyclaw',
        type: '🌊 Water',
        description: 'A feisty crab with powerful pincers and a gem on its head.',
        sprites: {
            idle: krabbyclawV2,
            eating: krabbyclawV2,
            playing: krabbyclawV2,
            sleeping: krabbyclawV2
        }
    }
}

export const PET_LIST = Object.values(PET_TYPES)
