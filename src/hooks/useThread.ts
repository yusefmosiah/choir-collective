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

    // If this is a user message, prepare for AI response
    if (message.author === "user") {
      // Add a placeholder AI message immediately after
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: "",  // Will be filled by WebSocket responses
        author: "ai",
        timestamp: Date.now(),
        thread_id: message.thread_id,
      };
      setThreadState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
      }));
    }
  }, []);

  const updateAIMessage = useCallback((content: string) => {
    setThreadState((prev) => ({
      ...prev,
      messages: prev.messages.map(msg =>
        msg.author === "ai" && !msg.content ?
          { ...msg, content } :
          msg
      ),
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
    updateAIMessage,
    setCurrentThread,
  };
}
