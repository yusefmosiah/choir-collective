import React from 'react';
import { Message, ChorusStep } from '@/types';
import AIResponse from '../AIResponse/AIResponse';
import { useChorusCycle } from '@/hooks/useChorusCycle';

interface MessageFlowProps {
  messages: Message[];
  onMessageSelect: (messageId: string) => void;
  selectedMessageId: string | null;
}

const MessageFlow: React.FC<MessageFlowProps> = ({
  messages,
  onMessageSelect,
  selectedMessageId,
}) => {
  const { currentStep, steps, priors } = useChorusCycle();

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        message.author === 'User' ? (
          // User message
          <div
            key={message.id}
            className="p-4 bg-base-300 rounded-lg"
            onClick={() => onMessageSelect(message.id)}
          >
            <div className="text-sm">{message.content}</div>
            <div className="text-xs opacity-70 mt-1">
              {message.timestamp.toLocaleString()}
            </div>
          </div>
        ) : (
          // AI message with Chorus Cycle
          <AIResponse
            key={message.id}
            message={message}
            currentStep={currentStep}
            steps={steps}
            sources={priors}
          />
        )
      ))}
    </div>
  );
};

export default MessageFlow;
