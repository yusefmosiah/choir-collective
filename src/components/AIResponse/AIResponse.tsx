import React, { useState } from 'react';
import { Message, Prior, Step, ChorusStep } from '@/types';
import ReactMarkdown from 'react-markdown';

interface AIResponseProps {
  message: Message;
  sources?: Prior[];
  currentStep: ChorusStep;
  steps: Step[];
}

const AIResponse: React.FC<AIResponseProps> = ({ message, sources = [], currentStep, steps }) => {
  const [activeStep, setActiveStep] = useState<ChorusStep>(currentStep);
  const chorusSteps: ChorusStep[] = ['action', 'experience', 'intention', 'observation', 'update', 'yield'];

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

              {/* Show sources inline for experience step */}
              {step.step === 'experience' && sources.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="font-medium">Prior Citations:</div>
                  {sources.map((source) => (
                    <div
                      key={source.id}
                      className="p-2 bg-base-200 rounded text-sm"
                    >
                      <div>{source.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        Similarity: {(source.similarity * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIResponse;
