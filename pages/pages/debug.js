// pages/debug.js
import { useEffect, useState } from 'react';
import { fetchTokens } from '@pump-fun/pump-sdk';

export default function DebugPage() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchTokens();
        console.log("Fetched tokens:", res);
        setTokens(res.slice(0, 10)); // Only show first 10 for clarity
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      }
    };
    load();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Debug Pump Tokens</h1>
      {tokens.length === 0 ? (
        <p>Loading or no tokens available...</p>
      ) : (
        tokens.map((t, i) => (
          <p key={i}>{t.metadata?.name || t.id}</p>
        ))
      )}
    </div>
  );
}
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