// components/WalletConnectButton.js
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function WalletConnectButton() {
  return (
    <div style={{ marginBottom: '20px' }}>
      <WalletMultiButton />
    </div>
  );
}