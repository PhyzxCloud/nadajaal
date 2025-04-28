import React, { useState, useEffect } from 'react';

const App = () => {
  const [leftFreq, setLeftFreq] = useState(200);
  const [rightFreq, setRightFreq] = useState(210);
  const [audioContext, setAudioContext] = useState(null);
  const [leftOscillator, setLeftOscillator] = useState(null);
  const [rightOscillator, setRightOscillator] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
  }, []);

  const playBinauralBeats = () => {
    if (!audioContext) return;

    const left = audioContext.createOscillator();
    left.frequency.setValueAtTime(leftFreq, audioContext.currentTime);
    left.connect(audioContext.destination);

    const right = audioContext.createOscillator();
    right.frequency.setValueAtTime(rightFreq, audioContext.currentTime);
    right.connect(audioContext.destination);

    left.start();
    right.start();

    setLeftOscillator(left);
    setRightOscillator(right);
    setIsPlaying(true);

    setTimeout(() => {
      left.stop();
      right.stop();
      setIsPlaying(false);
    }, 60000); // Stop after 60 seconds
  };

  const pauseBinauralBeats = () => {
    if (leftOscillator && rightOscillator) {
      leftOscillator.stop();
      rightOscillator.stop();
      setIsPlaying(false);
    }
  };

  const resumeBinauralBeats = () => {
    if (!audioContext || isPlaying) return;

    const left = audioContext.createOscillator();
    left.frequency.setValueAtTime(leftFreq, audioContext.currentTime);
    left.connect(audioContext.destination);

    const right = audioContext.createOscillator();
    right.frequency.setValueAtTime(rightFreq, audioContext.currentTime);
    right.connect(audioContext.destination);

    left.start();
    right.start();

    setLeftOscillator(left);
    setRightOscillator(right);
    setIsPlaying(true);

    setTimeout(() => {
      left.stop();
      right.stop();
      setIsPlaying(false);
    }, 60000); // Stop after 60 seconds
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nadajaal</h1>
      <div style={styles.frequencyInputs}>
        <label style={styles.label}>Left Frequency: {leftFreq} Hz</label>
        <input
          type="range"
          min="100"
          max="1000"
          value={leftFreq}
          onChange={(e) => setLeftFreq(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Right Frequency: {rightFreq} Hz</label>
        <input
          type="range"
          min="100"
          max="1000"
          value={rightFreq}
          onChange={(e) => setRightFreq(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.buttonContainer}>
        <button
          onClick={isPlaying ? pauseBinauralBeats : playBinauralBeats}
          style={styles.button}
        >
          {isPlaying ? 'Pause' : 'Play'} Binaural Beats
        </button>
        {isPlaying && (
          <button onClick={resumeBinauralBeats} style={styles.button}>
            Resume
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  frequencyInputs: {
    marginBottom: '20px',
  },
  label: {
    margin: '5px',
    fontSize: '1.2rem',
  },
  input: {
    width: '200px',
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '15px 30px',
    backgroundColor: '#1c1c1c',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '5px',
    fontSize: '1rem',
  },
};

export default App;
