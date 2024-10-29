// src/components/ChoirChat/ChoirChat.tsx

import React, { useState, useRef } from "react";
import MessageFlow from "./MessageFlow";
import UserInput from "../UserInput/UserInput";
import { useThread, Message } from "@/hooks/useThread";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useChorusCycle } from "@/hooks/useChorusCycle";

const ChoirChat: React.FC = () => {
  const { threadState, addMessage } = useThread();
  const { sendMessage } = useWebSocket();
  const { processStep } = useChorusCycle();
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleNewMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      author: "User",
      timestamp: new Date(),
    };
    addMessage(newMessage);
    sendMessage(newMessage);
    processStep(newMessage);
  };

  const handleMessageSelect = (messageId: string) => {
    setSelectedMessageId(messageId);
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-grow overflow-y-auto p-4 bg-base-100"
        ref={chatContainerRef}
      >
        <MessageFlow
          messages={threadState.messages}
          onMessageSelect={handleMessageSelect}
          selectedMessageId={selectedMessageId}
        />
      </div>
      <div className="p-4 bg-base-300 border-t border-base-300">
        <UserInput onSubmit={handleNewMessage} />
      </div>
    </div>
  );
};

export default ChoirChat;
