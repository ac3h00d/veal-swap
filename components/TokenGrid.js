import React, { useEffect, useState } from 'react';

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGraduates = async () => {
      try {
        const res = await fetch('https://pump.fun/api/coins?sort=graduated');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setTokens(data?.slice(0, 50)); // limit for speed
        setError('');
        console.log('✅ Graduated Tokens:', data);
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError(err.message);
      }
    };

    fetchGraduates();
    const interval = setInterval(fetchGraduates, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: 'black',
      color: '#00FF41',
      fontFamily: 'monospace',
      padding: '1rem'
    }}>
      <h2>🎓 About to Graduate</h2>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {!tokens.length && !error && <div>Loading tokens...</div>}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {tokens.map((token, idx) => (
          <div key={idx} style={{
            border: '1px solid #00FF41',
            padding: '0.5rem',
            backgroundColor: '#111'
          }}>
            <div style={{ fontWeight: 'bold' }}>{token.symbol || 'Unknown'}</div>
            <div style={{ fontSize: '0.8rem' }}>{token.name}</div>
            <div style={{ fontSize: '0.75rem' }}>Market Cap: ${Math.floor(token?.marketCap || 0)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}