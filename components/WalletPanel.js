// components/WalletPanel.js
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function WalletPanel() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="walletPanel">
      <h3>🔐 Wallet Info</h3>
      {connected ? (
        <>
          <p>✅ Wallet Connected</p>
          <p>Address: {publicKey.toBase58()}</p>
        </>
      ) : (
        <p style={{ color: 'red' }}>❌ Wallet not connected</p>
      )}
    </div>
  );
}