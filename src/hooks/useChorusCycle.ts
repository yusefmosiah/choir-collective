import { useState, useCallback, useEffect } from "react";
import {
  ChorusStep,
  ChorusState,
  Prior,
  Message,
  Step,
  WebSocketMessage,
  ActionContent,
  ExperienceContent,
  IntentionContent,
  ObservationContent,
  UpdateContent,
  YieldContent,
} from "@/types";
import { useWebSocket } from "./useWebSocket";
import { useThread } from "./useThread";

export function useChorusCycle() {
  const [currentStep, setCurrentStep] = useState<ChorusStep>("action");
  const [chorusState, setChorusState] = useState<ChorusState>({
    current_step: "action",
  });
  const [steps, setSteps] = useState<Step[]>([]);
  const [priors, setPriors] = useState<Prior[]>([]);
  const { socket, sendMessage } = useWebSocket();
  const { updateAIMessage } = useThread();

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const response = JSON.parse(event.data) as WebSocketMessage;
        console.log("Received WebSocket message:", response);

        // Handle both chorus_step and chorus_response message types
        if (response.type === "chorus_step" || response.type === "chorus_response") {
          const { step, content = "", priors: newPriors } = response.data;

          if (!step) {
            console.error("Missing step in response:", response);
            return;
          }

          // Parse content based on step type
          let parsedContent = content;
          if (typeof content === 'object' && content !== null) {
            switch (step) {
              case "action":
                parsedContent = (content as ActionContent).proposed_response;
                break;
              case "experience":
                parsedContent = (content as ExperienceContent).synthesis;
                break;
              case "intention":
                const intentContent = content as IntentionContent;
                parsedContent = `Explicit: ${intentContent.explicit_intent}\nImplicit: ${intentContent.implicit_intent}`;
                break;
              case "observation":
                parsedContent = (content as ObservationContent).context_analysis;
                break;
              case "update":
                parsedContent = (content as UpdateContent).reasoning;
                break;
              case "yield":
                parsedContent = (content as YieldContent).final_response;
                // Update AI message when we get the final response
                updateAIMessage((content as YieldContent).final_response);
                break;
            }
          } else if (typeof content === 'string') {
            try {
              const contentObj = JSON.parse(content);
              switch (step) {
                case "action":
                  parsedContent = contentObj.proposed_response || content;
                  break;
                case "experience":
                  parsedContent = contentObj.synthesis || content;
                  break;
                case "intention":
                  parsedContent = `Explicit: ${contentObj.explicit_intent}\nImplicit: ${contentObj.implicit_intent}`;
                  break;
                case "observation":
                  parsedContent = contentObj.context_analysis || content;
                  break;
                case "update":
                  parsedContent = contentObj.reasoning || content;
                  break;
                case "yield":
                  parsedContent = contentObj.final_response || content;
                  // Update AI message when we get the final response
                  updateAIMessage(contentObj.final_response || content);
                  break;
              }
            } catch (e) {
              console.warn("Failed to parse step content:", e);
            }
          }

          // Create new step
          const newStep: Step = {
            step: step as ChorusStep,
            content: parsedContent || content || "",
            state: {
              status: "complete",
              content: parsedContent || content || "",
              priors: newPriors,
            },
          };

          // Update steps atomically
          setSteps((prevSteps) => {
            const stepExists = prevSteps.some((s) => s.step === step);
            if (stepExists) {
              return prevSteps.map((s) => (s.step === step ? newStep : s));
            }
            return [...prevSteps, newStep];
          });

          // Update current step
          setCurrentStep(step as ChorusStep);

          // Update priors if in EXPERIENCE step
          if (step === "experience" && newPriors) {
            setPriors(newPriors);
          }

          // Update chorus state
          setChorusState((prev) => ({
            ...prev,
            current_step: step,
            current_response: {
              content: parsedContent || content || "",
              loop: response.data.loop,
              reasoning: response.data.reasoning,
            },
          }));

          // Handle transition to yield step
          if (step === "update" && response.data.loop === false) {
            setCurrentStep("yield");
          }

          // Debug log state updates
          console.log("State updated:", {
            step,
            content: parsedContent,
            steps: newStep,
            currentStep: step,
            chorusState: {
              current_step: step,
              current_response: {
                content: parsedContent || content || "",
                loop: response.data.loop,
                reasoning: response.data.reasoning,
              },
            },
          });
        }
      } catch (error) {
        console.error("Error handling WebSocket message:", error);
        setChorusState((prev) => ({
          ...prev,
          error_state: "Failed to process message",
        }));
      }
    };

    socket.addEventListener("message", handleMessage);
    return () => socket.removeEventListener("message", handleMessage);
  }, [socket, updateAIMessage]);

  const processStep = useCallback(
    async (message: Message) => {
      if (!socket) {
        console.error("WebSocket not connected");
        return;
      }

      try {
        console.log("Starting new cycle with message:", message);

        // Reset state for new cycle
        setSteps([]);
        setPriors([]);
        setCurrentStep("action");
        setChorusState({
          current_step: "action",
        });

        // Start the Chorus Cycle
        const wsMessage: WebSocketMessage = {
          type: "submit_prompt",
          data: {
            message_id: message.id,
            content: message.content,
            thread_id: message.thread_id,
          },
        };

        sendMessage(wsMessage);
      } catch (error) {
        console.error("Error processing step:", error);
        setChorusState((prev) => ({
          ...prev,
          error_state: "Failed to process step",
        }));
      }
    },
    [socket, sendMessage]
  );

  return {
    currentStep,
    chorusState,
    steps,
    priors,
    processStep,
  };
}
