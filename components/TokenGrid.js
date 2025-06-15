import React, { useEffect, useState } from 'react';

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://client-api-2-0.pump.fun/movers?limit=10');
        const data = await res.json();
        console.log(data); // just so you can confirm it works in browser dev tools
        setTokens(data);
      } catch (err) {
        console.error('Failed to load tokens:', err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ color: '#00FF41' }}>
      {tokens.length === 0 ? (
        <div>Loading tokens...</div>
      ) : (
        tokens.map((token) => (
          <div key={token.id} style={{ border: '1px solid #00FF41', padding: '10px', marginBottom: '10px' }}>
            <strong>{token.ticker}</strong> — {token.name}<br />
            Market Cap: ${token.marketCap}
          </div>
        ))
      )}
    </div>
  );
}