// src/components/ChoirChat/ChoirChat.tsx

'use client';

import { FC, useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useSolana } from '@/hooks/useSolana';
import MessageFlow from './MessageFlow';
import ThreadList from '../ThreadList/ThreadList';
import PriorPanel from '../PriorPanel/PriorPanel';
import { useThread } from '@/hooks/useThread';

export const ChoirChat: FC = () => {
  const { isConnected, getBalance } = useSolana();
  const { threadState } = useThread();
  const [balance, setBalance] = useState<number>(0);

  // Poll wallet balance
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(async () => {
        const newBalance = await getBalance();
        setBalance(newBalance);
      }, 10000);

      // Initial balance check
      getBalance().then(setBalance);

      return () => clearInterval(interval);
    }
  }, [isConnected, getBalance]);

  return (
    <div className="flex h-screen">
      <div className="fixed top-4 right-4 z-10 flex flex-col gap-2">
        <WalletMultiButton />
        {isConnected && (
          <div className="text-sm text-right">
            Balance: {balance} SOL
          </div>
        )}
      </div>

      {isConnected ? (
        <>
          <ThreadList />
          <MessageFlow
            messages={threadState.messages}
            currentStep={threadState.current_step}
            getStepsForMessage={() => []}
            priors={[]}
          />
          <PriorPanel />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          Please connect your wallet to continue
        </div>
      )}
    </div>
  );
};

export default ChoirChat;
