export type ChorusStep =
  | 'action'
  | 'experience'
  | 'intention'
  | 'observation'
  | 'update'
  | 'yield';

export interface Message {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  thread_id: string;
}

export interface Prior {
  id: string;
  content: string;
  similarity: number;
  created_at: string;
}

export interface Step {
  step: ChorusStep;
  content: string;
  state: StepState;
}

export interface StepState {
  status: "idle" | "loading" | "complete" | "error";
  content?: string;
  priors?: Prior[];
  selectedPriors?: Prior[];
  gaps?: string[];
  decision?: boolean;
  reasoning?: string;
  finalResponse?: string;
}

export interface ChorusState {
  current_step: ChorusStep;
  current_response?: {
    content: string;
    loop?: boolean;
    reasoning?: string;
  };
}

export interface WebSocketMessage {
  type: string;
  data: {
    message_id?: string;
    content?: string;
    thread_id?: string;
    public_key?: string;
    step?: ChorusStep;
    priors?: Prior[];
    [key: string]: any;
  };
}
