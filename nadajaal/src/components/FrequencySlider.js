// src/components/FrequencySlider.js
import React from 'react';

const FrequencySlider = ({ label, value, onChange }) => (
  <div style={styles.sliderContainer}>
    <label style={styles.label}>{label}: {value} Hz</label>
    <input
      type="range"
      min="100"
      max="1000"
      value={value}
      onChange={onChange}
      style={styles.slider}
    />
  </div>
);

const styles = {
  sliderContainer: {
    marginBottom: '20px',
  },
  label: {
    margin: '5px',
    fontSize: '1.2rem',
  },
  slider: {
    width: '200px',
    marginBottom: '10px',
  },
};

export default FrequencySlider;
