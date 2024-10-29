import React, { useState, useEffect } from 'react';

interface Thread {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp: Date;
}

const ThreadList: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch threads
    setTimeout(() => {
      const mockThreads: Thread[] = [
        { id: '1', name: 'General Discussion', lastMessage: 'Hello everyone!', timestamp: new Date() },
        { id: '2', name: 'Tech Support', lastMessage: 'How do I update my software?', timestamp: new Date(Date.now() - 86400000) },
        { id: '3', name: 'Random Chat', lastMessage: 'Did you see that ludicrous display last night?', timestamp: new Date(Date.now() - 172800000) },
      ];
      setThreads(mockThreads);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleNewChat = () => {
    const newThread: Thread = {
      id: (threads.length + 1).toString(),
      name: `New Chat ${threads.length + 1}`,
      timestamp: new Date(),
    };
    setThreads([newThread, ...threads]);
    setSelectedThread(newThread.id);
  };

  return (
    <div className="h-full flex flex-col bg-base-200 p-4">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <button
        onClick={handleNewChat}
        className="btn btn-primary mb-4"
      >
        New Chat
      </button>
      {isLoading ? (
        <div className="flex justify-center items-center flex-grow">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-y-auto flex-grow">
          {threads.map((thread) => (
            <div
              key={thread.id}
              className={`p-2 mb-2 rounded cursor-pointer ${
                selectedThread === thread.id ? 'bg-base-300' : 'hover:bg-base-300'
              }`}
              onClick={() => setSelectedThread(thread.id)}
            >
              <div className="font-semibold">{thread.name}</div>
              {thread.lastMessage && (
                <div className="text-sm text-gray-500 truncate">{thread.lastMessage}</div>
              )}
              <div className="text-xs text-gray-400">
                {thread.timestamp.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreadList;
