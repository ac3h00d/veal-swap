import React, { useEffect, useState } from 'react';

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGraduated = async () => {
      try {
        const res = await fetch(
          'https://deep-index.moralis.io/api/v2/pumpfun/graduated',
          {
            headers: { 'X-API-Key': 'YOUR_MORALIS_API_KEY' }
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log('🎓 Graduated tokens:', data);
        setTokens(data.result || []);
        setError('');
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setError(err.message);
      }
    };

    fetchGraduated();
    const interval = setInterval(fetchGraduated, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#000',
      color: '#00FF41',
      fontFamily: 'monospace'
    }}>
      <div style={{ marginBottom: '12px' }}>
        {error
          ? `Error: ${error}`
          : tokens.length
            ? `🎓 Showing ${tokens.length} graduated tokens`
            : 'Loading graduates...'}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '10px'
      }}>
        {tokens.map((token, idx) => (
          <div key={idx} style={{
            border: '1px solid #00FF41',
            borderRadius: '4px',
            padding: '10px',
            backgroundColor: '#111'
          }}>
            <div style={{ fontWeight: 'bold' }}>{token.symbol}</div>
            <div style={{ fontSize: '12px' }}>{token.name}</div>
            <div style={{ fontSize: '10px' }}>Cap: ${Math.floor(token.marketCap)}</div>
            <div style={{ fontSize: '10px' }}>Launch: {new Date(token.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}