import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { DEFAULT_SETTINGS } from '../utils/helpers';

// Initial state
const initialState = {
  user: {
    name: 'Quiz Master',
    avatar: null,
    rank: 'Beginner',
  },
  settings: DEFAULT_SETTINGS,
  stats: {
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0,
  },
  achievements: [],
  quizHistory: [],
  loading: false,
  error: null,
};

// Action types
export const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  ADD_QUIZ_RESULT: 'ADD_QUIZ_RESULT',
  UPDATE_STATS: 'UPDATE_STATS',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  RESET_PROGRESS: 'RESET_PROGRESS',
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case actionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };

    case actionTypes.ADD_QUIZ_RESULT:
      const newQuizHistory = [action.payload, ...state.quizHistory];
      return {
        ...state,
        quizHistory: newQuizHistory.slice(0, 50), // Keep only last 50 results
      };

    case actionTypes.UPDATE_STATS:
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.payload,
        },
      };

    case actionTypes.UNLOCK_ACHIEVEMENT:
      const existingAchievement = state.achievements.find(
        (achievement) => achievement.id === action.payload.id
      );
      if (existingAchievement) return state;

      return {
        ...state,
        achievements: [...state.achievements, action.payload],
      };

    case actionTypes.RESET_PROGRESS:
      return {
        ...state,
        stats: {
          totalQuizzes: 0,
          averageScore: 0,
          bestScore: 0,
          totalTime: 0,
        },
        quizHistory: [],
        achievements: [],
        user: {
          ...state.user,
          rank: 'Beginner',
        },
      };

    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Context provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const actions = {
    setLoading: (loading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error });
    },

    updateUser: (userData) => {
      dispatch({ type: actionTypes.UPDATE_USER, payload: userData });
    },

    updateSettings: (settings) => {
      dispatch({ type: actionTypes.UPDATE_SETTINGS, payload: settings });
    },

    addQuizResult: (result) => {
      dispatch({ type: actionTypes.ADD_QUIZ_RESULT, payload: result });
      
      // Calculate and update stats
      const newTotalQuizzes = state.stats.totalQuizzes + 1;
      const newTotalScore = state.quizHistory.reduce((sum, quiz) => sum + quiz.percentage, 0) + result.percentage;
      const newAverageScore = Math.round(newTotalScore / newTotalQuizzes);
      const newBestScore = Math.max(state.stats.bestScore, result.percentage);

      dispatch({
        type: actionTypes.UPDATE_STATS,
        payload: {
          totalQuizzes: newTotalQuizzes,
          averageScore: newAverageScore,
          bestScore: newBestScore,
          totalTime: state.stats.totalTime + (result.timeSpent || 0),
        },
      });

      // Check for achievements
      checkAchievements(result, newTotalQuizzes, newAverageScore, newBestScore);
    },

    unlockAchievement: (achievement) => {
      dispatch({ type: actionTypes.UNLOCK_ACHIEVEMENT, payload: achievement });
    },

    resetProgress: () => {
      dispatch({ type: actionTypes.RESET_PROGRESS });
    },
  };

  // Achievement checking logic
  const checkAchievements = (result, totalQuizzes, averageScore, bestScore) => {
    const achievements = [
      {
        id: 'first_quiz',
        title: 'First Quiz',
        description: 'Complete your first quiz',
        condition: totalQuizzes >= 1,
      },
      {
        id: 'perfect_score',
        title: 'Perfect Score',
        description: 'Get 100% on any quiz',
        condition: result.percentage === 100,
      },
      {
        id: 'high_achiever',
        title: 'High Achiever',
        description: 'Average 80% across 10 quizzes',
        condition: totalQuizzes >= 10 && averageScore >= 80,
      },
      {
        id: 'quiz_master',
        title: 'Quiz Master',
        description: 'Complete 50 quizzes',
        condition: totalQuizzes >= 50,
      },
      {
        id: 'consistent_performer',
        title: 'Consistent Performer',
        description: 'Score above 70% in 5 consecutive quizzes',
        condition: checkConsecutiveScores(5, 70),
      },
    ];

    achievements.forEach((achievement) => {
      if (achievement.condition) {
        actions.unlockAchievement(achievement);
      }
    });
  };

  // Helper function to check consecutive scores
  const checkConsecutiveScores = (count, threshold) => {
    if (state.quizHistory.length < count - 1) return false;
    
    const recentQuizzes = [{ percentage: state.quizHistory[0]?.percentage || 0 }, ...state.quizHistory.slice(0, count - 1)];
    return recentQuizzes.every((quiz) => quiz.percentage >= threshold);
  };

  // Context value
  const value = {
    ...state,
    ...actions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the app context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
