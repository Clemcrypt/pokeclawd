import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export function WalletButton() {
    const { publicKey, connected } = useWallet()

    const truncateAddress = (address) => {
        const str = address.toString()
        return `${str.slice(0, 4)}...${str.slice(-4)}`
    }

    return (
        <div className="wallet-section">
            <div className="wallet-card glass-card">
                <div className="wallet-status">
                    <span className={`wallet-indicator ${connected ? 'connected' : ''}`} />
                    <span>{connected ? 'Wallet Connected' : 'Connect to claim your pet!'}</span>
                </div>

                <WalletMultiButton />

                {connected && publicKey && (
                    <div className="wallet-address">
                        {truncateAddress(publicKey)}
                    </div>
                )}
            </div>
        </div>
    )
}
