// components/WalletConnectButton.js
import { useEffect, useState } from 'react';

export default function WalletConnectButton({ setPublicKey }) {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if ('solana' in window) {
      const sol = window.solana;
      if (sol.isPhantom) {
        setProvider(sol);
      }
    }
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        const resp = await provider.connect();
        setPublicKey(resp.publicKey);
      } catch (err) {
        console.error('Wallet connection error:', err);
      }
    } else {
      alert('Phantom Wallet not found. Install it from the App Store or Chrome Extension.');
    }
  };

  return (
    <button onClick={connectWallet} style={{ marginBottom: '20px' }}>
      🔌 Connect Phantom Wallet
    </button>
  );
}