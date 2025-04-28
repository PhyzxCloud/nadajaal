import React, { useState, useEffect } from 'react';
import './styles.css'; // Importing styles

const App = () => {
  const [leftFreq, setLeftFreq] = useState(200);
  const [rightFreq, setRightFreq] = useState(210);
  const [audioContext, setAudioContext] = useState(null);
  const [leftOscillator, setLeftOscillator] = useState(null);
  const [rightOscillator, setRightOscillator] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60); // Timer duration state
  const [ambientSound, setAmbientSound] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Set up AudioContext
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
    }, timerDuration * 1000); // Timer duration used here
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
    }, timerDuration * 1000); // Timer duration used here
  };

  const saveFavorite = () => {
    const newFavorite = { leftFreq, rightFreq };
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleTimerChange = (e) => {
    setTimerDuration(e.target.value);
  };

  const ambientSounds = {
    cosmic: 'path/to/cosmic-sound.mp3',
    rainstorm: 'path/to/rainstorm-sound.mp3',
  };

  const playAmbientSound = () => {
    if (!ambientSound) return;

    const audio = new Audio(ambientSounds[ambientSound]);
    audio.loop = true;
    audio.play();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Nadajaal</h1>
      <div style={styles.frequencyInputs}>
        <label style={styles.label}>Left Frequency: {leftFreq} Hz</label>
        <input
          type="range"
          min="1"
          max="1200"
          value={leftFreq}
          onChange={(e) => setLeftFreq(e.target.value)}
          style={styles.input}
        />
        <label style={styles.label}>Right Frequency: {rightFreq} Hz</label>
        <input
          type="range"
          min="1"
          max="1200"
          value={rightFreq}
          onChange={(e) => setRightFreq(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.timerContainer}>
        <label style={styles.label}>Timer: {timerDuration} seconds</label>
        <input
          type="range"
          min="10"
          max="600"
          value={timerDuration}
          onChange={handleTimerChange}
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
        <button onClick={saveFavorite} style={styles.button}>Save Favorite</button>
      </div>

      <div style={styles.favoritesContainer}>
        <h2>Saved Favorites</h2>
        {favorites.map((favorite, index) => (
          <div key={index}>
            <span>Left: {favorite.leftFreq} Hz, Right: {favorite.rightFreq} Hz</span>
          </div>
        ))}
      </div>

      <div style={styles.ambientSoundContainer}>
        <label style={styles.label}>Ambient Sound:</label>
        <select
          value={ambientSound}
          onChange={(e) => setAmbientSound(e.target.value)}
          style={styles.input}
        >
          <option value="cosmic">Cosmic Sound</option>
          <option value="rainstorm">Rainstorm</option>
        </select>
        <button onClick={playAmbientSound} style={styles.button}>Play Ambient Sound</button>
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
  timerContainer: {
    marginBottom: '20px',
  },
  favoritesContainer: {
    marginTop: '20px',
    color: '#ddd',
  },
  ambientSoundContainer: {
    marginTop: '20px',
  },
};

export default App;
