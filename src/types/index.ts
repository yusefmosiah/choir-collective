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

export type ActionContent = {
  proposed_response: string;
  confidence: number;
  reasoning: string;
};

export type ExperienceContent = {
  synthesis: string;
  key_insights: string[];
  source_relevance: {
    most_relevant: string[];
    reasoning: string;
  };
};

export type IntentionContent = {
  explicit_intent: string;
  implicit_intent: string;
  confidence: number;
};

export type ObservationContent = {
  patterns: string[];
  context_analysis: string;
  user_state: string;
  confidence: number;
};

export type UpdateContent = {
  loop: boolean;
  reasoning: string;
  confidence: number;
  key_insights: string[];
};

export type YieldContent = {
  final_response: string;
  key_points: string[];
  confidence: number;
  synthesis_quality: string;
};

export type StepContent =
  | string
  | ActionContent
  | ExperienceContent
  | IntentionContent
  | ObservationContent
  | UpdateContent
  | YieldContent;

export type Step = {
  step: ChorusStep;
  content: StepContent;
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
