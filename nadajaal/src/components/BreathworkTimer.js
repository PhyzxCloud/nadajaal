// src/components/BreathworkTimer.js
import React, { useState, useEffect } from 'react';

const BreathworkTimer = ({ duration }) => {
  const [phase, setPhase] = useState('Inhale');
  const [progress, setProgress] = useState(0);

  const inhaleTime = 4000; // 4 seconds
  const exhaleTime = 6000; // 6 seconds
  const totalCycle = inhaleTime + exhaleTime;

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() % totalCycle;
      setProgress((elapsed / totalCycle) * 100);
      setPhase(elapsed < inhaleTime ? 'Inhale' : 'Exhale');
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
      <div className="text-4xl font-semibold text-[#FFA500] mb-2">{phase}</div>
      <div
        className="w-32 h-32 rounded-full bg-[#E6E6FA] flex items-center justify-center mx-auto"
        style={{ background: `conic-gradient(#87CEEB ${progress}%, #8A2BE2 0%)` }}
      >
        <span className="text-lg text-white">{Math.ceil((totalCycle - (Date.now() % totalCycle)) / 1000)}s</span>
      </div>
    </div>
  );
};

export default BreathworkTimer;
