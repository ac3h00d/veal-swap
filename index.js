import Head from 'next/head';

export default function Home() {
  const fakeTokens = [
    { name: 'Fentanyl', mcap: '$36.7K' },
    { name: 'Unemployed Corp', mcap: '$10.3K' },
    { name: 'Pumps Gone Crazy', mcap: '$19.6K' },
    { name: 'Toothless', mcap: '$9.7K' },
  ];

  return (
    <>
      <Head>
        <title>Veal Swap | Matrix Tracker</title>
      </Head>

      <div className="layout">
        <aside className="sidebar">
          <h2>Veal Menu</h2>
          <ul>
            <li className="activeTab">🔥 Movers</li>
            <li>🎓 About to Graduate</li>
            <li>⭐ Watchlist</li>
          </ul>
        </aside>

        <main className="main">
          <div className="headerBar">Live Feed: Latest Token Data from Pump.fun</div>

          <div className="tokenGrid">
            {fakeTokens.map((token, index) => (
              <div key={index} className="tokenCard">
                <h3>{token.name}</h3>
                <p>Market Cap: {token.mcap}</p>
              </div>
            ))}
          </div>

          <div className="chartPlaceholder">
            <h3>📈 Selected Token Activity</h3>
            <div className="chartBox">[ Chart Placeholder ]</div>
          </div>
        </main>
      </div>
    </>
  );
}