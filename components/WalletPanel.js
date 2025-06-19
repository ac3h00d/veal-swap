import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';

export default function WalletPanel() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey && connection) {
        const lamports = await connection.getBalance(publicKey);
        setBalance(lamports / 1e9); // Convert lamports to SOL
      }
    };

    fetchBalance();
  }, [publicKey, connection]);

  return (
    <div className="walletPanel">
      <h3>🔗 Solana Wallet</h3>
      <WalletMultiButton />
      {connected && publicKey && (
        <>
          <p><strong>Public Key:</strong> {publicKey.toBase58()}</p>
          <p><strong>SOL Balance:</strong> {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}</p>
        </>
      )}
    </div>
  );
}