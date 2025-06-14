import React, { useEffect, useState } from 'react';
import { getPopularTokens } from '@pump-fun/pump-sdk';

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const tokenData = await getPopularTokens();
        console.log("Fetched token data:", tokenData); // 🔍 Debug output
        setTokens(tokenData);
      } catch (error) {
        console.error("Error fetching tokens from pump-sdk:", error);
      }
    }

    fetchTokens();
    const interval = setInterval(fetchTokens, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
      {tokens.map((token) => (
        <div key={token.id} style={{ border: '1px solid #00FF41', padding: '10px', color: '#00FF41' }}>
          <div style={{ fontWeight: 'bold' }}>{token.ticker}</div>
          <div style={{ fontSize: '12px' }}>{token.name}</div>
          <div style={{ fontSize: '10px' }}>MC: ${Math.round(token.price * token.totalSupply)}</div>

          <label style={{ fontSize: '10px', display: 'block', marginTop: '10px' }}>
            Stop-Loss:
            <input
              type="number"
              placeholder="0.00"
              defaultValue={localStorage.getItem(`stoploss-${token.id}`) || ''}
              style={{ marginLeft: '5px', width: '60px' }}
              onBlur={(e) => localStorage.setItem(`stoploss-${token.id}`, e.target.value)}
            />
          </label>

          <label style={{ fontSize: '10px', display: 'block', marginTop: '5px' }}>
            <input
              type="checkbox"
              onChange={(e) => localStorage.setItem(`activeStoploss-${token.id}`, e.target.checked)}
              defaultChecked={localStorage.getItem(`activeStoploss-${token.id}`) === 'true'}
            /> Enable Stop-Loss
          </label>
        </div>
      ))}
    </div>
  );
}