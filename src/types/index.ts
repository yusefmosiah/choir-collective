export type ChorusStep =
  | "action"
  | "experience"
  | "intention"
  | "observation"
  | "update"
  | "yield";

export type Prior = {
  id: string;
  content: string;
  source_message: string;
  source_thread: string;
  context: string;
  embedding: number[];
  resonance: number;
};

export type Step = {
  step: ChorusStep;
  content: string;
  state: {
    status: "pending" | "complete" | "error";
    content: string;
    priors?: Prior[];
  };
};

export type Message = {
  id?: string;
  content: string;
  thread_id: string;
  author?: string;
  timestamp?: number | Date;
};

export type ChorusState = {
  current_step: ChorusStep;
  current_response?: {
    content: string;
    loop?: boolean;
    reasoning?: string;
  };
};

export type ThreadState = {
  messages: Message[];
  current_step: ChorusStep;
  thread_id: string;
  error_state?: string;
  currentThread?: string;
};

export type WebSocketMessage = {
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
};
