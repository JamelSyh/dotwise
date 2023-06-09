declare module 'react-speech-kit' {
  export const useSpeechSynthesis: () => {
    speak: (text: string) => void;
    cancel: () => void;
    speaking: boolean;
    supported: boolean;
    voices: SpeechSynthesisVoice[];
  };

  export const useSpeechRecognition: () => {
    listen: () => void;
    stop: () => void;
    listenContinuously: () => void;
    stopListening: () => void;
    listening: boolean;
    interimTranscript: string;
    finalTranscript: string;
    supported: boolean;
  };

  // Add more type declarations for other components/functions provided by react-speech-kit
}
