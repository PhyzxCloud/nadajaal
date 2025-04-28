// src/components/BinauralBeats.js
import React, { useState, useEffect } from 'react';
import ProgramCard from './ProgramCard';
import BreathworkTimer from './BreathworkTimer';
import { nadaPrograms, binauralPrograms, backgroundTracks } from '../utils/audioUtils';

const BinauralBeats = () => {
  const [leftFreq, setLeftFreq] = useState(200);
  const [rightFreq, setRightFreq] = useState(210);
  const [duration, setDuration] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [context, setContext] = useState(null);
  const [oscillatorLeft, setOscillatorLeft] = useState(null);
  const [oscillatorRight, setOscillatorRight] = useState(null);
  const [backgroundMusic, setBackgroundMusic] = useState('none');
  const [bgMusicVolume, setBgMusicVolume] = useState(0.3);
  const [bgMusicNode, setBgMusicNode] = useState(null);
  const [showBreathwork, setShowBreathwork] = useState(false);

  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setContext(audioCtx);
    return () => audioCtx.close();
  }, []);

  const handleStart = async () => {
    if (!context) return;
    await context.resume();
    setIsPlaying(true);

    const oscLeft = context.createOscillator();
    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(leftFreq, context.currentTime);
    const panLeft = context.createStereoPanner();
    panLeft.pan.value = -1;
    oscLeft.connect(panLeft).connect(context.destination);

    const oscRight = context.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(rightFreq, context.currentTime);
    const panRight = context.createStereoPanner();
    panRight.pan.value = 1;
    oscRight.connect(panRight).connect(context.destination);

    oscLeft.start();
    oscRight.start();

    setOscillatorLeft(oscLeft);
    setOscillatorRight(oscRight);

    if (backgroundMusic !== 'none') {
      const audio = new Audio(backgroundTracks[backgroundMusic]);
      const source = context.createMediaElementSource(audio);
      const gainNode = context.createGain();
      gainNode.gain.value = bgMusicVolume;
      source.connect(gainNode).connect(context.destination);
      audio.loop = true;
      await audio.play();
      setBgMusicNode({ audio, gainNode });
    }

    setTimeout(() => handleStop(), duration * 1000);
  };

  const handleStop = () => {
    if (oscillatorLeft && oscillatorRight) {
      oscillatorLeft.stop();
      oscillatorRight.stop();
    }
    if (bgMusicNode) {
      bgMusicNode.audio.pause();
      bgMusicNode.audio.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const selectProgram = (program) => {
    if (program.type === 'monaural') {
      setLeftFreq(program.freq);
      setRightFreq(program.freq);
      setDuration(program.duration);
    } else if (program.type === 'binaural') {
      setLeftFreq(program.leftFreq);
      setRightFreq(program.rightFreq);
      setDuration(program.duration);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-4 bg-gray-800 rounded-lg">
      <h1 className="text-3xl font-semibold mb-4 text-center">Nādajaal</h1>

      <h2 className="text-xl font-semibold mb-2">Basics</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {nadaPrograms.map((program) => (
          <ProgramCard key={program.name} program={program} onSelect={() => selectProgram(program)} disabled={isPlaying} />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Binaural</h2>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {binauralPrograms.map((program) => (
          <ProgramCard key={program.name} program={program} onSelect={() => selectProgram(program)} disabled={isPlaying} />
        ))}
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Background Music</label>
        <select
          value={backgroundMusic}
          onChange={(e) => setBackgroundMusic(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
          disabled={isPlaying}
        >
          <option value="none">None</option>
          <option value="nature">Nature Sounds</option>
          <option value="piano">Soft Piano</option>
          <option value="lofi">Lofi Chill</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Left Ear Frequency (Hz)</label>
        <input
          type="range"
          min="1"
          max="2000"
          value={leftFreq}
          onChange={(e) => setLeftFreq(Number(e.target.value))}
          className="w-full"
          disabled={isPlaying}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Right Ear Frequency (Hz)</label>
        <input
          type="range"
          min="1"
          max="2000"
          value={rightFreq}
          onChange={(e) => setRightFreq(Number(e.target.value))}
          className="w-full"
          disabled={isPlaying}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm">Duration (seconds)</label>
        <input
          type="number"
          min="10"
          max="600"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-700"
          disabled={isPlaying}
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={showBreathwork}
          onChange={() => setShowBreathwork(!showBreathwork)}
          className="mr-2"
        />
        <label className="text-sm">Show Breathwork Timer</label>
      </div>

      {showBreathwork && isPlaying && <BreathworkTimer duration={duration} />}

      <button
        onClick={isPlaying ? handleStop : handleStart}
        className={`w-full p-3 rounded ${isPlaying ? 'bg-red-500' : 'bg-green-500'} hover:opacity-90`}
      >
        {isPlaying ? 'Stop' : 'Play'}
      </button>
    </div>
  );
};

export default BinauralBeats;
