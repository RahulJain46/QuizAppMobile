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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { links } from '../Config';

export default function KBCLoginScreen({ navigation, route }) {
  const { mobile } = route.params || {};
  const [mobileNumber, setMobileNumber] = useState(mobile || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      Alert.alert('त्रुटि', 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें');
      return;
    }

    if (!/^\d+$/.test(mobileNumber)) {
      Alert.alert('त्रुटि', 'कृपया केवल संख्या दर्ज करें');
      return;
    }

    setLoading(true);
    
    try {
      // Navigate to KBC game with mobile number
      navigation.navigate('KBCGame', { mobile: mobileNumber.trim() });
    } catch (error) {
      Alert.alert('त्रुटि', 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।');
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
          <Text style={styles.title}>कौन बनेगा धर्मज्ञ</Text>
          <Text style={styles.subtitle}>Login to start the game</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mobile Number</Text>
            <TextInput
              style={styles.textInput}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="numeric"
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              placeholderTextColor="#95A5A6"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>वापस</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.startButton} 
            onPress={handleSubmit}
            disabled={loading}
          >
            <LinearGradient
              colors={['#127c28', '#0e6321']}
              style={styles.gradient}
            >
              <Text style={styles.startButtonText}>
                {loading ? 'Processing' : 'Start Game'}
              </Text>
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
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#127c28',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#2C3E50',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputContainer: {
    marginBottom: 20,
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
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#2C3E50',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#95A5A6',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    flex: 0.45,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
    flex: 0.45,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
