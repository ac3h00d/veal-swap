import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [filter, setFilter] = useState('movers');

  const allTokens = [
    { name: 'Fentanyl', mcap: '$36.7K', category: 'movers' },
    { name: 'Unemployed Corp', mcap: '$10.3K', category: 'graduate' },
    { name: 'Pumps Gone Crazy', mcap: '$19.6K', category: 'movers' },
    { name: 'Toothless', mcap: '$9.7K', category: 'watchlist' },
  ];

  const filteredTokens = allTokens.filter(token => {
    if (filter === 'movers') return token.category === 'movers';
    if (filter === 'graduate') return token.category === 'graduate';
    if (filter === 'watchlist') return token.category === 'watchlist';
    return true;
  });

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
              className={filter === 'movers' ? 'activeTab' : ''}
              onClick={() => setFilter('movers')}
            >
              🔥 Movers
            </li>
            <li
              className={filter === 'graduate' ? 'activeTab' : ''}
              onClick={() => setFilter('graduate')}
            >
              🎓 About to Graduate
            </li>
            <li
              className={filter === 'watchlist' ? 'activeTab' : ''}
              onClick={() => setFilter('watchlist')}
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