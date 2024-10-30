import React from "react";
import { useChorusCycle } from "@/hooks/useChorusCycle";
import PriorPanel from "../PriorPanel/PriorPanel";

const ChorusPanel: React.FC = () => {
  const { currentStep, chorusState, priors } = useChorusCycle();
  const steps = [
    "action",
    "experience",
    "intention",
    "observation",
    "update",
    "yield",
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-base-300">
        <h2 className="text-lg font-bold mb-4">Chorus Cycle</h2>
        {/* Step Progress */}
        <div className="flex flex-col gap-2">
          {steps.map((step) => (
            <div
              key={step}
              className={`p-2 rounded-lg ${
                currentStep === step
                  ? "bg-primary text-primary-content"
                  : "bg-base-100"
              }`}
            >
              <div className="font-medium capitalize">{step}</div>
              {currentStep === step && chorusState?.current_response && (
                <div className="text-sm mt-1 opacity-80">
                  {chorusState.current_response.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Loop/Halt Status */}
        {chorusState?.current_step === "update" &&
          chorusState?.current_response && (
            <div className="mt-4 p-3 bg-base-100 rounded-lg">
              <div className="font-medium">
                Decision: {chorusState.current_response.loop ? "Loop" : "Halt"}
              </div>
              <div className="text-sm mt-1 opacity-80">
                {chorusState.current_response.reasoning}
              </div>
            </div>
          )}
      </div>

      {/* Prior Citations Panel */}
      <div className="flex-1 overflow-hidden">
        <PriorPanel priors={priors} />
      </div>
    </div>
  );
};

export default ChorusPanel;
