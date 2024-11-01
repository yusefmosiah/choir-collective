import React, { useState } from "react";
import { useThread } from "@/hooks/useThread";
import { WalletButton } from "../solana/solana-provider";

const ThreadList: React.FC = () => {
  const { threadState, setCurrentThread, isWalletConnected } = useThread();
  const [isLoading, setIsLoading] = useState(false);

  const handleNewChat = () => {
    const newThread = {
      id: crypto.randomUUID(),
      name: `New Chat`,
      timestamp: new Date(),
    };
    setCurrentThread(newThread.id);
  };

  if (!isWalletConnected) {
    return (
      <div className="h-full flex flex-col bg-base-200 p-4">
        <h2 className="text-xl font-bold mb-4">Connect Wallet</h2>
        <div className="flex-grow flex items-center justify-center">
          <WalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-base-200 p-4">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <button onClick={handleNewChat} className="btn btn-primary mb-4">
        New Chat
      </button>
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-y-auto flex-grow">
          {threadState.threads?.map((thread) => (
            <div
              key={thread.id}
              className={`p-2 mb-2 rounded cursor-pointer ${
                threadState.currentThread === thread.id
                  ? "bg-base-300"
                  : "hover:bg-base-300"
              }`}
              onClick={() => setCurrentThread(thread.id)}
            >
              <div className="font-semibold">{thread.name}</div>
              {thread.lastMessage && (
                <div className="text-sm text-gray-500 truncate">
                  {thread.lastMessage}
                </div>
              )}
              <div className="text-xs text-gray-400">
                {new Date(thread.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadList;
