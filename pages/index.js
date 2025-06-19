// pages/index.js

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { fetchLiveTokenData } from '../lib/pollingEngine';
import WalletPanel from '../components/WalletPanel';

export default function Home() {
  const [activeTab, setActiveTab] = useState('movers');
  const [watchlist, setWatchlist] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load watchlist from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(saved);
  }, []);

  // Save to localStorage when watchlist updates
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch live token data
  useEffect(() => {
    async function loadTokens() {
      setLoading(true);
      const data = await fetchLiveTokenData();
      setTokens(data);
      setLoading(false);
    }

    loadTokens();

    const interval = setInterval(loadTokens, 2000); // poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

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
    graduate: tokens.slice(10, 20),
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
          <WalletPanel />
          
          {loading ? (
            <p>Loading tokens...</p>
          ) : (
            <div className="tokenGrid">
              {filteredTokens.map((token, index) => {
                const inWatchlist = watchlist.some((t) => t.name === token.name);
                return (
                  <div key={index} className="tokenCard">
                    <h3>{token.name}</h3>
                    <p>Market Cap: {token.mcap}</p>
                    <p>Price: {token.price}</p>
                    <button onClick={() => toggleWatch(token)}>
                      {inWatchlist ? '− Remove from Watchlist' : '+ Add to Watchlist'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

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