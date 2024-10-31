// src/components/ChoirChat/ChoirChat.tsx

import React, { useState, useRef } from "react";
import MessageFlow from "./MessageFlow";
import UserInput from "../UserInput/UserInput";
import { useThread } from "@/hooks/useThread";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useChorusCycle } from "@/hooks/useChorusCycle";
import ThreadList from "../ThreadList/ThreadList";
import PriorPanel from "../PriorPanel/PriorPanel";
import { WebSocketMessage, Message } from "@/types";

const ChoirChat: React.FC = () => {
  const { threadState, addMessage } = useThread();
  const { sendMessage } = useWebSocket();
  const { currentStep } = useChorusCycle();
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleNewMessage = (content: string) => {
    const message: Message = {
      id: crypto.randomUUID(),
      content,
      author: "user",
      timestamp: Date.now(),
      thread_id: threadState.currentThread || "",
    };
    addMessage(message);

    const wsMessage: WebSocketMessage = {
      type: "submit_prompt",
      data: {
        message_id: message.id,
        content: content,
        thread_id: threadState.currentThread || "default",
      },
    };
    sendMessage(wsMessage);
  };

  return (
    <div className="flex w-full h-full">
      {/* Left Column - Thread List */}
      <div className="w-64 min-w-64 bg-base-200 border-r border-base-300">
        <ThreadList />
      </div>

      {/* Center Column - Chat Messages with inline Chorus Cycle */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <div className="h-full overflow-y-auto p-4 pb-32" ref={chatContainerRef}>
          <MessageFlow
            messages={threadState.messages}
            onMessageSelect={setSelectedMessageId}
            selectedMessageId={selectedMessageId}
            currentStep={currentStep}
          />
        </div>
        <div className="fixed bottom-0 left-64 right-80 bg-base-100 border-t border-base-300 z-10">
          <UserInput onSubmit={handleNewMessage} />
        </div>
      </div>

      {/* Right Column - Prior Citations */}
      <div className="w-80 min-w-80 bg-base-200 border-l border-base-300">
        <PriorPanel />
      </div>
    </div>
  );
};

export default ChoirChat;
