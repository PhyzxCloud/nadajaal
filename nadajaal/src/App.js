// src/App.js
import React from 'react';
import BinauralBeats from './components/BinauralBeats';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-serif flex items-center justify-center p-4" style={{ fontFamily: 'EB Garamond, serif' }}>
      <BinauralBeats />
    </div>
  );
};

export default App;
