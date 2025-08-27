/**
 * Utility functions for the Quiz App
 */

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Format time in MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Calculate percentage score
 * @param {number} correct - Number of correct answers
 * @param {number} total - Total number of questions
 * @returns {number} Percentage score
 */
export const calculatePercentage = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

/**
 * Get performance message based on score percentage
 * @param {number} percentage - Score percentage
 * @returns {object} Performance data with title, message, and colors
 */
export const getPerformanceData = (percentage) => {
  if (percentage >= 90) {
    return {
      title: 'Outstanding!',
      message: 'Perfect performance! You\'re a quiz master!',
      colors: ['#2ECC71', '#27AE60'],
      emoji: '🏆',
    };
  } else if (percentage >= 80) {
    return {
      title: 'Excellent!',
      message: 'Great job! You really know your stuff!',
      colors: ['#3498DB', '#2980B9'],
      emoji: '🌟',
    };
  } else if (percentage >= 70) {
    return {
      title: 'Good Job!',
      message: 'Well done! You\'re on the right track!',
      colors: ['#F39C12', '#E67E22'],
      emoji: '👍',
    };
  } else if (percentage >= 50) {
    return {
      title: 'Not Bad!',
      message: 'Keep practicing, you\'re getting better!',
      colors: ['#FF6B6B', '#FF8E53'],
      emoji: '📚',
    };
  } else {
    return {
      title: 'Keep Trying!',
      message: 'Practice makes perfect! Don\'t give up!',
      colors: ['#E74C3C', '#C0392B'],
      emoji: '💪',
    };
  }
};

/**
 * Generate a random ID
 * @returns {string} Random ID string
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function to limit rapid function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get difficulty level based on score history
 * @param {Array} scores - Array of recent scores
 * @returns {string} Difficulty level (easy, medium, hard)
 */
export const getDifficultyLevel = (scores) => {
  if (scores.length === 0) return 'easy';
  
  const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  
  if (averageScore >= 80) return 'hard';
  if (averageScore >= 60) return 'medium';
  return 'easy';
};

/**
 * Storage keys for AsyncStorage
 */
export const STORAGE_KEYS = {
  USER_PROFILE: 'userProfile',
  QUIZ_HISTORY: 'quizHistory',
  SETTINGS: 'appSettings',
  ACHIEVEMENTS: 'userAchievements',
};

/**
 * Default app settings
 */
export const DEFAULT_SETTINGS = {
  notifications: true,
  soundEnabled: true,
  darkMode: false,
  autoSubmit: false,
  defaultCategory: 'General Knowledge',
  difficulty: 'easy',
};
