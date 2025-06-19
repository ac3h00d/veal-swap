import { Connection, PublicKey } from '@solana/web3.js';

const SOLANA_RPC = 'https://api.mainnet-beta.solana.com';

export async function getBalance(publicKeyString) {
  try {
    const connection = new Connection(SOLANA_RPC);
    const balanceLamports = await connection.getBalance(new PublicKey(publicKeyString));
    const balanceSol = balanceLamports / 1e9;
    return balanceSol.toFixed(4) + ' SOL';
  } catch (err) {
    console.error('Error fetching balance:', err);
    return 'Error';
  }
}