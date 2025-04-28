// src/utils/audioUtils.js

// Predefined Monaural Programs (single frequency)
export const nadaPrograms = [
  { name: "Bhumi (7.83 Hz)", freq: 7.83, duration: 120, description: "Earth's Vibration", type: "monaural" },
  { name: "Pravaha (174 Hz)", freq: 174, duration: 120, description: "Relieves Pain & Stress", type: "monaural" },
  { name: "Shanta (285 Hz)", freq: 285, duration: 120, description: "Heals Tissues & Organs", type: "monaural" },
  { name: "Arogya (396 Hz)", freq: 396, duration: 120, description: "Eliminates Fear", type: "monaural" },
  { name: "Chapala (417 Hz)", freq: 417, duration: 120, description: "Wipes Out Negativity", type: "monaural" },
  { name: "Maitri (528 Hz)", freq: 528, duration: 120, description: "Repairs DNA, Positive Transformation", type: "monaural" },
  { name: "Samatva (639 Hz)", freq: 639, duration: 120, description: "Brings Love & Compassion", type: "monaural" },
  { name: "Gupta (741 Hz)", freq: 741, duration: 120, description: "Detoxifies Cells", type: "monaural" },
  { name: "Jyoti (852 Hz)", freq: 852, duration: 120, description: "Awakens Intuition", type: "monaural" },
  { name: "Tejas (963 Hz)", freq: 963, duration: 120, description: "Connects to Higher Self", type: "monaural" },
  { name: "Sthira (1071 Hz)", freq: 1071, duration: 120, description: "Consciousness Expansion", type: "monaural" },
  { name: "Ananta (1179 Hz)", freq: 1179, duration: 120, description: "Cosmic Connection", type: "monaural" },
];

// Predefined Binaural Programs (left and right frequency difference)
export const binauralPrograms = [
  { name: "Morning Focus", leftFreq: 200, rightFreq: 210, duration: 120, brainwave: "Alpha (10 Hz)", type: "binaural" },
  { name: "Deep Sleep", leftFreq: 200, rightFreq: 202, duration: 300, brainwave: "Delta (2 Hz)", type: "binaural" },
  { name: "Anxiety Relief", leftFreq: 200, rightFreq: 208, duration: 180, brainwave: "Theta (8 Hz)", type: "binaural" },
  { name: "Energy Boost", leftFreq: 200, rightFreq: 214, duration: 90, brainwave: "Beta (14 Hz)", type: "binaural" },
];

// Background music track URLs
export const backgroundTracks = {
  none: null,
  nature: 'https://assets.mixkit.co/music/preview/mixkit-forest-dawn-1217.mp3', // Forest Ambience
  piano: 'https://assets.mixkit.co/music/preview/mixkit-calm-piano-1215.mp3',  // Calm Piano
  lofi: 'https://assets.mixkit.co/music/preview/mixkit-lofi-hip-hop-1216.mp3',   // Lofi Beat
};
