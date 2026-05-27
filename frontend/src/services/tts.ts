/**
 * Local TTS Service using Web Speech API
 * Provides text-to-speech functionality for shadowing practice
 */

export type TTSVoice = {
  name: string;
  lang: string;
};

export type TTSState = {
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string | null;
};

type SpeakEventListener = (state: TTSState) => void;

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeakEventListener> = new Set();
  private currentState: TTSState = {
    isSpeaking: false,
    isPaused: false,
    currentText: null,
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener({ ...this.currentState }));
  }

  private updateState(partial: Partial<TTSState>) {
    this.currentState = { ...this.currentState, ...partial };
    this.notifyListeners();
  }

  subscribe(listener: SpeakEventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): TTSState {
    return { ...this.currentState };
  }

  getVoices(): TTSVoice[] {
    if (!this.synth) return [];

    const voices = this.synth.getVoices();
    return voices
      .filter((v) => v.lang.startsWith('en'))
      .map((v) => ({ name: v.name, lang: v.lang }));
  }

  speak(text: string, options: { voice?: string; rate?: number; pitch?: number } = {}): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    this.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    this.utterance = utterance;

    // Configure voice
    if (options.voice) {
      const voices = this.synth.getVoices();
      const selectedVoice = voices.find((v) => v.name === options.voice);
      if (selectedVoice) utterance.voice = selectedVoice;
    }

    // Configure rate and pitch
    utterance.rate = options.rate ?? 1;
    utterance.pitch = options.pitch ?? 1;

    // Event handlers
    utterance.onstart = () => {
      this.updateState({ isSpeaking: true, isPaused: false, currentText: text });
    };

    utterance.onend = () => {
      this.updateState({ isSpeaking: false, isPaused: false, currentText: null });
      this.utterance = null;
    };

    utterance.onerror = (event) => {
      console.error('TTS error:', event.error);
      this.updateState({ isSpeaking: false, isPaused: false, currentText: null });
      this.utterance = null;
    };

    utterance.onpause = () => {
      this.updateState({ isPaused: true });
    };

    utterance.onresume = () => {
      this.updateState({ isPaused: false });
    };

    this.synth.speak(utterance);
  }

  pause(): void {
    if (this.synth && this.currentState.isSpeaking && !this.currentState.isPaused) {
      this.synth.pause();
    }
  }

  resume(): void {
    if (this.synth && this.currentState.isPaused) {
      this.synth.resume();
    }
  }

  cancel(): void {
    if (this.synth) {
      this.synth.cancel();
      this.updateState({ isSpeaking: false, isPaused: false, currentText: null });
      this.utterance = null;
    }
  }

  isSupported(): boolean {
    return this.synth !== null;
  }
}

// Singleton instance
export const ttsService = new TTSService();
