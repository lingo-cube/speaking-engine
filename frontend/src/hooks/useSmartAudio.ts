import { useCallback } from 'react';
import { useAudioPlayer } from './useAudioPlayer';
import { useSpeechSynthesis } from './useSpeechSynthesis';

interface UseSmartAudioReturn {
  play: () => void;
  pause: () => void;
  replay: () => void;
  toggleSlowMode: () => void;
  isPlaying: boolean;
  isSlowMode: boolean;
  usingTTS: boolean;
}

// Smart audio: prefers OSS audio_url, falls back to browser TTS using chunk text
export function useSmartAudio(audioUrl: string, text: string): UseSmartAudioReturn {
  const htmlAudio = useAudioPlayer(audioUrl);
  const tts = useSpeechSynthesis();
  const hasRealAudio = audioUrl && audioUrl.length > 0 && !audioUrl.startsWith('blob:');

  const play = useCallback(() => {
    if (hasRealAudio) {
      htmlAudio.play();
    } else {
      tts.speak(text, tts.currentRate);
    }
  }, [hasRealAudio, htmlAudio, tts, text]);

  const pause = useCallback(() => {
    if (hasRealAudio) {
      htmlAudio.pause();
    } else {
      tts.pause();
    }
  }, [hasRealAudio, htmlAudio, tts]);

  const replay = useCallback(() => {
    if (hasRealAudio) {
      htmlAudio.replay();
    } else {
      tts.stop();
      setTimeout(() => tts.speak(text, tts.currentRate), 50);
    }
  }, [hasRealAudio, htmlAudio, tts, text]);

  const toggleSlowMode = useCallback(() => {
    if (hasRealAudio) {
      htmlAudio.toggleSlowMode();
    } else {
      const newRate = tts.currentRate === 1 ? 0.75 : 1;
      tts.stop();
      setTimeout(() => tts.speak(text, newRate), 50);
    }
  }, [hasRealAudio, htmlAudio, tts, text]);

  return {
    play,
    pause,
    replay,
    toggleSlowMode,
    isPlaying: hasRealAudio ? htmlAudio.isPlaying : tts.isPlaying,
    isSlowMode: hasRealAudio ? htmlAudio.isSlowMode : tts.currentRate < 1,
    usingTTS: !hasRealAudio && tts.isSupported,
  };
}
