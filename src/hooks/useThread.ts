// src/hooks/useThread.ts

import { useState, useCallback } from "react";
import { ThreadState, Message } from "@/types";

export function useThread() {
  const [threadState, setThreadState] = useState<ThreadState>({
    messages: [],
    current_step: "action",
    thread_id: "",
    currentThread: undefined,
  });

  const addMessage = useCallback((message: Message) => {
    setThreadState((prev) => ({
      ...prev,
      messages: [...prev.messages, {
        ...message,
        timestamp: message.timestamp instanceof Date ?
          message.timestamp.getTime() :
          message.timestamp
      }],
    }));
  }, []);

  const setCurrentThread = useCallback((threadId: string) => {
    setThreadState((prev) => ({
      ...prev,
      currentThread: threadId,
    }));
  }, []);

  return {
    threadState,
    addMessage,
    setCurrentThread,
  };
}
