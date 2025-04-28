// src/components/ProgramCard.js
import React from 'react';

const ProgramCard = ({ program, onSelect, disabled }) => {
  return (
    <div
      onClick={!disabled ? onSelect : null}
      className={`p-4 m-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <h3 className="text-lg font-semibold">{program.name}</h3>
      <p className="text-sm text-gray-300">
        {program.description || program.brainwave}
      </p>
    </div>
  );
};

export default ProgramCard;
