import React from 'react';

const ProgressBar = ({ current, target, color = 'var(--accent-color)', label }) => {
  const percentage = Math.min(100, Math.max(0, (current / target) * 100));

  return (
    <div className="mb-4">
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span>{label}</span>
          <span className="font-bold">{current} / {target}</span>
        </div>
      )}
      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
