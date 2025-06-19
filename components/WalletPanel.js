// components/WalletPanel.js
export default function WalletPanel() {
  const fakeWallet = {
    publicKey: '9xJ3...Veal',
    balance: '123.45 SOL',
  };

  return (
    <div className="walletPanel">
      <h3>💼 Wallet Info</h3>
      <p><strong>Public Key:</strong> {fakeWallet.publicKey}</p>
      <p><strong>Balance:</strong> {fakeWallet.balance}</p>
    </div>
  );
}