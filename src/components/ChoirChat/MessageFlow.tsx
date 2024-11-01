import React from "react";
import { Message, ChorusStep, Step, Prior } from "@/types";
import AIResponse from "../AIResponse/AIResponse";

// Export the interface
export interface MessageFlowProps {
  messages: Message[];
  onMessageSelect?: (id: string | null) => void;
  selectedMessageId?: string | null;
  currentStep: ChorusStep;
  getStepsForMessage: (messageId?: string) => Step[];
  priors: Prior[];
}

const MessageFlow: React.FC<MessageFlowProps> = ({
  messages,
  onMessageSelect,
  selectedMessageId,
  currentStep,
  getStepsForMessage,
  priors,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onMessageSelect?.(message.id || null)}
          className={`${
            selectedMessageId === message.id ? "ring-2 ring-primary" : ""
          }`}
        >
          {message.author === "user" ? (
            <div className="p-4 bg-base-300 rounded-lg">
              <div className="font-semibold text-lg">You</div>
              <div>{message.content}</div>
            </div>
          ) : (
            <AIResponse
              message={message}
              steps={getStepsForMessage(message.id)}
              currentStep={currentStep}
              priors={priors}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageFlow;
