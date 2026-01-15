import { useWallet } from '@solana/wallet-adapter-react'
import { Pet } from './components/Pet'
import { PetStats } from './components/PetStats'
import { ActionButtons } from './components/ActionButtons'
import { WalletButton } from './components/WalletButton'
import { ScoreDisplay } from './components/ScoreDisplay'
import { GameOver } from './components/GameOver'
import { usePetState } from './hooks/usePetState'

function Particles() {
  return (
    <div className="particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  )
}

function App() {
  const { connected, publicKey } = useWallet()
  const walletAddress = publicKey?.toBase58() || null

  const {
    stats, action, message, mood, cooldowns,
    isAlive, score, highScores,
    feed, play, sleep, restartGame
  } = usePetState(walletAddress)

  return (
    <>
      <Particles />
      <div className="app-container">
        <header className="header">
          <h1>Tamaclaude</h1>
          <p>Your Solana-powered virtual pet</p>
        </header>

        <div className="game-container">
          <ScoreDisplay score={score} />
          <Pet action={action} message={message} mood={mood} isAlive={isAlive} />
          <PetStats stats={stats} />
          <ActionButtons
            onFeed={feed}
            onPlay={play}
            onSleep={sleep}
            disabled={!isAlive}
            cooldowns={cooldowns}
          />
        </div>

        <WalletButton />

        {!connected && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
            Connect your wallet for enhanced features!
          </p>
        )}
      </div>

      {!isAlive && (
        <GameOver
          score={score}
          highScores={highScores}
          onRestart={restartGame}
        />
      )}
    </>
  )
}

export default App
