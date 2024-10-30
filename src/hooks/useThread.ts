// src/hooks/useThread.ts

import { useState } from 'react';
import { Message, ThreadState } from '@/types';

export function useThread() {
  const [threadState, setThreadState] = useState<ThreadState>({
    messages: [],
    currentThread: undefined
  });

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
