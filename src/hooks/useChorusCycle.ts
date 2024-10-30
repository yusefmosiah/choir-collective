import { useState, useCallback } from "react";
import { ChorusStep, ChorusState, Prior, Message } from "@/types";
import { useWebSocket } from "./useWebSocket";

export function useChorusCycle() {
  const [currentStep, setCurrentStep] = useState<ChorusStep>("action");
  const [chorusState, setChorusState] = useState<ChorusState>({
    current_step: "action"
  });
  const [priors, setPriors] = useState<Prior[]>([]);
  const { socket } = useWebSocket();

  const processStep = useCallback(
    async (message: Message) => {
      if (!socket) return;

      try {
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

          if (response.type === "chorus_response") {
            const { step, content, priors: newPriors } = response.data;

            setCurrentStep(step as ChorusStep);

            setChorusState((prev: ChorusState) => ({
              ...prev,
              current_step: step,
              current_response: {
                content,
                loop: response.data.loop,
                reasoning: response.data.reasoning,
              },
            }));

            if (newPriors) {
              setPriors(newPriors);
            }

            if (step === "update") {
              if (response.data.loop) {
                setCurrentStep("action");
              } else {
                setCurrentStep("yield");
              }
            }
          }
        };
      } catch (error) {
        console.error("Error processing step:", error);
      }
    },
    [socket]
  );

  const updateChorusState = useCallback((newState: Partial<ChorusState>) => {
    setChorusState((prev: ChorusState) => ({ ...prev, ...newState }));
  }, []);

  return {
    currentStep,
    chorusState,
    priors,
    processStep,
    updateChorusState,
  };
}
