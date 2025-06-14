import React from 'react';

const mockTokens = [
  { symbol: 'SOL', price: '143.56', change: '+2.1%' },
  { symbol: 'BONK', price: '0.000028', change: '-1.4%' },
  { symbol: 'WIF', price: '1.21', change: '+8.6%' },
  { symbol: 'PUMP', price: '0.0023', change: '-0.5%' },
];

export default function TokenGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '20px',
      marginTop: '40px',
      fontFamily: 'monospace'
    }}>
      {mockTokens.map((token, index) => (
        <div
          key={index}
          style={{
            padding: '12px',
            border: '1px solid #00FF41',
            borderRadius: '8px',
            backgroundColor: '#000',
            color: token.change.startsWith('-') ? 'red' : '#00FF41',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{token.symbol}</div>
          <div style={{ fontSize: '14px' }}>${token.price}</div>
          <div>{token.change}</div>
        </div>
      ))}
    </div>
  );
}