import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('movers');
  const [watchlist, setWatchlist] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const handleStopLossTrigger = (token) => {
    const log = `[${token.name}] STOP-LOSS HIT — Market Cap fell below threshold (${token.mcap})`;
    setLogs((prevLogs) => [log, ...prevLogs.slice(0, 4)]);
  };

  const toggleWatch = (token) => {
    const exists = watchlist.some((t) => t.name === token.name);
    if (exists) {
      setWatchlist(watchlist.filter((t) => t.name !== token.name));
    } else {
      setWatchlist([...watchlist, token]);
      handleStopLossTrigger(token);
    }
  };

  const tokenData = {
    movers: [
      { name: 'Fentanyl', mcap: '$36.7K' },
      { name: 'Unemployed Corp', mcap: '$10.3K' },
    ],
    graduate: [
      { name: 'GEDcoin', mcap: '$4.2K' },
      { name: 'NightSchool', mcap: '$6.5K' },
    ],
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
            <div className="chartBox" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              {logs.length === 0 ? (
                <p>[No stop-losses triggered yet]</p>
              ) : (
                logs.map((log, i) => <p key={i}>→ {log}</p>)
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}