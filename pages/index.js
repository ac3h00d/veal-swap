import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const allTokens = [
    { name: 'Fentanyl', mcap: '$36.7K', category: 'movers' },
    { name: 'Unemployed Corp', mcap: '$10.3K', category: 'graduate' },
    { name: 'Pumps Gone Crazy', mcap: '$19.6K', category: 'movers' },
    { name: 'Toothless', mcap: '$9.7K', category: 'watchlist' },
  ];

  const [selectedTab, setSelectedTab] = useState('movers');

  const filteredTokens = allTokens.filter(
    (token) => token.category === selectedTab
  );

  return (
    <>
      <Head>
        <title>Veal Swap | Matrix Tracker</title>
      </Head>

      <div className="layout">
        <aside className="sidebar">
          <h2>Veal Menu</h2>
          <ul>
            <li
              onClick={() => setSelectedTab('movers')}
              className={selectedTab === 'movers' ? 'activeTab' : ''}
            >
              🔥 Movers
            </li>
            <li
              onClick={() => setSelectedTab('graduate')}
              className={selectedTab === 'graduate' ? 'activeTab' : ''}
            >
              🎓 About to Graduate
            </li>
            <li
              onClick={() => setSelectedTab('watchlist')}
              className={selectedTab === 'watchlist' ? 'activeTab' : ''}
            >
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
        </main>
      </div>
    </>
  );
}