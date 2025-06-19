// components/WalletPanel.js
import React from 'react';

const WalletPanel = ({ connected, address, balance }) => {
  return (
    <div className="walletPanel">
      <h3>🔐 Wallet Info</h3>
      {connected ? (
        <>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Balance:</strong> {balance} SOL</p>
        </>
      ) : (
        <p>❌ Wallet not connected</p>
      )}
    </div>
  );
};

export default WalletPanel;