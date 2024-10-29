// src/hooks/useThread.ts

import { useState, useCallback } from 'react';

export type Message = {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  priors?: Array<Prior>;
};

export type Prior = {
  sourceMessageId: string;
  sourceThreadId: string;
  context: string;
  embedding: number[];
  resonance: number;
};

export type ThreadState = {
  id: string;
  messages: Message[];
  participants: string[];
  lastUpdated: Date;
};

export const useThread = (initialState?: Partial<ThreadState>) => {
  const [threadState, setThreadState] = useState<ThreadState>({
    id: initialState?.id || '',
    messages: initialState?.messages || [],
    participants: initialState?.participants || [],
    lastUpdated: initialState?.lastUpdated || new Date(),
  });

  const addMessage = useCallback((message: Message) => {
    setThreadState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
      lastUpdated: new Date(),
    }));
  }, []);

  const updateMessage = useCallback((messageId: string, updates: Partial<Message>) => {
    setThreadState((prevState) => ({
      ...prevState,
      messages: prevState.messages.map((msg) =>
        msg.id === messageId ? { ...msg, ...updates } : msg
      ),
      lastUpdated: new Date(),
    }));
  }, []);

  const addParticipant = useCallback((participantId: string) => {
    setThreadState((prevState) => ({
      ...prevState,
      participants: [...prevState.participants, participantId],
      lastUpdated: new Date(),
    }));
  }, []);

  return {
    threadState,
    setThreadState,
    addMessage,
    updateMessage,
    addParticipant,
  };
};
