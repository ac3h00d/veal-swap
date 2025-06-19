// lib/pollingEngine.js

import { getTokenList } from '@pump-fun/pump-sdk';

export async function fetchLiveTokenData() {
  try {
    const tokens = await getTokenList('mainnet'); // or 'devnet' for test
    const simplified = tokens.slice(0, 20).map((token) => ({
      name: token.name,
      mcap: `$${(token.marketCap / 1000).toFixed(1)}K`,
      price: `$${parseFloat(token.price).toFixed(5)}`
    }));
    return simplified;
  } catch (error) {
    console.error('Failed to fetch tokens:', error);
    return [];
  }
}