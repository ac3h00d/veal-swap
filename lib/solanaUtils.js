// lib/solanaUtils.js
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

export async function getWalletBalance(publicKeyStr) {
  try {
    const publicKey = new PublicKey(publicKeyStr);
    const balanceLamports = await connection.getBalance(publicKey);
    const balanceSOL = balanceLamports / 1e9;
    return balanceSOL;
  } catch (err) {
    console.error("Error fetching balance:", err);
    return null;
  }
}