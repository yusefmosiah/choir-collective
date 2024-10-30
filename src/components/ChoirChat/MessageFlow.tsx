import React from 'react';
import { Message } from '@/hooks/useThread';
import { ChorusStep } from '@/hooks/useChorusCycle';

interface MessageFlowProps {
  messages: Message[];
  onMessageSelect: (messageId: string) => void;
  selectedMessageId: string | null;
  currentStep: ChorusStep;
}

const MessageFlow: React.FC<MessageFlowProps> = ({ messages, onMessageSelect, selectedMessageId, currentStep }) => {
  const chorusSteps: ChorusStep[] = ['action', 'experience', 'intention', 'observation', 'update', 'yield'];

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-2 rounded-lg ${message.author === 'User' ? 'bg-blue-100' : 'bg-gray-100'}`}
          onClick={() => onMessageSelect(message.id)}
        >
          <p className="text-sm">{message.content}</p>
          <small className="text-xs text-gray-500">{message.author} - {message.timestamp.toLocaleString()}</small>

          {message.author !== 'User' && (
            <div className="mt-2">
              <div className="flex border-b">
                {chorusSteps.map((step) => (
                  <button
                    key={step}
                    className={`px-2 py-1 text-xs ${selectedMessageId === message.id ? 'bg-gray-200' : ''}`}
                  >
                    {step}
                  </button>
                ))}
              </div>
              <div className="p-2 bg-white">
                {/* Content for each step will go here */}
                Step content
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageFlow;
