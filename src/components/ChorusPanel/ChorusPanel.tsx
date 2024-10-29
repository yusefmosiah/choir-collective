import React from 'react';
import { useChorusCycle } from '@/hooks/useChorusCycle';

const ChorusPanel: React.FC = () => {
  const { currentStep, chorusState, processStep } = useChorusCycle();

  const handleProcessStep = () => {
    processStep({}); // Pass any necessary input here
  };

  return (
    <div className="bg-gray-100 p-4 border-t">
      <h2 className="font-bold mb-2">Chorus Cycle</h2>
      <p className="text-sm text-gray-600 mb-2">Current Step: {currentStep}</p>
      <button
        onClick={handleProcessStep}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Process Step
      </button>
      <div className="mt-4">
        <h3 className="font-bold mb-1">Chorus State:</h3>
        <pre className="text-xs bg-white p-2 rounded">{JSON.stringify(chorusState, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ChorusPanel;
