// src/hooks/useWebSocket.ts

import { useState, useEffect, useRef } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WebSocketMessage } from "@/types";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const { publicKey } = useWallet();

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws');
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      if (publicKey) {
        socket.send(JSON.stringify({
          type: 'connect',
          data: {
            public_key: publicKey.toString()
          }
        }));
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setLastMessage(message);
    };

    return () => {
      socket.close();
    };
  }, [publicKey]);

  const sendMessage = (message: WebSocketMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const messageWithWallet = {
        ...message,
        data: {
          ...message.data,
          public_key: publicKey?.toString()
        }
      };
      socketRef.current.send(JSON.stringify(messageWithWallet));
    }
  };

  return {
    isConnected,
    sendMessage,
    lastMessage,
    socket: socketRef.current,
  };
}
