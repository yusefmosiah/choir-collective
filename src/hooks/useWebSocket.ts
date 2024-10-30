// src/hooks/useWebSocket.ts

import { useState, useEffect, useRef, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WebSocketMessage } from "@/types";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const { publicKey } = useWallet();

  const handleMessage = useCallback((event: MessageEvent) => {
    const message = JSON.parse(event.data);

    switch (message.type) {
      case "chorus_step":
        // Handle step updates
        // Emit or update state as needed
        break;
      case "prior_update":
        // Handle prior updates
        // Update priors state
        break;
      case "thread_update":
        // Handle thread updates
        // Update thread-related state
        break;
      default:
        console.warn(`Unhandled message type: ${message.type}`);
    }
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      if (publicKey) {
        socket.send(
          JSON.stringify({
            type: "connect",
            data: {
              public_key: publicKey.toString(),
            },
          })
        );
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    socket.onmessage = handleMessage;

    return () => {
      socket.close();
    };
  }, [publicKey, handleMessage]);

  const sendMessage = (message: WebSocketMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const messageWithWallet = {
        ...message,
        data: {
          ...message.data,
          public_key: publicKey?.toString(),
        },
      };
      socketRef.current.send(JSON.stringify(messageWithWallet));
    }
  };

  return {
    isConnected,
    sendMessage,
    socket: socketRef.current,
  };
}
