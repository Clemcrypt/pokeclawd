import { createPortal } from 'react-dom'

export function BattlePreview({ isOpen, onClose, userPetType, userLevel = 1 }) {
    if (!isOpen) return null

    const isLocked = userLevel < 10

    // Use portal to render overlay at root level
    return createPortal(
        <div className="battle-overlay">
            <div className="battle-modal glass-card">
                <button className="close-btn" onClick={onClose}>×</button>

                <h2 className="battle-title">⚔️ BATTLE ARENA ⚔️</h2>

                <div className="arena-display">
                    <div className="fighter user">
                        <span className="fighter-tag">YOU</span>
                        <div className="fighter-sprite">
                            {userPetType?.sprites?.idle && (
                                <img src={userPetType.sprites.idle} alt="Your Pet" />
                            )}
                        </div>
                        <div className="fighter-platform"></div>
                    </div>

                    <div className="vs-badge">VS</div>

                    <div className="fighter enemy">
                        <span className="fighter-tag">RIVAL</span>
                        <div className="fighter-sprite mystery">
                            ❓
                        </div>
                        <div className="fighter-platform"></div>
                    </div>
                </div>

                <div className="coming-soon-banner">
                    {isLocked ? (
                        <>
                            <h3>🔒 LOCKED: REQUIRES LEVEL 10</h3>
                            <div style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '8px' }}>
                                Your pet is Level <span style={{ color: '#ffd700' }}>{userLevel}</span>
                            </div>
                            <p className="subtext">Train harder to enter the arena!</p>
                        </>
                    ) : (
                        <>
                            <h3>🚧 UNDER CONSTRUCTION 🚧</h3>
                            <p>The Open Claw Arena is being built.</p>
                            <p className="subtext">Prepare your pets for glory!</p>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body
    )
}
