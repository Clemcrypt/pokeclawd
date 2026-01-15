export function ScoreDisplay({ score }) {
    return (
        <div className="score-display glass-card">
            <div className="score-item">
                <span className="score-label">⏱️ Time</span>
                <span className="score-value">{score.timeAlive}</span>
            </div>
            <div className="score-item">
                <span className="score-label">⭐ Actions</span>
                <span className="score-value">{score.actionsCompleted}</span>
            </div>
            <div className="score-item">
                <span className="score-label">🏆 Score</span>
                <span className="score-value score-main">{score.current.toLocaleString()}</span>
            </div>
        </div>
    )
}
