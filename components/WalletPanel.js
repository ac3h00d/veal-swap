import { useEffect, useState } from 'react';
import { getSolanaBalance } from '../lib/solanaUtils';

export default function WalletPanel() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const checkWallet = async () => {
      if (window?.solana?.isPhantom) {
        const resp = await window.solana.connect({ onlyIfTrusted: true });
        setWallet(resp.publicKey.toString());

        const bal = await getSolanaBalance(resp.publicKey.toString());
        setBalance(bal);
      }
    };

    checkWallet();
  }, []);

  const connectWallet = async () => {
    if (window?.solana?.isPhantom) {
      const resp = await window.solana.connect();
      setWallet(resp.publicKey.toString());

      const bal = await getSolanaBalance(resp.publicKey.toString());
      setBalance(bal);
    } else {
      alert('Phantom Wallet not detected.');
    }
  };

  return (
    <div className="walletPanel">
      <h3>🔐 Wallet Info</h3>
      {wallet ? (
        <>
          <p>📬 {wallet}</p>
          <p>💰 Balance: {balance?.toFixed(4)} SOL</p>
        </>
      ) : (
        <>
          <p style={{ color: 'red' }}>❌ Wallet not connected</p>
          <button onClick={connectWallet}>🔌 Connect Phantom</button>
        </>
      )}
    </div>
  );
}