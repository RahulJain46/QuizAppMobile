import React, { useState } from 'react';
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

export default function LoginScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('त्रुटि', 'कृपया अपना नाम दर्ज करें');
      return false;
    }
    if (!city.trim()) {
      Alert.alert('त्रुटि', 'कृपया अपना शहर दर्ज करें');
      return false;
    }
    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert('त्रुटि', 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें');
      return false;
    }
    if (!/^\d+$/.test(mobileNumber)) {
      Alert.alert('त्रुटि', 'कृपया केवल संख्या दर्ज करें');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    
    try {
      const userData = {
        fullname: name.trim(),
        city: city.trim(),
        mobilenumber: mobileNumber.trim(),
        time: new Date().toLocaleString(),
      };

      // Register user with backend
      const response = await fetch(links.backendURL + 'users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Alert.alert(
          'सफल',
          'आपका पंजीकरण सफल हो गया है!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home')
            }
          ]
        );
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      Alert.alert('त्रुटि', 'पंजीकरण में समस्या हुई। कृपया पुनः प्रयास करें।');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>← वापस</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Admin Login</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>
            कृपया अपनी जानकारी दर्ज करें
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>पूरा नाम *</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
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
            <Text style={styles.inputLabel}>मोबाइल नंबर *</Text>
            <TextInput
              style={styles.textInput}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="numeric"
              maxLength={10}
              placeholder="10 अंकों का मोबाइल नंबर"
              placeholderTextColor="#95A5A6"
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <LinearGradient
              colors={['#1976d2', '#303f9f']}
              style={styles.gradient}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
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
  scrollContent: {
    flexGrow: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fafafa',
    flex: 1,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 20,
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
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#2C3E50',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
