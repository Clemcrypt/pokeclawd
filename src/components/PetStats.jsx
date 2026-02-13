export function PetStats({ stats, level, xpProgress }) {
    const getStatClass = (value) => {
        return value < 30 ? 'low' : ''
    }

    return (
        <div className="stats-container glass-card">
            <div className="status-header">
                <div className="level-badge-premium">
                    <span className="lvl-text">LVL</span>
                    <span className="lvl-number">{level}</span>
                </div>
                <div className="xp-section">
                    <div className="stat-label">XP {xpProgress}/100</div>
                    <div className="stat-bar xp-bar">
                        <div
                            className="stat-fill xp-fill"
                            style={{ width: `${xpProgress}%` }}
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
