// lib/usePumpTokens.js
import { useEffect, useState } from 'react';
import { getAllTokens } from '@pump-fun/pump-sdk';

export default function usePumpTokens() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const all = await getAllTokens();
        const sorted = all
          .filter(token => token.metadata?.name && token.liquidity?.mcap)
          .sort((a, b) => b.liquidity.mcap - a.liquidity.mcap)
          .slice(0, 10)
          .map(token => ({
            name: token.metadata.name,
            mcap: `$${(token.liquidity.mcap / 1000).toFixed(1)}K`,
          }));
        setTokens(sorted);
      } catch (err) {
        console.error('Pump.fun fetch error:', err);
      }
    };

    fetchTokens();
    const interval = setInterval(fetchTokens, 5000);
    return () => clearInterval(interval);
  }, []);

  return tokens;
}