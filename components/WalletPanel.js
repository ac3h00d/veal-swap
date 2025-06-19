// components/WalletPanel.js
import { useEffect, useState } from "react";
import { getWalletBalance } from "../lib/solanaUtils";

export default function WalletPanel({ publicKey }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (publicKey) {
      getWalletBalance(publicKey.toString()).then(setBalance);
    }
  }, [publicKey]);

  return (
    <div className="walletPanel">
      <h3>🔐 Wallet Info</h3>
      {publicKey ? (
        <>
          <p>✅ Connected: {publicKey.toString().slice(0, 8)}...</p>
          <p>💰 Balance: {balance !== null ? `${balance.toFixed(2)} SOL` : "Loading..."}</p>
        </>
      ) : (
        <p style={{ color: "red" }}>❌ Wallet not connected</p>
      )}
    </div>
  );
}