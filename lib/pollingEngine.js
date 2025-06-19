// lib/pollingEngine.js

import { fetchAllTokens } from '@pump-fun/pump-sdk';

export async function fetchLiveTokenData(limit = 50) {
  try {
    const tokens = await fetchAllTokens();
    return tokens
      .filter(t => t?.metadata?.name && t?.marketCap)
      .slice(0, limit)
      .map(t => ({
        name: t.metadata.name,
        symbol: t.metadata.symbol,
        mcap: `$${(t.marketCap / 1000).toFixed(1)}K`,
        price: `$${(t.price / 1e9).toFixed(6)}`,
        id: t.id,
        volume: t.volume,
      }));
  } catch (err) {
    console.error("❌ Error fetching tokens:", err);
    return [];
  }
}