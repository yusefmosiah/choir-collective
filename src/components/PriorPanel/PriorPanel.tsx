import React from 'react';
import { Prior } from '@/types';

interface PriorPanelProps {
  priors?: Prior[];
}

const PriorPanel: React.FC<PriorPanelProps> = ({ priors = [] }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h2 className="text-lg font-bold mb-4">Prior Citations</h2>
      <div className="space-y-4">
        {priors.length === 0 ? (
          <div className="text-base-content/60 text-center">
            No prior citations available
          </div>
        ) : (
          priors.map((prior) => (
            <div
              key={prior.id}
              className="p-3 bg-base-100 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="text-sm">{prior.content}</div>
              <div className="mt-2 text-xs text-base-content/60 flex justify-between">
                <span>Similarity: {(prior.similarity * 100).toFixed(1)}%</span>
                <span>{new Date(prior.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PriorPanel;
