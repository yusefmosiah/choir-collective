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
      if (!socket) return;

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
          const response = JSON.parse(event.data);

          if (response.type === "chorus_step") {
            const { step, content, priors: newPriors } = response.data;

            setCurrentStep(step as ChorusStep);
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

            if (newPriors) {
              setPriors(newPriors);
            }

            setChorusState((prev) => ({
              ...prev,
              current_step: step,
              current_response: {
                content,
                loop: response.data.loop,
                reasoning: response.data.reasoning,
              },
            }));

            if (step === "update" && !response.data.loop) {
              setCurrentStep("yield");
            }
          }
        };
      } catch (error) {
        console.error("Error processing step:", error);
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
