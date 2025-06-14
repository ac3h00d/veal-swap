import React from 'react';

export default function Header() {
  return (
    <header style={{
      textAlign: 'center',
      marginBottom: '40px',
      borderBottom: '1px solid #00FF41',
      paddingBottom: '20px'
    }}>
      <h1 style={{ color: '#00FF41', fontFamily: 'monospace', fontSize: '24px' }}>
        Veal Swap | Matrix Tracker
      </h1>
    </header>
  );
}