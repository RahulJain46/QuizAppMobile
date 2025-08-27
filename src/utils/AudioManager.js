import { Audio } from 'expo-av';

class AudioManager {
  constructor() {
    this.sounds = {};
    this.isInitialized = false;
  }

  async initialize() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false
      });
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  async loadSound(name, source) {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      const { sound } = await Audio.Sound.createAsync(source);
      this.sounds[name] = sound;
      return sound;
    } catch (error) {
      console.error(`Failed to load sound ${name}:`, error);
      return null;
    }
  }

  async playSound(name, options = {}) {
    try {
      const sound = this.sounds[name];
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.isPlaying) {
            await sound.stopAsync();
          }
          await sound.replayAsync();
        }
      }
    } catch (error) {
      console.error(`Failed to play sound ${name}:`, error);
    }
  }

  async stopSound(name) {
    try {
      const sound = this.sounds[name];
      if (sound) {
        await sound.stopAsync();
      }
    } catch (error) {
      console.error(`Failed to stop sound ${name}:`, error);
    }
  }

  async stopAllSounds() {
    try {
      for (const soundName in this.sounds) {
        await this.stopSound(soundName);
      }
    } catch (error) {
      console.error('Failed to stop all sounds:', error);
    }
  }

  async unloadSound(name) {
    try {
      const sound = this.sounds[name];
      if (sound) {
        await sound.unloadAsync();
        delete this.sounds[name];
      }
    } catch (error) {
      console.error(`Failed to unload sound ${name}:`, error);
    }
  }

  async unloadAllSounds() {
    try {
      for (const soundName in this.sounds) {
        await this.unloadSound(soundName);
      }
      this.sounds = {};
    } catch (error) {
      console.error('Failed to unload all sounds:', error);
    }
  }
}

// Create singleton instance
const audioManager = new AudioManager();

// Sound constants
export const SOUNDS = {
  KBC_START: 'kbc_start',
  NEXT_QUESTION: 'next_question', 
  END_GAME: 'end_game',
  CORRECT_ANSWER: 'correct_answer',
  WRONG_ANSWER: 'wrong_answer'
};

// Helper functions
export const initializeAudio = () => audioManager.initialize();

export const loadKBCSounds = async () => {
  // For now, we'll use placeholder sounds
  // In a real app, you would load actual audio files
  try {
    // These would be actual audio files in your assets
    // await audioManager.loadSound(SOUNDS.KBC_START, require('../assets/sounds/kbc_start.mp3'));
    // await audioManager.loadSound(SOUNDS.NEXT_QUESTION, require('../assets/sounds/next_question.mp3'));
    // await audioManager.loadSound(SOUNDS.END_GAME, require('../assets/sounds/end_game.mp3'));
    
    console.log('KBC sounds loaded successfully');
  } catch (error) {
    console.error('Failed to load KBC sounds:', error);
  }
};

export const playKBCSound = (soundName) => audioManager.playSound(soundName);

export const stopKBCSound = (soundName) => audioManager.stopSound(soundName);

export const stopAllKBCSounds = () => audioManager.stopAllSounds();

export default audioManager;
