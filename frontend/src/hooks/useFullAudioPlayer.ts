import { useState, useRef, useCallback, useEffect } from 'react';

interface UseFullAudioPlayerReturn {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
  currentIndex: number;
  totalCount: number;
  elapsedSeconds: number;
  setOnIndexChange: (cb: ((index: number) => void) | null) => void;
}

export function useFullAudioPlayer(urls: string[]): UseFullAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const currentIndexRef = useRef(-1);
  const urlsRef = useRef(urls);
  const onIndexChangeRef = useRef<((index: number) => void) | null>(null);
  const isStoppedRef = useRef(false);

  urlsRef.current = urls;

  const setOnIndexChange = useCallback((cb: ((index: number) => void) | null) => {
    onIndexChangeRef.current = cb;
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
  }, [clearTimer]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    clearTimer();
  }, [clearTimer]);

  const playIndex = useCallback((index: number) => {
    const filtered = urlsRef.current.filter(Boolean);
    if (index >= filtered.length) {
      setIsPlaying(false);
      setCurrentIndex(-1);
      currentIndexRef.current = -1;
      clearTimer();
      onIndexChangeRef.current?.(-1);
      return;
    }

    const audio = new Audio(filtered[index]);
    audioRef.current = audio;
    setCurrentIndex(index);
    currentIndexRef.current = index;
    onIndexChangeRef.current?.(index);

    audio.onended = () => {
      if (!isStoppedRef.current) {
        playIndex(index + 1);
      }
    };

    audio.play().catch(() => {
      // Autoplay prevented, skip to next
      playIndex(index + 1);
    });
  }, [clearTimer]);

  const play = useCallback(() => {
    isStoppedRef.current = false;
    if (audioRef.current) {
      // Resume from paused state
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
      startTimer();
    } else {
      setIsPlaying(true);
      setElapsedSeconds(0);
      startTimer();
      playIndex(0);
    }
  }, [playIndex, startTimer]);

  const pause = useCallback(() => {
    isStoppedRef.current = true;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    clearTimer();
  }, [clearTimer]);

  useEffect(() => {
    return () => {
      isStoppedRef.current = true;
      stopAudio();
    };
  }, [stopAudio, urls]);

  return {
    play,
    pause,
    isPlaying,
    currentIndex,
    totalCount: urls.filter(Boolean).length,
    elapsedSeconds,
    setOnIndexChange,
  };
}
