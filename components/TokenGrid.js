import React, { useEffect, useState } from 'react';

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const res = await fetch('https://pump.fun/api/tokens/movers');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log('Fetched movers:', data);
        setTokens(data);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      }
    }

    fetchTokens();
    const interval = setInterval(fetchTokens, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '10px', color: '#00FF41', fontFamily: 'monospace' }}>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <div style={{ marginBottom: '10px' }}>
        {tokens.length > 0
          ? `✅ Showing ${tokens.length} movers`
          : error
          ? ''
          : '⏳ Loading movers...'}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
        {tokens.map(token => (
          <div key={token.id} style={{ border: '1px solid #00FF41', padding: '10px' }}>
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
                onBlur={e => localStorage.setItem(`stoploss-${token.id}`, e.target.value)}
              />
            </label>

            <label style={{ fontSize: '10px', display: 'block', marginTop: '5px' }}>
              <input
                type="checkbox"
                defaultChecked={localStorage.getItem(`activeStoploss-${token.id}`) === 'true'}
                onChange={e => localStorage.setItem(`activeStoploss-${token.id}`, e.target.checked)}
              /> Enable Stop-Loss
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}