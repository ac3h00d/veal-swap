import React, { useEffect, useState } from 'react';
import { getPopularTokens } from '@pump-fun/pump-sdk'; // Or your API fetch method

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const tokenData = await getPopularTokens(); // or fetch(...)
        console.log('Fetched token data:', tokenData);
        setTokens(tokenData);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }

    fetchTokens();
    const interval = setInterval(fetchTokens, 2000);
    return () => clearInterval(interval);
  }, []);

  console.log('Rendering tokens array:', tokens);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: '10px',
      padding: '10px',
      color: '#00FF41'
    }}>
      {tokens.map(token => (
        <div key={token.id} style={{ border: '1px solid #00FF41', padding: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>{token.ticker}</div>
          <div style={{ fontSize: '12px' }}>{token.name}</div>
          <div style={{ fontSize: '10px' }}>MC: ${Math.round(token.price * token.totalSupply)}</div>
        </div>
      ))}
    </div>
  );
}