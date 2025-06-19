import { useEffect, useState } from 'react';
import { getBalance } from '../lib/solanaUtils';

export default function WalletPanel({ publicKey }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        const bal = await getBalance(publicKey);
        setBalance(bal);
      }
    };
    fetchBalance();
  }, [publicKey]);

  return (
    <div className="walletPanel">
      <h3>🔐 Wallet Info</h3>
      {publicKey ? (
        <>
          <p>🧾 Address: <code>{publicKey}</code></p>
          <p>💰 Balance: {balance ?? 'Loading...'}</p>
        </>
      ) : (
        <p style={{ color: '#ff4141' }}>❌ Wallet not connected</p>
      )}
    </div>
  );
}