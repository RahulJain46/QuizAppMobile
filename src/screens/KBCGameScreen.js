import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import KbcQuiz from '../components/KbcQuiz';
import KbcResult from '../components/KbcResult';
import Timer from '../components/Timer';
import { links } from '../Config';

export default function KBCGameScreen({ navigation, route }) {
  const userData = route.params || {};
  
  // Game state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flipQuestionUsed, setFlipQuestionUsed] = useState(false);
  const [startTime] = useState(new Date());

  // Sample questions (replace with API call)
  const sampleQuestions = [
    {
      _id: "1",
      question: "दिव्य ध्वनि अट्ठारह महा भाषा में होती है।",
      answer: "YES",
      remarks: "दिव्य ध्वनि वास्तव में सभी भाषाओं में समझी जाती है।"
    },
    {
      _id: "2", 
      question: "आदिनाथ भगवान का चिन्ह हाथी है।",
      answer: "NO",
      remarks: "आदिनाथ भगवान का चिन्ह बैल है।"
    },
    {
      _id: "3",
      question: "दिव्य ध्वनि भगवान के सर्वांग से गिरती है।", 
      answer: "YES",
      remarks: "यह सत्य है कि दिव्य ध्वनि सर्वांग से निकलती है।"
    },
    {
      _id: "4",
      question: "किसी व्यक्ति की मृत्यु होने पर उसकी आत्मा भी मर जाती है।",
      answer: "NO", 
      remarks: "आत्मा अमर है, केवल शरीर मरता है।"
    },
    {
      _id: "5",
      question: "कर्मों के आने को आश्रव कहते हैं।",
      answer: "YES",
      remarks: "आश्रव कर्म के आने की प्रक्रिया है।"
    }
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      // In a real app, fetch from backend
      // For now, use sample questions
      setQuestions(sampleQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions(sampleQuestions);
      setLoading(false);
    }
  };

  const startGame = () => {
    if (questions.length > 0) {
      setGameStarted(true);
      setCurrentQuestionIndex(0);
      setScore(0);
      setUserAnswer('');
    }
  };

  const handleAnswerSelected = (answer) => {
    setUserAnswer(answer);
  };

  const submitAnswer = () => {
    if (!userAnswer) {
      Alert.alert('चेतावनी', 'कृपया एक उत्तर चुनें');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = userAnswer === currentQuestion.answer;
    
    if (isCorrect) {
      const newScore = score + 5000;
      setScore(newScore);
      
      // Check if game completed
      if (currentQuestionIndex + 1 >= questions.length) {
        finishGame(newScore);
      } else {
        // Move to next question
        Alert.alert(
          'सही उत्तर!',
          `आपका स्कोर: ${newScore}`,
          [
            {
              text: 'अगला प्रश्न',
              onPress: () => nextQuestion()
            },
            {
              text: 'गेम छोड़ें',
              onPress: () => finishGame(newScore)
            }
          ]
        );
      }
    } else {
      // Wrong answer - game over
      Alert.alert(
        'गलत उत्तर!',
        `सही उत्तर: ${currentQuestion.answer}\n${currentQuestion.remarks}\n\nआपका अंतिम स्कोर: ${score}`,
        [
          {
            text: 'OK',
            onPress: () => finishGame(score)
          }
        ]
      );
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer('');
  };

  const flipQuestion = () => {
    if (flipQuestionUsed) {
      Alert.alert('चेतावनी', 'आप पहले से ही FLIP THE QUESTION का उपयोग कर चुके हैं');
      return;
    }

    Alert.alert(
      'FLIP THE QUESTION',
      'क्या आप वाकई प्रश्न बदलना चाहते हैं?',
      [
        {
          text: 'नहीं',
          style: 'cancel'
        },
        {
          text: 'हाँ',
          onPress: () => {
            setFlipQuestionUsed(true);
            // In real app, fetch a new random question
            if (currentQuestionIndex + 1 < questions.length) {
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              setUserAnswer('');
            }
          }
        }
      ]
    );
  };

  const finishGame = async (finalScore) => {
    try {
      // Submit score to backend
      const gameData = {
        name: userData.name || 'Unknown',
        city: userData.city || 'Unknown',
        mobile: userData.mobile || 'Unknown',
        score: finalScore,
        date: new Date().toLocaleDateString(),
        startTime: startTime.toLocaleString(),
        duration: Math.floor((new Date() - startTime) / 1000) + ' seconds'
      };

      // API call to save result
      // await submitGameResult(gameData);
      
      setGameFinished(true);
    } catch (error) {
      console.error('Error submitting game result:', error);
      setGameFinished(true);
    }
  };

  const quitGame = () => {
    Alert.alert(
      'गेम छोड़ें',
      'क्या आप वाकई गेम छोड़ना चाहते हैं?',
      [
        {
          text: 'नहीं',
          style: 'cancel'
        },
        {
          text: 'हाँ',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswer('');
    setFlipQuestionUsed(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#127c28" />
          <Text style={styles.loadingText}>गेम लोड हो रहा है...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (gameFinished) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>गेम समाप्त!</Text>
            <Text style={styles.finalScore}>आपका अंतिम स्कोर: {score}</Text>
            <Text style={styles.resultMessage}>
              {score >= 50000 ? 'बधाई हो! उत्कृष्ट प्रदर्शन!' : 
               score >= 25000 ? 'अच्छा प्रदर्शन!' : 
               'बेहतर भविष्य के लिए शुभकामनाएं!'}
            </Text>
            
            <View style={styles.resultButtonsContainer}>
              <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                <LinearGradient colors={['#127c28', '#0e6321']} style={styles.gradient}>
                  <Text style={styles.buttonText}>फिर से खेलें</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                <LinearGradient colors={['#1976d2', '#303f9f']} style={styles.gradient}>
                  <Text style={styles.buttonText}>होम जाएं</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!gameStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>कौन बनेगा धर्मज्ञ</Text>
            <Text style={styles.welcomeSubtitle}>
              स्वागत है {userData.name || 'खिलाड़ी'}!
            </Text>
            <Text style={styles.gameInfo}>
              • कुल प्रश्न: {questions.length}
            </Text>
            <Text style={styles.gameInfo}>
              • प्रत्येक सही उत्तर: 5000 अंक
            </Text>
            <Text style={styles.gameInfo}>
              • हेल्पलाइन: FLIP THE QUESTION (1 बार)
            </Text>
            
            <TouchableOpacity style={styles.startGameButton} onPress={startGame}>
              <LinearGradient colors={['#127c28', '#0e6321']} style={styles.gradient}>
                <Text style={styles.buttonText}>गेम शुरू करें</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quitButton} onPress={() => navigation.goBack()}>
              <Text style={styles.quitButtonText}>वापस जाएं</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answerOptions = [
    { answerOption: 'YES' },
    { answerOption: 'NO' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.gameHeader}>
          <TouchableOpacity style={styles.quitGameButton} onPress={quitGame}>
            <Text style={styles.quitGameButtonText}>गेम छोड़ें</Text>
          </TouchableOpacity>
          <Text style={styles.currentScore}>स्कोर: {score}</Text>
        </View>

        {/* Timer */}
        <Timer 
          initialSeconds={600} 
          onTimeUp={() => finishGame(score)} 
        />

        {/* Quiz Component */}
        <KbcQuiz
          question={currentQuestion.question}
          answerOptions={answerOptions}
          questionId={currentQuestionIndex + 1}
          questionTotal={questions.length}
          answer={userAnswer}
          onAnswerSelected={handleAnswerSelected}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          {!flipQuestionUsed && (
            <TouchableOpacity style={styles.flipButton} onPress={flipQuestion}>
              <Text style={styles.flipButtonText}>FLIP THE QUESTION</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.submitButton, !userAnswer && styles.disabledButton]} 
            onPress={submitAnswer}
            disabled={!userAnswer}
          >
            <LinearGradient colors={['#127c28', '#0e6321']} style={styles.gradient}>
              <Text style={styles.buttonText}>उत्तर दें</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc', // beige background like web app
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2C3E50',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#127c28',
    textAlign: 'center',
    marginBottom: 20,
  },
  welcomeSubtitle: {
    fontSize: 20,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 30,
  },
  gameInfo: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  startGameButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 30,
    marginBottom: 20,
    width: '80%',
  },
  quitButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  quitButtonText: {
    color: '#7F8C8D',
    fontSize: 16,
    textAlign: 'center',
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quitGameButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  quitGameButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  currentScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#127c28',
  },
  actionButtonsContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  flipButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  flipButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '80%',
  },
  disabledButton: {
    opacity: 0.5,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#127c28',
    textAlign: 'center',
    marginBottom: 20,
  },
  finalScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 15,
  },
  resultMessage: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 40,
  },
  resultButtonsContainer: {
    width: '100%',
  },
  restartButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
  },
  homeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});