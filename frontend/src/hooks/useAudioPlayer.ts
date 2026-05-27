/**
 * Enhanced audio player hook with TTS support
 * Supports both audio files and text-to-speech
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { ttsService } from '../services/tts';

export type AudioSource = {
  type: 'audio' | 'tts';
  url?: string;
  text?: string;
};

type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';

interface UseAudioPlayerReturn {
  play: () => void;
  pause: () => void;
  stop: () => void;
  replay: () => void;
  toggleSlowMode: () => void;
  state: PlaybackState;
  isPlaying: boolean;
  isSlowMode: boolean;
  currentTime: number;
  duration: number;
  error: string | null;
}

export function useAudioPlayer(source: AudioSource): UseAudioPlayerReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ttsStateRef = useRef({ isSpeaking: false, isPaused: false });
  const [state, setState] = useState<PlaybackState>('idle');
  const [isSlowMode, setIsSlowMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const isPlaying = state === 'playing';

  // Clean up function
  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.removeEventListener('ended', handleEnded);
      audioRef.current.removeEventListener('play', handlePlay);
      audioRef.current.removeEventListener('pause', handlePause);
      audioRef.current.removeEventListener('error', handleError);
      audioRef.current = null;
    }
    ttsService.cancel();
  }, []);

  // Audio event handlers
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setState('idle');
    }
  }, []);

  const handleEnded = useCallback(() => {
    setState('ended');
    setCurrentTime(0);
  }, []);

  const handlePlay = useCallback(() => {
    setState('playing');
  }, []);

  const handlePause = useCallback(() => {
    setState('paused');
  }, []);

  const handleError = useCallback(() => {
    setState('error');
    setError('Failed to load audio');
  }, []);

  // TTS state subscription
  useEffect(() => {
    const unsubscribe = ttsService.subscribe((ttsState) => {
      ttsStateRef.current = ttsState;
      if (ttsState.isSpeaking) {
        setState('playing');
      } else if (!ttsState.isPaused) {
        setState('idle');
      }
    });
    return unsubscribe;
  }, []);

  // Initialize audio element for audio sources
  useEffect(() => {
    if (source.type === 'audio' && source.url) {
      cleanup();
      setError(null);
      setState('loading');

      const audio = new Audio(source.url);
      audio.preload = 'metadata';
      audioRef.current = audio;

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('error', handleError);

      return cleanup;
    } else if (source.type === 'tts') {
      cleanup();
      setError(null);
      setState('idle');
      setCurrentTime(0);
      setDuration(0);
    }
  }, [source, cleanup, handleTimeUpdate, handleLoadedMetadata, handleEnded, handlePlay, handlePause, handleError]);

  const play = useCallback(() => {
    setError(null);

    if (source.type === 'audio' && audioRef.current) {
      audioRef.current.play().catch((err) => {
        setError('Playback failed: ' + err.message);
        setState('error');
      });
    } else if (source.type === 'tts' && source.text) {
      ttsService.speak(source.text, { rate: isSlowMode ? 0.75 : 1 });
    }
  }, [source, isSlowMode]);

  const pause = useCallback(() => {
    if (source.type === 'audio' && audioRef.current) {
      audioRef.current.pause();
    } else if (source.type === 'tts') {
      ttsService.pause();
    }
  }, [source]);

  const stop = useCallback(() => {
    if (source.type === 'audio' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else if (source.type === 'tts') {
      ttsService.cancel();
    }
    setState('idle');
    setCurrentTime(0);
  }, [source]);

  const replay = useCallback(() => {
    stop();
    // Small delay to ensure clean state
    setTimeout(() => {
      play();
    }, 50);
  }, [stop, play]);

  const toggleSlowMode = useCallback(() => {
    const newSlowMode = !isSlowMode;
    setIsSlowMode(newSlowMode);

    if (source.type === 'audio' && audioRef.current) {
      audioRef.current.playbackRate = newSlowMode ? 0.75 : 1;
    } else if (source.type === 'tts' && ttsStateRef.current.isSpeaking) {
      // For TTS, we need to restart with new rate
      if (source.text) {
        ttsService.cancel();
        setTimeout(() => {
          ttsService.speak(source.text, { rate: newSlowMode ? 0.75 : 1 });
        }, 50);
      }
    }
  }, [isSlowMode, source]);

  return {
    play,
    pause,
    stop,
    replay,
    toggleSlowMode,
    state,
    isPlaying,
    isSlowMode,
    currentTime,
    duration,
    error,
  };
}

export function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
