import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

export const getSolanaBalance = async (walletAddress) => {
  try {
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // convert lamports to SOL
  } catch (err) {
    console.error('Error fetching balance:', err);
    return null;
  }
};