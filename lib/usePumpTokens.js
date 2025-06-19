// lib/usePumpTokens.js
import { useEffect, useState } from 'react';
import { fetchTokens } from '@pump-fun/pump-sdk';

export default function usePumpTokens() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTokens({ limit: 10 }); // limit can be adjusted
        const formatted = data.map((t) => ({
          name: t.metadata?.name || t.id,
          mcap: `$${(t.liquidity?.mcap / 1000).toFixed(1)}K`,
        }));
        setTokens(formatted);
      } catch (err) {
        console.error('Pump.fun fetch error:', err);
      }
    };

    load();
    const interval = setInterval(load, 5000); // refresh every 5s

    return () => clearInterval(interval);
  }, []);

  return tokens;
}