// lib/usePumpTokens.js
import { useEffect, useState } from 'react';
import { fetchTokens } from '@pump-fun/pump-sdk';

export default function usePumpTokens() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTokens();
        const formatted = data.map((t) => ({
          name: t.metadata.name || t.id,
          mcap: `$${(t.liquidity.mcap / 1000).toFixed(1)}K`,
        }));
        setTokens(formatted);
      } catch (err) {
        console.error('Error fetching Pump tokens:', err);
      }
    };

    load();
    const interval = setInterval(load, 2000); // refresh every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return tokens;
}