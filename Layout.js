// components/Layout.js
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Veal Swap | Matrix Tracker</title>
      </Head>

      <div className="layout">
        <aside className="sidebar">
          <h2>Veal Menu</h2>
          <ul>
            <li>🔥 Movers</li>
            <li>🎓 About to Graduate</li>
            <li>⭐ Watchlist</li>
          </ul>
        </aside>

        <main className="main">
          {children}
        </main>
      </div>
    </>
  );
}