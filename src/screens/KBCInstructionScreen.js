import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function KBCInstructionScreen({ navigation }) {
  const handleStartKBC = () => {
    navigation.navigate('QuizLogin');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>कौन बनेगा धर्मज्ञ</Text>
          <Text style={styles.subtitle}>गेम के नियम</Text>
        </View>

        <View style={styles.instructionsContainer}>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>1.</Text>
            <Text style={styles.instructionText}>
              प्रत्येक प्रश्न 5000 अंक का होगा।
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>2.</Text>
            <Text style={styles.instructionText}>
              अधिकतम 20 प्रश्न होंगे व् अधिकतम एक लाख का स्कोर होगा। सभी 20 प्रश्न का सही उतर देने पर आप धर्मज्ञ बनेगे ।
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>3.</Text>
            <Text style={styles.instructionText}>
              समय की कोई सीमा नहीं है।
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>4.</Text>
            <Text style={styles.instructionText}>
              सहायता के लिए आप हेल्प लाइन "FLIP THE QUESTION" का एक बार प्रयोग कर आप प्राप्त प्रश्न को बदल सकते है।
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>5.</Text>
            <Text style={styles.instructionText}>
              किसी भी प्रश्न का गलत उत्तर देने पर प्रतियोगिता समाप्त हो जावेगी व् आपका अंतिम स्कोर प्रदर्शित हो जावेगा। आप अन्य प्रतियोगियों की तुलना में अपना वरीयता क्रम देख सकेंगे।
            </Text>
          </View>

          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>6.</Text>
            <Text style={styles.instructionText}>
              एक ही प्रतियोगी चाहे जितनी बार यह गेम खेल सकता है, हर बार नए प्रश्न प्राप्त होंगे।
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>वापस</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.startButton} onPress={handleStartKBC}>
            <LinearGradient
              colors={['#127c28', '#0a5a1a']}
              style={styles.gradient}
            >
              <Text style={styles.startButtonText}>START</Text>
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
  instructionsContainer: {
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
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#127c28',
    marginRight: 10,
    marginTop: 2,
  },
  instructionText: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
    lineHeight: 22,
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
