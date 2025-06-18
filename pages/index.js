import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('movers');

  const tokenData = {
    movers: [
      { name: 'Fentanyl', mcap: '$36.7K' },
      { name: 'Unemployed Corp', mcap: '$10.3K' },
    ],
    graduate: [
      { name: 'GEDcoin', mcap: '$4.2K' },
      { name: 'NightSchool', mcap: '$6.5K' },
    ],
    watchlist: [
      { name: 'Chimichurri', mcap: '$99.9K' },
      { name: 'VealCoin', mcap: '$44.4K' },
    ]
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
            {filteredTokens.map((token, index) => (
              <div key={index} className="tokenCard">
                <h3>{token.name}</h3>
                <p>Market Cap: {token.mcap}</p>
              </div>
            ))}
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