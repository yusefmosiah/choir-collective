import { useState, useCallback, useEffect } from "react";
import {
  ChorusStep,
  ChorusState,
  Step,
  Prior,
  Message,
  WebSocketMessage,
} from "@/types";
import { useWebSocket } from "./useWebSocket";

export function useChorusCycle() {
  // Track steps per message
  const [messageSteps, setMessageSteps] = useState<Record<string, Step[]>>({});
  const [currentStep, setCurrentStep] = useState<ChorusStep>("action");
  const [priors, setPriors] = useState<Prior[]>([]);
  const [chorusState, setChorusState] = useState<ChorusState>({
    current_step: "action",
    current_response: undefined,
  });
  const { socket } = useWebSocket();

  // Handle chorus response events
  useEffect(() => {
    const handleChorusResponse = (event: CustomEvent) => {
      const response = event.detail;
      const { step, content, priors: newPriors } = response.data;
      const messageId = response.data.message_id;

      if (!messageId) {
        console.error("No message ID in response");
        return;
      }

      // Update chorus state
      setChorusState({
        current_step: step as ChorusStep,
        current_response: {
          content: content || "",
          loop: response.data.loop,
          reasoning: response.data.reasoning,
        },
      });

      // Create new step
      const newStep: Step = {
        step: step as ChorusStep,
        content: content || "",
        state: {
          status: "complete",
          content: content || "",
          priors: newPriors,
        },
      };

      // Update steps for this specific message
      setMessageSteps((prev) => ({
        ...prev,
        [messageId as string]: [...(prev[messageId as string] || []), newStep],
      }));

      // Update current step
      setCurrentStep(step as ChorusStep);

      // Update priors if in EXPERIENCE step
      if (step === "experience" && newPriors) {
        setPriors(newPriors);
      }
    };

    window.addEventListener(
      "chorus_response",
      handleChorusResponse as EventListener
    );

    return () => {
      window.removeEventListener(
        "chorus_response",
        handleChorusResponse as EventListener
      );
    };
  }, []);

  // Handle errors
  useEffect(() => {
    const handleError = (event: CustomEvent) => {
      console.error("Chorus cycle error:", event.detail.message);
      // Optionally update UI state to show error
      setChorusState((prev) => ({
        ...prev,
        current_step: "action", // Reset to initial state
        current_response: {
          content: `Error: ${event.detail.message}`,
          loop: false,
          reasoning: "An error occurred",
        },
      }));
    };

    window.addEventListener("websocket_error", handleError as EventListener);

    return () => {
      window.removeEventListener(
        "websocket_error",
        handleError as EventListener
      );
    };
  }, []);

  const processStep = useCallback(
    async (message: Message) => {
      if (!socket) {
        console.error("WebSocket not connected");
        return;
      }

      if (!message.id) {
        console.error("Message has no ID");
        return;
      }

      // Reset state for new message
      setMessageSteps((prev) => ({
        ...prev,
        [message.id as string]: [],
      }));
      setPriors([]);
      setCurrentStep("action");

      // Start the Chorus Cycle
      const wsMessage: WebSocketMessage = {
        type: "submit_prompt",
        data: {
          message_id: message.id,
          content: message.content,
          thread_id: message.thread_id,
        },
      };

      socket.send(JSON.stringify(wsMessage));
    },
    [socket]
  );

  // Get steps for a specific message
  const getStepsForMessage = useCallback(
    (messageId?: string) => {
      if (!messageId) return [];
      return messageSteps[messageId] || [];
    },
    [messageSteps]
  );

  return {
    currentStep,
    getStepsForMessage,
    priors,
    processStep,
    chorusState,
  };
}
