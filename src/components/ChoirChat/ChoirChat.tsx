// src/components/ChoirChat/ChoirChat.tsx

import React, { useState, useRef } from "react";
import MessageFlow from "./MessageFlow";
import UserInput from "../UserInput/UserInput";
import { useThread } from "@/hooks/useThread";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useChorusCycle } from "@/hooks/useChorusCycle";
import ThreadList from "../ThreadList/ThreadList";
import PriorPanel from "../PriorPanel/PriorPanel";
import { WebSocketMessage } from "@/types";

const ChoirChat: React.FC = () => {
  const { threadState, addMessage } = useThread();
  const { sendMessage } = useWebSocket();
  const { currentStep } = useChorusCycle();
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleNewMessage = (content: string) => {
    const messageId = Date.now().toString();
    const newMessage = {
      id: messageId,
      content,
      author: "User",
      timestamp: new Date(),
      thread_id: threadState.currentThread?.id || "default",
    };
    addMessage(newMessage);

    const wsMessage: WebSocketMessage = {
      type: "submit_prompt",
      data: {
        message_id: messageId,
        content: content,
        thread_id: threadState.currentThread?.id || "default",
      },
    };
    sendMessage(wsMessage);
  };

  return (
    <div className="flex w-full">
      {/* Left Column - Thread List */}
      <div className="w-64 min-w-64 bg-base-200 border-r border-base-300">
        <ThreadList />
      </div>

      {/* Center Column - Chat Messages with inline Chorus Cycle */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-grow overflow-y-auto p-4" ref={chatContainerRef}>
          <MessageFlow
            messages={threadState.messages}
            onMessageSelect={setSelectedMessageId}
            selectedMessageId={selectedMessageId}
            currentStep={currentStep}
          />
        </div>
        <div className="p-4 bg-base-300">
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
