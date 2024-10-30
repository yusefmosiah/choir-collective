import React, { useState, ReactNode } from 'react';
import ChorusPanel from './ChorusPanel';
import { Message, Source, Step } from '../types';
import ReactMarkdown from 'react-markdown';

interface AIResponseProps {
  message: Message;
  sources: Source[];
  steps: Step[];
  children?: ReactNode;
}

const AIResponse: React.FC<AIResponseProps> = ({ message, sources, steps, children }) => {
  const [activeStep, setActiveStep] = useState<string>('action');
  const [sortOption, setSortOption] = useState('similarity');

  const handleStepChange = (step: string) => {
    setActiveStep(step);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  return (
    <div className="p-2 mb-2 w-full bg-teal-900 rounded-lg border border-cyan-700">
      <h3 className="mb-1 text-lg font-semibold text-white">AI</h3>
      <div className="mb-4 text-sm text-white">
        {children || <ReactMarkdown>{message.content}</ReactMarkdown>}
      </div>
      <div className="flex mb-2">
        {steps.map((step) => (
          <button
            key={step.step}
            className={`px-3 py-1 mr-2 text-sm font-medium rounded-t-lg ${
              activeStep === step.step
                ? 'bg-teal-700 text-white'
                : 'bg-teal-800 text-gray-300 hover:bg-teal-700'
            }`}
            onClick={() => handleStepChange(step.step)}
          >
            {step.step}
          </button>
        ))}
      </div>
      <div className="p-4 bg-teal-700 rounded-lg">
        {steps.map((step) => (
          <div key={step.step} className={activeStep === step.step ? 'block' : 'hidden'}>
            <ReactMarkdown>{step.content}</ReactMarkdown>
            {step.step === 'experience' && (
              <ChorusPanel
                steps={[step]}
                sources={sources}
                sortOption={sortOption}
                onSortChange={handleSortChange}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIResponse;
