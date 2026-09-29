import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export type AmbientSoundMode = 'off' | 'solfeggio432' | 'solfeggio528' | 'brownNoise';

interface AudioContextType {
  currentSound: AmbientSoundMode;
  isPlaying: boolean;
  volume: number;
  toggleSound: (sound: AmbientSoundMode) => void;
  setVolume: (v: number) => void;
  stopSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSound, setCurrentSound] = useState<AmbientSoundMode>('off');
  const [volume, setVolumeState] = useState<number>(0.25);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<any[]>([]);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.gain.value = volume;
        gainNodeRef.current.connect(audioCtxRef.current.destination);
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopSound = () => {
    activeNodesRef.current.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch {}
    });
    activeNodesRef.current = [];
    setCurrentSound('off');
  };

  const startTone = (frequency: number) => {
    stopSound();
    initAudio();
    if (!audioCtxRef.current || !gainNodeRef.current) return;

    const ctx = audioCtxRef.current;
    
    // Fundamental oscillator
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Subtle second harmonic for warm richness
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 2, ctx.currentTime);
    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.12, ctx.currentTime);
    osc2.connect(osc2Gain);

    // Warm low-pass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    osc1.connect(filter);
    osc2Gain.connect(filter);
    filter.connect(gainNodeRef.current);

    osc1.start();
    osc2.start();

    activeNodesRef.current = [osc1, osc2, osc2Gain, filter];
  };

  const startBrownNoise = () => {
    stopSound();
    initAudio();
    if (!audioCtxRef.current || !gainNodeRef.current) return;

    const ctx = audioCtxRef.current;
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain compensation
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);

    noise.connect(filter);
    filter.connect(gainNodeRef.current);
    noise.start();

    activeNodesRef.current = [noise, filter];
  };

  const toggleSound = (sound: AmbientSoundMode) => {
    if (currentSound === sound) {
      stopSound();
    } else {
      if (sound === 'solfeggio432') {
        startTone(432);
        setCurrentSound('solfeggio432');
      } else if (sound === 'solfeggio528') {
        startTone(528);
        setCurrentSound('solfeggio528');
      } else if (sound === 'brownNoise') {
        startBrownNoise();
        setCurrentSound('brownNoise');
      } else {
        stopSound();
      }
    }
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(v, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        currentSound,
        isPlaying: currentSound !== 'off',
        volume,
        toggleSound,
        setVolume,
        stopSound
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
