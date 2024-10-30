// src/hooks/useThread.ts

import { useState, useEffect } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { Message, ThreadState } from '@/types';

export function useThread() {
  const [threadState, setThreadState] = useState<ThreadState>({
    messages: [],
    currentThread: undefined
  });
  const { publicKey } = useWallet();

  // Update thread state when wallet changes
  useEffect(() => {
    if (publicKey) {
      // Could fetch user's threads here
      setThreadState(prev => ({
        ...prev,
        currentThread: prev.currentThread ? {
          ...prev.currentThread,
          public_key: publicKey.toString()
        } : undefined
      }));
    }
  }, [publicKey]);

  const addMessage = (message: Message) => {
    setThreadState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  };

  return {
    threadState,
    addMessage
  };
}
