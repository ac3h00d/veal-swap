// lib/usePumpTokens.js
import { useEffect, useState } from 'react';
import { getAllTokens } from '@pump-fun/pump-sdk';

export default function usePumpTokens() {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const all = await getAllTokens();
        const trending = all.slice(0, 12); // First 12 tokens by whatever order is returned
        const formatted = trending.map((token) => ({
          name: token.metadata?.name || token.id,
          mcap: `$${(token.market_cap / 1000).toFixed(1)}K`,
        }));
        setTokens(formatted);
      } catch (err) {
        console.error('Pump.fun fetch failed:', err);
      }
    };

    fetchTokens();
    const interval = setInterval(fetchTokens, 2000); // Refresh every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return tokens;
}