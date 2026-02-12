export function PetStats({ stats, level, xpProgress }) {
    const getStatClass = (value) => {
        return value < 30 ? 'low' : ''
    }

    return (
        <div className="stats-container glass-card">
            <div className="level-container" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="level-badge" style={{ fontFamily: '"Press Start 2P"', color: '#ffd700', fontSize: '0.8rem' }}>
                    LVL {level}
                </div>
                <div className="xp-container" style={{ flex: 1, marginLeft: '12px' }}>
                    <div className="stat-label" style={{ textAlign: 'right', fontSize: '0.6rem' }}>XP {xpProgress}/100</div>
                    <div className="stat-bar" style={{ height: '8px' }}>
                        <div
                            className="stat-fill"
                            style={{
                                width: `${xpProgress}%`,
                                background: 'linear-gradient(90deg, #9b59b6, #3498db)'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="stat-row">
                <span className="stat-icon">🍔</span>
                <div className="stat-info">
                    <div className="stat-label">Hunger</div>
                    <div className="stat-bar">
                        <div
                            className={`stat-fill hunger ${getStatClass(stats.hunger)}`}
                            style={{ width: `${stats.hunger}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="stat-row">
                <span className="stat-icon">✨</span>
                <div className="stat-info">
                    <div className="stat-label">Happiness</div>
                    <div className="stat-bar">
                        <div
                            className={`stat-fill happiness ${getStatClass(stats.happiness)}`}
                            style={{ width: `${stats.happiness}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="stat-row">
                <span className="stat-icon">⚡</span>
                <div className="stat-info">
                    <div className="stat-label">Energy</div>
                    <div className="stat-bar">
                        <div
                            className={`stat-fill energy ${getStatClass(stats.energy)}`}
                            style={{ width: `${stats.energy}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
