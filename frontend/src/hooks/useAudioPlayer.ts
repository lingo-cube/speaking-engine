import { useState, useRef, useCallback, useEffect } from 'react';

interface UseAudioPlayerReturn {
  play: () => void;
  pause: () => void;
  replay: () => void;
  toggleSlowMode: () => void;
  isPlaying: boolean;
  isSlowMode: boolean;
  currentTime: number;
  duration: number;
}

export function useAudioPlayer(audioUrl: string): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlowMode, setIsSlowMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audioRef.current = null;
    };
  }, [audioUrl]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay prevented, ignore
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const replay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Autoplay prevented, ignore
      });
    }
  }, []);

  const toggleSlowMode = useCallback(() => {
    if (audioRef.current) {
      const newRate = isSlowMode ? 1 : 0.75;
      audioRef.current.playbackRate = newRate;
      setIsSlowMode(!isSlowMode);
    }
  }, [isSlowMode]);

  return {
    play,
    pause,
    replay,
    toggleSlowMode,
    isPlaying,
    isSlowMode,
    currentTime,
    duration,
  };
}
