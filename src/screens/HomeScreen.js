import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { links } from '../Config';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [toggleButton, setToggleButton] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [comment, setComment] = useState('');

  // Date formatting logic from web app
  const date = new Date();
  const day = new Date().getDate() > 9 
    ? new Date().getDate() 
    : "0" + new Date().getDate();
  const year = new Date().getFullYear();
  const currentMonth = new Date().getMonth() < 9 
    ? "0" + (new Date().getMonth() + 1) 
    : new Date().getMonth() + 1;
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();

  useEffect(() => {
    // Scroll to top equivalent for mobile
  }, []);

  const handleSubmitFeedback = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a 10-digit mobile number');
      return;
    }
    if (!comment) {
      Alert.alert('Error', 'Please enter your comment');
      return;
    }

    try {
      const userOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobilenumber: mobileNumber,
          comment: comment
        }),
      };

      await fetch(links.backendURL + "comments", userOptions);
      setToggleButton(true);
      Alert.alert('Success', 'Thanks for your comment, we will contact you soon.');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    }
  };

  const navigateToKBCInstruction = () => {
    // Navigate to KBC Instruction screen
    navigation.navigate('KBCInstruction');
  };

  const navigateToKBCResult = () => {
    // Navigate to KBC Result screen
    navigation.navigate('KBCResult');
  };

  const navigateToQuizLogin = () => {
    // Navigate to Quiz Login with current date
    const dateString = `${day}-${currentMonth}-${year}`;
    navigation.navigate('QuizLogin', { date: dateString });
  };

  const navigateToQuizResult = () => {
    // Navigate to Quiz Result with current date
    const dateString = `${day}-${currentMonth}-${year}`;
    navigation.navigate('QuizResult', { date: dateString });
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="#ac7818" 
        barStyle="light-content"
        translucent={false}
      />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Golden Notice Banner */}
          <View style={[styles.noticeBanner, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}>
            <Text style={styles.noticeText}>
              "प्रच्छना स्वाध्याय" NEW QUIZ WILL BE UPLOADED DAILY BY 12:01 AM
            </Text>
          </View>

        <View style={styles.header}>
          <Text style={styles.title}>JINDARSHAN</Text>
          <Text style={styles.subtitle}>जय जिनेन्द्र</Text>
        </View>

        <View style={styles.buttonContainer}>
          {/* KBC Button */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={navigateToKBCInstruction}
            >
              <LinearGradient
                colors={['#127c28', '#0e6321']}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>कौन बनेगा धर्मज्ञ (KBD)</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* KBC Result Button */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={navigateToKBCResult}
            >
              <LinearGradient
                colors={['#b04512', '#8a340e']}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>कौन बनेगा धर्मज्ञ Rank</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Daily Quiz Button */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={navigateToQuizLogin}
            >
              <LinearGradient
                colors={['#1976d2', '#303f9f']}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>QUIZ {day + "-" + month}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Quiz Result Button */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={navigateToQuizResult}
            >
              <LinearGradient
                colors={['#aa1050', '#7a0c3b']}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>QUIZ RESULT {day + "-" + month}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Books Button */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Books')}
            >
              <LinearGradient
                colors={['#b04512', '#8a340e']}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>जिनवाणी पुस्तकें</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Login')}
            >
              <LinearGradient
                colors={['#1976d2', '#303f9f']}
                style={styles.gradient}
              >
                <Text style={styles.buttonText}>Admin Login</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feedback Form */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>
            यदि आपको उक्त QUIZ भरने में कोई तकनीकी समस्या आ रही है तो कृपया निम्न फार्म में समस्या का विवरण लिखें
          </Text>
          
          {!toggleButton ? (
            <View>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={styles.textInput}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="numeric"
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
              />

              <Text style={styles.inputLabel}>Comment</Text>
              <TextInput
                style={[styles.textInput, styles.commentInput]}
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                placeholder="Enter your comment"
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitFeedback}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.successMessage}>
              Thanks for your comment, we will contact you soon.
            </Text>
          )}
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ac7818',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: 30,
  },
  noticeBanner: {
    backgroundColor: '#ac7818',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 0,
    minHeight: 50, // Ensure minimum height
    justifyContent: 'center', // Center content vertically
  },
  noticeText: {
    color: '#e9ecef',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 18,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#234f64',
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fafafa',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#f5f5f5',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  button: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
  },
  feedbackContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  commentInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  successMessage: {
    fontSize: 16,
    color: '#d34242',
    textAlign: 'center',
    fontWeight: '600',
  },
});
