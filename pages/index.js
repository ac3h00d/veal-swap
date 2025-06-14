import Head from 'next/head';
import Header from '../components/Header';
import TokenGrid from '../components/TokenGrid';

export default function Home() {
  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'lime', padding: '20px' }}>
      <Head>
        <title>Veal Swap</title>
        <meta name="description" content="Matrix-style token monitor powered by Solana" />
        <link rel="icon" href="/veal_swap_icon_512.png" />
      </Head>

      <Header />
      <TokenGrid />
    </div>
  );
}