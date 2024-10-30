import React from 'react';
import ChorusStep from './ChorusStep';
import { Step, Source } from '../types';

interface ChorusPanelProps {
  steps?: Step[];
  sources: Source[];
  sortOption: string;
  onSortChange: (option: string) => void;
}

const ChorusPanel: React.FC<ChorusPanelProps> = ({ steps = [], sources, sortOption, onSortChange }) => {
  return (
    <div className="p-4">
      {steps.map((step, index) => (
        <ChorusStep
          key={index}
          step={step.step}
          content={step.content}
          isExperience={step.step === 'experience'}
          sources={sources}
          sortOption={sortOption}
          onSortChange={onSortChange}
        />
      ))}
    </div>
  );
};

export default ChorusPanel;
