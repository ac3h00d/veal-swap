import React from 'react';
import Header from '../components/Header';
import TokenGrid from '../components/TokenGrid';

export default function Home() {
  return (
    <div style={{ margin: 0, padding: 0, backgroundColor: 'black' }}>
      <Header />
      <TokenGrid />
    </div>
  );
}