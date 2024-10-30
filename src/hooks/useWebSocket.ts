// src/hooks/useWebSocket.ts

import { useState, useEffect, useRef } from "react";
import { WebSocketMessage } from "@/types";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
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
  }, []);

  const sendMessage = (message: WebSocketMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return {
    isConnected,
    sendMessage,
    lastMessage,
    socket: socketRef.current,
  };
}
