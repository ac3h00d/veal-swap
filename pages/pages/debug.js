// pages/debug.js
import { useEffect, useState } from 'react';
import { fetchTokens } from '@pump-fun/pump-sdk';

export default function Debug() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    fetchTokens({ limit: 5 }).then(setTokens).catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Debug Pump Tokens</h1>
      <pre>{JSON.stringify(tokens, null, 2)}</pre>
    </div>
  );
}