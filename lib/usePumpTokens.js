// lib/usePumpTokens.js
import { useEffect, useState } from 'react';
import { getAllTokens } from '@pump-fun/pump-sdk';

export default function usePumpTokens() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const all = await getAllTokens();

        const trending = all
          .filter(token => token.metadata?.name && token.liquidity?.mcap)
          .sort((a, b) => b.liquidity.mcap - a.liquidity.mcap)
          .slice(0, 10);

        const formatted = trending.map(token => ({
          name: token.metadata.name,
          mcap: `$${(token.liquidity.mcap / 1000).toFixed(1)}K`,
        }));

        setTokens(formatted);
      } catch (err) {
        console.error('Pump.fun fetch failed:', err);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return tokens;
}