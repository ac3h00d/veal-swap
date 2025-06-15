import React, { useEffect, useState } from 'react';

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetch('https://pump.fun/api/coins?scan=true');
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        console.log('[✔] Tokens loaded:', data.slice(0, 10));
        setTokens(data.slice(0, 20)); // adjust count as needed
        setError('');
      } catch (err) {
        console.error('[✘] Failed to fetch tokens:', err);
        setError(err.message);
      }
    };

    fetchTokens();
    const interval = setInterval(fetchTokens, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      backgroundColor: 'black',
      color: '#00FF41',
      fontFamily: 'monospace',
      padding: '1rem',
      minHeight: '100vh'
    }}>
      <h2>🚀 About to Graduate</h2>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {!tokens.length && !error && <div>Loading tokens...</div>}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {tokens.map((token, i) => (
          <div key={i} style={{
            border: '1px solid #00FF41',
            padding: '10px',
            backgroundColor: '#111'
          }}>
            <strong>{token.symbol}</strong><br />
            {token.name}<br />
            MC: ${Math.floor(token.marketCap || 0)}
          </div>
        ))}
      </div>
    </div>
  );
}