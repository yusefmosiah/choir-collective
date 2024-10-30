import React, { useState } from "react";
import { Message, Step, ChorusStep } from "@/types";
import ReactMarkdown from "react-markdown";
import PriorCard from "../PriorCard/PriorCard";

interface AIResponseProps {
  message: Message;
  currentStep: ChorusStep;
  steps: Step[];
}

const AIResponse: React.FC<AIResponseProps> = ({
  message,
  currentStep,
  steps,
}) => {
  const [activeStep, setActiveStep] = useState<ChorusStep>(currentStep);
  const chorusSteps: ChorusStep[] = [
    "action",
    "experience",
    "intention",
    "observation",
    "update",
    "yield",
  ];

  const StepContent: React.FC<{ step: Step }> = ({ step }) => {
    switch (step.step) {
      case "action":
        return (
          <div className="prose dark:prose-invert">
            <ReactMarkdown>{step.content}</ReactMarkdown>
          </div>
        );
      case "experience":
        return (
          <div className="space-y-4">
            <div className="prose dark:prose-invert">
              <ReactMarkdown>{step.content}</ReactMarkdown>
            </div>
            {step.state.priors && step.state.priors.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Relevant Priors</h3>
                <div className="space-y-2">
                  {step.state.priors.map((prior) => (
                    <PriorCard key={prior.id} prior={prior} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="prose dark:prose-invert">
            <ReactMarkdown>{step.content}</ReactMarkdown>
          </div>
        );
    }
  };

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
              className={`px-3 py-1 mr-2 rounded-t-lg transition-colors duration-300 ${
                activeStep === step
                  ? "bg-primary text-primary-content"
                  : "bg-base-300 hover:bg-base-100"
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        {/* Step Content with Animation */}
        <div className="p-4 bg-base-100 rounded-lg transition-all duration-500">
          {steps.map((step) => (
            <div
              key={step.step}
              className={`${
                activeStep === step.step
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 hidden"
              } transition-all duration-500`}
            >
              <StepContent step={step} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIResponse;
