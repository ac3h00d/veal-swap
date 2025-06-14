import React, { useEffect, useState } from 'react';

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const res = await fetch('https://pump.fun/api/tokens/popular');
        const data = await res.json();
        setTokens(data);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    }

    fetchTokens();
    const interval = setInterval(fetchTokens, 15000); // refresh every 15 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px', marginTop: '40px' }}>
      {tokens.map((token) => (
<div key={token.id} style={{ border: '1px solid #00FF41', padding: '10px', borderRadius: '6px', background: '#111', color: '#00FF41' }}>
  <div style={{ fontWeight: 'bold' }}>{token.ticker}</div>
  <div style={{ fontSize: '12px' }}>{token.name}</div>
  <div style={{ fontSize: '10px' }}>MC: ${Math.round(token.market_cap).toLocaleString()}</div>

  <label style={{ fontSize: '10px', display: 'block', marginTop: '5px' }}>
    Stop-Loss:
    <input
      type="number"
      placeholder="0.00"
      defaultValue={localStorage.getItem(`stoploss-${token.id}`) || ''}
      style={{ marginLeft: '5px', width: '60px', fontSize: '10px' }}
      onBlur={(e) => localStorage.setItem(`stoploss-${token.id}`, e.target.value)}
    />
  </label>

  <label style={{ fontSize: '10px', display: 'block', marginTop: '5px' }}>
    <input
      type="checkbox"
      onChange={(e) => localStorage.setItem(`active-${token.id}`, e.target.checked)}
      defaultChecked={localStorage.getItem(`active-${token.id}`) === 'true'}
    /> Enable Stop-Loss
  </label>
</div>
      ))}
    </div>
  );
}