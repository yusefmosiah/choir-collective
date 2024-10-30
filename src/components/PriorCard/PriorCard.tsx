import React from 'react';
import { Prior } from '@/types';

interface PriorCardProps {
  prior: Prior;
}

const PriorCard: React.FC<PriorCardProps> = ({ prior }) => {
  return (
    <div className="p-3 bg-base-300 rounded-lg">
      <div className="text-sm">{prior.content}</div>
      <div className="text-xs text-base-content/60 mt-2">
        Similarity: {(prior.similarity * 100).toFixed(1)}%
      </div>
    </div>
  );
};

export default PriorCard;
