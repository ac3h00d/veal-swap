// components/WalletPanel.js
export default function WalletPanel({ connected, address, balance }) {
  return (
    <div className="walletPanel">
      <h3>🔐 Wallet Info</h3>
      {connected ? (
        <>
          <p><strong>Address:</strong> {address.slice(0, 4)}...{address.slice(-4)}</p>
          <p><strong>Balance:</strong> ◎ {balance} SOL</p>
        </>
      ) : (
        <p style={{ color: 'red' }}>❌ Wallet not connected</p>
      )}
    </div>
  );
}