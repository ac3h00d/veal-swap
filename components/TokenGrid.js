import React, { useEffect, useState } from 'react';
import { getPopularTokens } from '@pump-fun/pump-sdk';

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null); // for mobile logs

  useEffect(() => {
    async function fetchTokens() {
      try {
        const tokenData = await getPopularTokens();
        setTokens(tokenData);
        setError(`✅ Fetched ${tokenData.length} tokens`);
      } catch (err) {
        setError(`❌ Error fetching: ${err.message}`);
      }
    }

    fetchTokens();
    const interval = setInterval(fetchTokens, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ color: '#00FF41', padding: '10px' }}>
      <h3 style={{ fontSize: '16px' }}>🧪 Debug Log: {error || 'Loading...'}</h3>

      {tokens.length === 0 ? (
        <p>No tokens found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
          {tokens.map(token => (
            <div key={token.id} style={{ border: '1px solid #00FF41', padding: '10px' }}>
              <div style={{ fontWeight: 'bold' }}>{token.ticker}</div>
              <div style={{ fontSize: '12px' }}>{token.name}</div>
              <div style={{ fontSize: '10px' }}>MC: ${Math.round(token.price * token.totalSupply)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}