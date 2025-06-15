import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Veal Swap | Matrix Tracker</title>
        <meta name="description" content="Matrix-style Solana DEX Tracker" />
        <link rel="icon" href="/veal_swap_icon.png" />
      </Head>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2>🧬 Veal Swap</h2>
          <nav>
            <ul>
              <li>Dashboard</li>
              <li>Wallet</li>
              <li>Watchlist</li>
              <li>Settings</li>
            </ul>
          </nav>
        </aside>

        <main className={styles.main}>
          <h1>📈 Matrix Tracker</h1>
          <div className={styles.tokenGrid}>
            {/* Placeholder for tokens */}
            {[...Array(12)].map((_, i) => (
              <div className={styles.tokenCard} key={i}>
                <p>Token #{i + 1}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}