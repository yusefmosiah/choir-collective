import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { useCallback, useMemo } from 'react';
import { LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js';

export function useSolana() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const userId = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const isConnected = useMemo(() => {
    return connected && !!publicKey;
  }, [connected, publicKey]);

  // Get wallet balance
  const getBalance = useCallback(async () => {
    if (!publicKey) return 0;
    try {
      const balance = await connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 0;
    }
  }, [connection, publicKey]);

  // Request airdrop (for devnet)
  const requestAirdrop = useCallback(async () => {
    if (!publicKey) throw new Error("Wallet not connected");
    try {
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL)
      ]);

      await connection.confirmTransaction({
        signature,
        ...latestBlockhash
      });
      return signature;
    } catch (error) {
      console.error('Airdrop failed:', error);
      throw error;
    }
  }, [connection, publicKey]);

  // Send transaction helper
  const sendTx = useCallback(async (transaction: Transaction) => {
    if (!publicKey) throw new Error("Wallet not connected");

    try {
      const signature = await sendTransaction(transaction, connection);
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature,
        ...latestBlockhash
      });
      return signature;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }, [connection, publicKey, sendTransaction]);

  return {
    userId,
    isConnected,
    publicKey,
    connection,
    getBalance,
    requestAirdrop,
    sendTx
  };
}
