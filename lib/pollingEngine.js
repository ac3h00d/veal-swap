// lib/pollingEngine.js

import { getAllTokens } from '@pump-fun/pump-sdk';

export async function fetchLiveTokens(limit = 12) {
  try {
    const allTokens = await getAllTokens();
    
    // Sort by market cap descending and slice top tokens
    const sorted = allTokens
      .filter(token => token?.metadata?.name && token?.market_cap)
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(0, limit);

    // Format them for the UI
    return sorted.map(token => ({
      name: token.metadata.name,
      mcap: `$${(token.market_cap / 1000).toFixed(1)}K`,
      symbol: token.metadata.symbol || '',
      mint: token.metadata.mint,
    }));
  } catch (error) {
    console.error('Pump.fun fetch error:', error);
    return [];
  }
}