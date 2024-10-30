import React, { useState } from 'react';
import { Message, Prior, Step } from '@/types';
import ReactMarkdown from 'react-markdown';

interface AIResponseProps {
  message: Message;
  sources: Prior[];
  steps: Step[];
}

const AIResponse: React.FC<AIResponseProps> = ({ message, sources, steps }) => {
  const [activeStep, setActiveStep] = useState<string>('action');
  const chorusSteps = ['action', 'experience', 'intention', 'observation', 'update', 'yield'];

  return (
    <div className="p-4 bg-base-200 rounded-lg mb-4">
      {/* Main Response */}
      <div className="mb-4">
        <div className="font-semibold text-lg">AI</div>
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>

      {/* Chorus Cycle Steps */}
      <div className="border-t border-base-300 pt-4">
        <div className="flex mb-2 overflow-x-auto">
          {chorusSteps.map((step) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`px-3 py-1 mr-2 rounded-t-lg ${
                activeStep === step
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-300 hover:bg-base-100'
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-4 bg-base-100 rounded-lg">
          {steps.map((step) => (
            <div
              key={step.step}
              className={activeStep === step.step ? 'block' : 'hidden'}
            >
              <ReactMarkdown>{step.content}</ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIResponse;
