// pages/_app.js
import '../styles.css';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets';

import { useMemo } from 'react';

export default function App({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => 'https://api.mainnet-beta.solana.com', []);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <Component {...pageProps} />
      </WalletProvider>
    </ConnectionProvider>
  );
}