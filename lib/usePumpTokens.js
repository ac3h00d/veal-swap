// lib/usePumpTokens.js
import { useEffect, useState } from 'react';
import { getAllTokens } from '@pump-fun/pump-sdk';

export default function usePumpTokens() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const all = await getAllTokens();
        const trending = all.slice(0, 10); // top 10
        const formatted = trending.map((token) => ({
          name: token.name,
          mcap: `$${(token.marketCap / 1000).toFixed(1)}K`,
        }));
        setTokens(formatted);
      } catch (err) {
        console.error('Pump.fun fetch failed:', err);
      }
    }

    fetchTokens();
    const interval = setInterval(fetchTokens, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return tokens;
}