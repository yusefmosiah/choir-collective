export type ChorusStep = 'action' | 'experience' | 'intention' | 'observation' | 'update' | 'yield';

export interface Step {
  step: ChorusStep;
  content: string;
}

export interface Prior {
  id: string;
  content: string;
  thread_id: string;
  similarity: number;
  created_at: string;
  role: string;
  token_value: number;
}

export interface Message {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  thread_id: string;
  step?: ChorusStep;
}

export interface WebSocketMessage {
  type: string;
  data: any;
}

export interface ThreadState {
  messages: Message[];
  currentThread?: {
    id: string;
    name: string;
    public_key?: string;
  };
}

export interface ChorusState {
  current_step: ChorusStep;
  current_response?: {
    content: string;
    loop?: boolean;
    reasoning?: string;
  };
  priors?: Prior[];
}
