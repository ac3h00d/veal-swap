import React, { useEffect, useState } from 'react';

export default function TokenGrid() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        id: "fake123",
        name: "Veal Coin",
        ticker: "VEAL",
        price: 0.0042,
        totalSupply: 1000000
      },
      {
        id: "fake456",
        name: "Pumpster",
        ticker: "PUMP",
        price: 0.0099,
        totalSupply: 500000
      }
    ];
    setTokens(dummyData);
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '10px',
      color: '#00FF41',
      padding: '20px'
    }}>
      {tokens.map((token) => (
        <div key={token.id} style={{ border: '1px solid #00FF41', padding: '10px' }}>
          <div style={{ fontWeight: 'bold' }}>{token.ticker}</div>
          <div style={{ fontSize: '12px' }}>{token.name}</div>
          <div style={{ fontSize: '10px' }}>
            MC: ${Math.round(token.price * token.totalSupply)}
          </div>
        </div>
      ))}
    </div>
  );
}