import React, { useState } from "react";
import {
  Message,
  Step,
  ChorusStep,
  Prior,
  ActionContent,
  ExperienceContent,
  IntentionContent,
  ObservationContent,
  UpdateContent,
  YieldContent,
} from "@/types";
import ReactMarkdown from "react-markdown";
import PriorCard from "../PriorCard/PriorCard";

interface AIResponseProps {
  message: Message;
  currentStep: ChorusStep;
  steps: Step[];
  priors?: Prior[];
}

const AIResponse: React.FC<AIResponseProps> = ({
  message,
  currentStep,
  steps = [],
  priors = [],
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

  const getStepContent = (step: Step): string => {
    try {
      // If content is already a string, return it
      if (typeof step.content === 'string') {
        return step.content;
      }

      // If content is an object, handle based on step type
      if (typeof step.content === 'object' && step.content !== null) {
        switch (step.step) {
          case "action": {
            const content = step.content as ActionContent;
            return `Response: ${content.proposed_response}\n\nConfidence: ${content.confidence}\n\nReasoning: ${content.reasoning}`;
          }
          case "experience": {
            const content = step.content as ExperienceContent;
            return `Synthesis: ${content.synthesis}\n\nKey Insights:\n${content.key_insights.map(i => `- ${i}`).join('\n')}\n\nMost Relevant Sources: ${content.source_relevance.most_relevant.join(', ')}\n\nReasoning: ${content.source_relevance.reasoning}`;
          }
          case "intention": {
            const content = step.content as IntentionContent;
            return `Explicit Intent: ${content.explicit_intent}\n\nImplicit Intent: ${content.implicit_intent}\n\nConfidence: ${content.confidence}`;
          }
          case "observation": {
            const content = step.content as ObservationContent;
            return `Patterns:\n${content.patterns.map(p => `- ${p}`).join('\n')}\n\nContext Analysis: ${content.context_analysis}\n\nUser State: ${content.user_state}\n\nConfidence: ${content.confidence}`;
          }
          case "update": {
            const content = step.content as UpdateContent;
            return `Loop: ${content.loop}\n\nReasoning: ${content.reasoning}\n\nConfidence: ${content.confidence}\n\nKey Insights:\n${content.key_insights.map(i => `- ${i}`).join('\n')}`;
          }
          case "yield": {
            const content = step.content as YieldContent;
            return `Final Response: ${content.final_response}\n\nKey Points:\n${content.key_points.map(p => `- ${p}`).join('\n')}\n\nConfidence: ${content.confidence}\n\nSynthesis Quality: ${content.synthesis_quality}`;
          }
          default:
            return JSON.stringify(step.content, null, 2);
        }
      }

      // Fallback to empty string if content is undefined or null
      return '';
    } catch (e) {
      console.warn("Failed to parse step content:", e, step);
      return String(step.content || '');
    }
  };

  const StepContent: React.FC<{ step: Step }> = ({ step }) => {
    const content = getStepContent(step);

    return (
      <div className="space-y-4">
        <div className="prose dark:prose-invert">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        {step.step === "experience" && step.state.priors && step.state.priors.length > 0 && (
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
  };

  const currentStepData = steps.find(s => s.step === activeStep);

  return (
    <div className="p-4 bg-base-200 rounded-lg mb-4">
      {/* Main Response */}
      <div className="mb-4">
        <div className="font-semibold text-lg">AI</div>
        <ReactMarkdown>{String(message.content || '')}</ReactMarkdown>
      </div>

      {/* Chorus Cycle Steps */}
      <div className="border-t border-base-300 pt-4">
        {/* Step Navigation */}
        <div className="flex mb-2 overflow-x-auto">
          {chorusSteps.map((step) => {
            const stepData = steps.find(s => s.step === step);
            const isComplete = stepData !== undefined;

            return (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`px-3 py-1 mr-2 rounded-t-lg transition-colors duration-300
                  ${activeStep === step ? "bg-primary text-primary-content" : "bg-base-300 hover:bg-base-100"}
                  ${!isComplete ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!isComplete}
              >
                {step}
              </button>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="p-4 bg-base-100 rounded-lg transition-all duration-500">
          {currentStepData ? (
            <StepContent step={currentStepData} />
          ) : (
            <div className="text-gray-500">No content available for this step</div>
          )}
        </div>
      </div>

      {/* Priors Panel */}
      {priors && priors.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium">All Priors</h3>
          {priors.map((prior) => (
            <PriorCard key={prior.id} prior={prior} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AIResponse;
