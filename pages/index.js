// pages/index.js
import Head from 'next/head';
import { useEffect, useState } from 'react';
import usePumpTokens from '../lib/usePumpTokens';
import WalletPanel from '../components/WalletPanel';
import WalletConnectButton from '../components/WalletConnectButton';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('movers');
  const [watchlist, setWatchlist] = useState([]);
  const tokens = usePumpTokens();
  const { publicKey } = useWallet();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatch = (token) => {
    const exists = watchlist.some((t) => t.name === token.name);
    if (exists) {
      setWatchlist(watchlist.filter((t) => t.name !== token.name));
    } else {
      setWatchlist([...watchlist, token]);
    }
  };

  const tokenData = {
    movers: tokens,
    graduate: tokens.filter((t, i) => i % 2 === 0), // filtered sample set
    watchlist,
  };

  const filteredTokens = tokenData[activeTab] || [];

  return (
    <>
      <Head>
        <title>Veal Swap | Matrix Tracker</title>
      </Head>

      <div className="layout">
        <aside className="sidebar">
          <h2>Veal Menu</h2>
          <ul>
            <li className={activeTab === 'movers' ? 'activeTab' : ''} onClick={() => setActiveTab('movers')}>
              🔥 Movers
            </li>
            <li className={activeTab === 'graduate' ? 'activeTab' : ''} onClick={() => setActiveTab('graduate')}>
              🎓 About to Graduate
            </li>
            <li className={activeTab === 'watchlist' ? 'activeTab' : ''} onClick={() => setActiveTab('watchlist')}>
              ⭐ Watchlist
            </li>
          </ul>
        </aside>

        <main className="main">
          <WalletConnectButton />
          <WalletPanel publicKey={publicKey} />

          <div className="tokenGrid">
            {filteredTokens.map((token, index) => {
              const inWatchlist = watchlist.some((t) => t.name === token.name);
              return (
                <div key={index} className="tokenCard">
                  <h3>{token.name}</h3>
                  <p>Market Cap: {token.mcap}</p>
                  <button onClick={() => toggleWatch(token)}>
                    {inWatchlist ? '− Remove from Watchlist' : '+ Add to Watchlist'}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="chartPlaceholder">
            <h4>🚨 Live Signal Activity</h4>
            <div className="chartBox">
              <p>[Webhook Trigger Logs Appear Here]</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}