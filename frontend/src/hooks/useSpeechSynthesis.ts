import { useRef, useCallback, useState, useEffect } from 'react';

interface UseSpeechSynthesisReturn {
  speak: (text: string, rate?: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  currentRate: number;
}

export function useSpeechSynthesis(): UseSpeechSynthesisReturn {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentRate, setCurrentRate] = useState(1);
  const onEndRef = useRef<(() => void) | null>(null);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  }, [isSupported]);

  const speak = useCallback((text: string, rate = 1) => {
    if (!isSupported) return;
    window.speechSynthesis.cancel(); // Stop any current speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utteranceRef.current = utterance;
    setCurrentRate(rate);
    setIsPlaying(true);
    setIsPaused(false);

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      onEndRef.current?.();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported]);

  const pause = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported]);

  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  return { speak, pause, resume, stop, isPlaying, isPaused, isSupported, currentRate };
}
