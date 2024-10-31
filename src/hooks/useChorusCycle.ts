import { useState, useCallback } from "react";
import { ChorusStep, ChorusState, Prior, Message, Step } from "@/types";
import { useWebSocket } from "./useWebSocket";

export function useChorusCycle() {
  const [currentStep, setCurrentStep] = useState<ChorusStep>("action");
  const [chorusState, setChorusState] = useState<ChorusState>({
    current_step: "action",
  });
  const [steps, setSteps] = useState<Step[]>([]);
  const [priors, setPriors] = useState<Prior[]>([]);
  const { socket } = useWebSocket();

  const processStep = useCallback(
    async (message: Message) => {
      if (!socket) {
        console.error("WebSocket not connected");
        return;
      }

      try {
        // Start the Chorus Cycle
        socket.send(
          JSON.stringify({
            type: "submit_prompt",
            data: {
              content: message.content,
              thread_id: message.thread_id,
            },
          })
        );

        socket.onmessage = (event) => {
          try {
            const response = JSON.parse(event.data);

            if (response.type === "chorus_step") {
              const { step, content, priors: newPriors } = response.data;

              // Update current step
              setCurrentStep(step as ChorusStep);

              // Add new step to history
              setSteps((prevSteps) => [
                ...prevSteps,
                {
                  step: step as ChorusStep,
                  content,
                  state: {
                    status: "complete",
                    content,
                    priors: newPriors,
                  },
                },
              ]);

              // Update priors if provided
              if (newPriors) {
                setPriors(newPriors);
              }

              // Update chorus state
              setChorusState((prev) => ({
                ...prev,
                current_step: step,
                current_response: {
                  content,
                  loop: response.data.loop,
                  reasoning: response.data.reasoning,
                },
              }));

              // Handle transition to yield step
              if (step === "update" && !response.data.loop) {
                setCurrentStep("yield");
              }
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };
      } catch (error) {
        console.error("Error processing step:", error);
        setChorusState((prev) => ({
          ...prev,
          error_state: "Failed to process step",
        }));
      }
    },
    [socket]
  );

  return {
    currentStep,
    chorusState,
    steps,
    priors,
    processStep,
  };
}
