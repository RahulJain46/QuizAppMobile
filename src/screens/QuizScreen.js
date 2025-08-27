import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Sample quiz data - in a real app, this would come from an API
const sampleQuizData = {
  'General Knowledge': [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 1,
    },
    {
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      correctAnswer: 3,
    },
  ],
  Science: [
    {
      question: 'What is the chemical symbol for gold?',
      options: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 2,
    },
    {
      question: 'How many bones are in the adult human body?',
      options: ['206', '205', '207', '204'],
      correctAnswer: 0,
    },
  ],
  // Add more categories as needed
};

export default function QuizScreen({ navigation, route }) {
  const { category } = route.params || { category: { title: 'General Knowledge' } };
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizData] = useState(sampleQuizData[category.title] || sampleQuizData['General Knowledge']);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleAnswerPress = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      // Quiz finished
      const finalScore = selectedAnswer === quizData[currentQuestion].correctAnswer ? score + 1 : score;
      navigation.navigate('Result', {
        score: finalScore,
        totalQuestions: quizData.length,
        category: category.title,
      });
    }
  };

  const handleQuitQuiz = () => {
    Alert.alert(
      'Quit Quiz',
      'Are you sure you want to quit the quiz?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Quit', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  if (!quizData || quizData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No questions available for this category</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.quitButton} onPress={handleQuitQuiz}>
          <Text style={styles.quitButtonText}>Quit</Text>
        </TouchableOpacity>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.timer}>{timeLeft}s</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.questionCounter}>
          {currentQuestion + 1} of {quizData.length}
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{quizData[currentQuestion].question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {quizData[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index && styles.selectedOption,
            ]}
            onPress={() => handleAnswerPress(index)}
          >
            <Text
              style={[
                styles.optionText,
                selectedAnswer === index && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !selectedAnswer && styles.disabledButton]}
        onPress={handleNextQuestion}
        disabled={!selectedAnswer}
      >
        <Text style={styles.nextButtonText}>
          {currentQuestion + 1 === quizData.length ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  quitButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 20,
  },
  quitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  timer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  questionCounter: {
    textAlign: 'center',
    color: '#7F8C8D',
    fontSize: 14,
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  question: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 24,
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF10',
  },
  optionText: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#BDC3C7',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
