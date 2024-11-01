// src/hooks/useThread.ts

import { useState, useCallback, useEffect } from "react";
import { ThreadState, Message, Thread } from "@/types";
import { useWebSocket } from "./useWebSocket";
import { useSolana } from "./useSolana";

export function useThread() {
  const { userId, isConnected } = useSolana();
  const { socket } = useWebSocket();
  const [threadState, setThreadState] = useState<ThreadState>({
    messages: [],
    current_step: "action",
    thread_id: "",
    currentThread: undefined,
    threads: [],
  });

  // Handle user connection
  useEffect(() => {
    const handleUserConnected = (event: CustomEvent) => {
      const { user } = event.detail;
      if (user && user.chat_threads) {
        // Load user's threads
        setThreadState((prev) => ({
          ...prev,
          threads: user.chat_threads.map((threadId: string) => ({
            id: threadId,
            name: `Chat ${threadId.slice(0, 6)}`,
            timestamp: Date.now(),
          })),
        }));
      }
    };

    window.addEventListener(
      "user_connected",
      handleUserConnected as EventListener
    );
    return () => {
      window.removeEventListener(
        "user_connected",
        handleUserConnected as EventListener
      );
    };
  }, []);

  // Handle thread updates
  useEffect(() => {
    const handleThreadUpdate = (event: CustomEvent) => {
      const { thread } = event.detail;
      if (thread) {
        setThreadState((prev) => ({
          ...prev,
          threads: prev.threads
            .map((t) => (t.id === thread.id ? { ...t, ...thread } : t))
            .filter(Boolean),
        }));
      }
    };

    window.addEventListener(
      "thread_update",
      handleThreadUpdate as EventListener
    );
    return () => {
      window.removeEventListener(
        "thread_update",
        handleThreadUpdate as EventListener
      );
    };
  }, []);

  // Load threads when wallet connects
  useEffect(() => {
    if (userId && socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "get_threads",
          data: {
            user_id: userId,
          },
        })
      );
    }
  }, [userId, socket]);

  // Handle thread messages
  useEffect(() => {
    const handleThreadMessages = (event: CustomEvent) => {
      const { messages } = event.detail;
      if (messages) {
        setThreadState((prev) => ({
          ...prev,
          messages: messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.created_at || Date.now()),
          })),
        }));
      }
    };

    window.addEventListener(
      "thread_messages",
      handleThreadMessages as EventListener
    );
    return () => {
      window.removeEventListener(
        "thread_messages",
        handleThreadMessages as EventListener
      );
    };
  }, []);

  const addMessage = useCallback(
    (message: Message) => {
      setThreadState((prev) => {
        const updatedThreads = prev.threads.map((thread) =>
          thread.id === message.thread_id
            ? { ...thread, lastMessage: message.content, timestamp: Date.now() }
            : thread
        );

        if (socket?.readyState === WebSocket.OPEN && userId) {
          socket.send(
            JSON.stringify({
              type: "save_message",
              data: {
                message: {
                  ...message,
                  user_id: userId,
                },
              },
            })
          );
        }

        return {
          ...prev,
          messages: [
            ...prev.messages,
            {
              ...message,
              timestamp:
                message.timestamp instanceof Date
                  ? message.timestamp.getTime()
                  : message.timestamp,
            },
          ],
          threads: updatedThreads,
        };
      });

      if (message.author === "user") {
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          content: "",
          author: "ai",
          timestamp: Date.now(),
          thread_id: message.thread_id,
        };
        setThreadState((prev) => ({
          ...prev,
          messages: [...prev.messages, aiMessage],
        }));
      }
    },
    [socket, userId]
  );

  const setCurrentThread = useCallback(
    (threadId: string) => {
      setThreadState((prev) => {
        if (!prev.threads.find((t) => t.id === threadId)) {
          const newThread = {
            id: threadId,
            name: `Chat ${prev.threads.length + 1}`,
            timestamp: Date.now(),
          };

          if (socket?.readyState === WebSocket.OPEN && userId) {
            socket.send(
              JSON.stringify({
                type: "create_thread",
                data: {
                  thread: {
                    ...newThread,
                    user_id: userId,
                    name: newThread.name,
                  },
                },
              })
            );
          }

          // Add the new thread immediately
          return {
            ...prev,
            currentThread: threadId,
            threads: [...prev.threads, newThread],
          };
        }
        return {
          ...prev,
          currentThread: threadId,
        };
      });

      // Load messages for this thread
      if (socket?.readyState === WebSocket.OPEN && userId) {
        socket.send(
          JSON.stringify({
            type: "get_thread_messages",
            data: {
              thread_id: threadId,
              user_id: userId,
            },
          })
        );
      }
    },
    [socket, userId]
  );

  return {
    threadState,
    addMessage,
    setCurrentThread,
    isWalletConnected: isConnected,
  };
}
