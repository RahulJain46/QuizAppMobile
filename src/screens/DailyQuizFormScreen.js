import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { links } from '../Config';

export default function DailyQuizFormScreen({ navigation, route }) {
  const { mobile, date, ...userData } = route.params || {};
  
  // Form state
  const [fullname, setFullname] = useState(userData.fullname || '');
  const [city, setCity] = useState(userData.city || '');
  const [address, setAddress] = useState(userData.address || '');
  const [feedback, setFeedback] = useState('');
  const [suggestion, setSuggestion] = useState('');
  
  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Sample questions for demo
  const sampleQuestions = [
    {
      _id: "1",
      question: "तीर्थंकर कौन होते हैं?",
      options: ["धर्म गुरु", "राजा", "आध्यात्मिक नेता", "सभी सही हैं"],
      correctAnswer: "आध्यात्मिक नेता",
      explanation: "तीर्थंकर आध्यात्मिक पथ-प्रदर्शक होते हैं।"
    },
    {
      _id: "2", 
      question: "जैन धर्म में कितने तीर्थंकर हुए हैं?",
      options: ["20", "22", "24", "26"],
      correctAnswer: "24",
      explanation: "जैन धर्म में कुल 24 तीर्थंकर हुए हैं।"
    },
    {
      _id: "3",
      question: "जैन धर्म का मुख्य सिद्धांत क्या है?",
      options: ["अहिंसा", "हिंसा", "धन संग्रह", "राज्य विस्तार"],
      correctAnswer: "अहिंसा",
      explanation: "अहिंसा जैन धर्म का मुख्य सिद्धांत है।"
    },
    {
      _id: "4",
      question: "प्रथम तीर्थंकर का नाम क्या है?",
      options: ["पार्श्वनाथ", "महावीर", "आदिनाथ", "नेमिनाथ"],
      correctAnswer: "आदिनाथ",
      explanation: "आदिनाथ (ऋषभनाथ) प्रथम तीर्थंकर हैं।"
    },
    {
      _id: "5",
      question: "24वें तीर्थंकर कौन हैं?",
      options: ["पार्श्वनाथ", "महावीर", "आदिनाथ", "नेमिनाथ"],
      correctAnswer: "महावीर",
      explanation: "महावीर स्वामी 24वें और अंतिम तीर्थंकर हैं।"
    }
  ];

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      // In real app, fetch from API based on date
      // For now, use sample questions
      setQuestions(sampleQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions(sampleQuestions);
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!fullname.trim()) {
      Alert.alert('त्रुटि', 'कृपया अपना पूरा नाम दर्ज करें');
      return false;
    }
    if (!city.trim()) {
      Alert.alert('त्रुटि', 'कृपया अपना शहर दर्ज करें');
      return false;
    }
    if (!address.trim()) {
      Alert.alert('त्रुटि', 'कृपया अपना पता दर्ज करें');
      return false;
    }
    if (!mobile || mobile.length !== 10) {
      Alert.alert('त्रुटि', 'मोबाइल नंबर गलत है');
      return false;
    }
    
    // Check if all questions are answered
    for (let question of questions) {
      if (!answers.has(question._id)) {
        Alert.alert('त्रुटि', 'कृपया सभी प्रश्नों का उत्तर दें');
        return false;
      }
    }
    
    return true;
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(question => {
      const userAnswer = answers.get(question._id);
      if (userAnswer === question.correctAnswer) {
        score += 2; // 2 points per correct answer
      }
    });
    return score;
  };

  const handleAnswerSelect = (questionId, answer) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, answer);
    setAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    
    try {
      const score = calculateScore();
      const time = new Date().toLocaleString();
      
      const quizData = {
        fullname: fullname.trim(),
        city: city.trim(),
        address: address.trim(),
        mobile: mobile,
        feedback: feedback.trim(),
        suggestion: suggestion.trim(),
        score: score,
        time: time,
        date: date,
        answers: Object.fromEntries(answers)
      };

      // Submit to backend
      const response = await fetch(links.backendURL + 'usersresponse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData)
      });

      if (response.ok) {
        Alert.alert(
          'सफल!', 
          `आपका स्कोर: ${score}/${questions.length * 2}`,
          [
            {
              text: 'परिणाम देखें',
              onPress: () => navigation.navigate('QuizResult', { date, score, totalQuestions: questions.length })
            }
          ]
        );
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      Alert.alert('त्रुटि', 'Quiz submit करने में समस्या हुई। कृपया पुनः प्रयास करें।');
      console.error('Quiz submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1976d2" />
          <Text style={styles.loadingText}>Quiz लोड हो रहा है...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>← वापस</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>दैनिक Quiz - {date}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* User Information Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>व्यक्तिगत जानकारी</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>पूरा नाम *</Text>
            <TextInput
              style={styles.textInput}
              value={fullname}
              onChangeText={setFullname}
              placeholder="अपना पूरा नाम दर्ज करें"
              placeholderTextColor="#95A5A6"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>शहर *</Text>
            <TextInput
              style={styles.textInput}
              value={city}
              onChangeText={setCity}
              placeholder="अपना शहर दर्ज करें"
              placeholderTextColor="#95A5A6"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>पूरा पता *</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              value={address}
              onChangeText={setAddress}
              placeholder="अपना पूरा पता दर्ज करें"
              placeholderTextColor="#95A5A6"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>मोबाइल नंबर</Text>
            <TextInput
              style={[styles.textInput, styles.disabledInput]}
              value={mobile}
              editable={false}
            />
          </View>
        </View>

        {/* Quiz Questions */}
        <View style={styles.quizSection}>
          <Text style={styles.sectionTitle}>Quiz प्रश्न</Text>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              प्रश्न {currentQuestionIndex + 1} / {questions.length}
            </Text>
          </View>

          {/* Current Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </Text>
            
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers.get(currentQuestion._id) === option;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      isSelected && styles.selectedOption
                    ]}
                    onPress={() => handleAnswerSelect(currentQuestion._id, option)}
                  >
                    <Text style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText
                    ]}>
                      {String.fromCharCode(65 + index)}. {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Navigation Buttons */}
            <View style={styles.questionNavigation}>
              <TouchableOpacity
                style={[styles.navButton, currentQuestionIndex === 0 && styles.disabledButton]}
                onPress={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
              >
                <Text style={styles.navButtonText}>पिछला</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.navButton, currentQuestionIndex === questions.length - 1 && styles.disabledButton]}
                onPress={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                <Text style={styles.navButtonText}>अगला</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Feedback Section */}
        <View style={styles.feedbackSection}>
          <Text style={styles.sectionTitle}>फीडबैक (वैकल्पिक)</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>फीडबैक</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              value={feedback}
              onChangeText={setFeedback}
              placeholder="अपनी फीडबैक दें"
              placeholderTextColor="#95A5A6"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>सुझाव</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              value={suggestion}
              onChangeText={setSuggestion}
              placeholder="आपके सुझाव"
              placeholderTextColor="#95A5A6"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={[styles.submitButton, submitting && styles.disabledButton]}
            onPress={submitQuiz}
            disabled={submitting}
          >
            <LinearGradient
              colors={['#1976d2', '#303f9f']}
              style={styles.gradient}
            >
              {submitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Quiz Submit करें</Text>
              )}
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
    backgroundColor: '#F8F9FA',
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
  header: {
    backgroundColor: '#234f64',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    color: '#fafafa',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fafafa',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quizSection: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  feedbackSection: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#2C3E50',
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  disabledInput: {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1976d2',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
    lineHeight: 22,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    borderColor: '#1976d2',
    backgroundColor: '#e3f2fd',
  },
  optionText: {
    fontSize: 14,
    color: '#2C3E50',
  },
  selectedOptionText: {
    color: '#1976d2',
    fontWeight: '600',
  },
  questionNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    backgroundColor: '#95A5A6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  submitContainer: {
    padding: 20,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});