// src/hooks/useWebSocket.ts

import { useState, useCallback, useEffect, useRef } from 'react';
import { Message } from './useThread';
import MockWebSocket from '@/mocks/mockWebSocket';

type WebSocketMessage = {
  type: 'message' | 'update' | 'system';
  payload: any;
};

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<MockWebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);

  const connect = useCallback(() => {
    const ws = new MockWebSocket('ws://localhost:8000/ws');
    socketRef.current = ws;

    ws.on('open', () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    });

    ws.on('message', (event: string) => {
      const message: WebSocketMessage = JSON.parse(event);
      setLastMessage(message);
      console.log('Received message:', message);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    });
  }, []);

  const sendMessage = useCallback((message: Message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: 'message', payload: message }));
    } else {
      console.error('WebSocket is not connected');
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  return { isConnected, sendMessage, lastMessage };
};
