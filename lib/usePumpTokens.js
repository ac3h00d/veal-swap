// lib/usePumpTokens.js
import { useEffect, useState } from 'react';
import { getAllTokens } from '@pump-fun/pump-sdk';

export default function usePumpTokens() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const data = await getAllTokens();
        const formatted = data
          .filter(t => t.metadata?.name && t.liquidity?.mcap)
          .slice(0, 20) // get the top 20
          .map(t => ({
            name: t.metadata.name,
            mcap: `$${(t.liquidity.mcap / 1000).toFixed(1)}K`,
          }));
        setTokens(formatted);
      } catch (err) {
        console.error('Pump.fun fetch error:', err);
      }
    }

    fetchTokens(); // initial fetch
    const interval = setInterval(fetchTokens, 4000); // refresh every 4 sec
    return () => clearInterval(interval);
  }, []);

  return tokens;
}