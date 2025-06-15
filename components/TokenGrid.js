import React, { useEffect, useState } from 'react';

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchMovers() {
      try {
        const res = await fetch('https://pump.fun/api/movers');
        const data = await res.json();
        console.log('Fetched movers:', data);
        setTokens(data);
      } catch (error) {
        console.error('Error fetching movers:', error);
      }
    }

    fetchMovers();
    const interval = setInterval(fetchMovers, 2000); // refresh every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '10px',
      padding: '20px',
      color: '#00FF41'
    }}>
      {tokens.map((token, index) => (
        <div key={index} style={{
          border: '1px solid #00FF41',
          padding: '10px',
          backgroundColor: '#000'
        }}>
          <div style={{ fontWeight: 'bold' }}>{token.ticker}</div>
          <div style={{ fontSize: '12px' }}>{token.name}</div>
          <div style={{ fontSize: '10px' }}>MCAP: ${Math.round(token.market_cap)}</div>
          <div style={{ fontSize: '10px' }}>Launched: {Math.round(token.minutes_since_launch)} min ago</div>
        </div>
      ))}
    </div>
  );
}