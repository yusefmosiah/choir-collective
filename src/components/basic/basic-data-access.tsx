"use client";

import {
  BASIC_PROGRAM_ID as programId,
  getBasicProgram,
} from "@project/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as anchor from "@coral-xyz/anchor";
import { useCluster } from "../cluster/cluster-data-access";
import { useAnchorProvider } from "../solana/solana-provider";
import { useTransactionToast } from "../ui/ui-layout";

export function useBasicProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();

  const getProgramAccount = useQuery({
    queryKey: ["get-program-account", { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ["basic", "initialize", { cluster }],
    mutationFn: async () => {
      const program = await getBasicProgram(provider);
      return program.methods.initialize().rpc();
    },
    onSuccess: (signature: string) => {
      transactionToast(signature);
    },
  });

  const createMessage = useMutation({
    mutationKey: ["basic", "createMessage", { cluster }],
    mutationFn: async (content: string) => {
      const program = await getBasicProgram(provider);
      const message = anchor.web3.Keypair.generate();

      const accounts = {
        message: message.publicKey,
        author: provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      };

      return program.methods
        .createMessage(content)
        .accounts(accounts)
        .signers([message])
        .rpc();
    },
    onSuccess: (signature: string) => {
      transactionToast(signature);
    },
  });

  return {
    programId,
    getProgramAccount,
    initialize,
    createMessage,
  };
}
