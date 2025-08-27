import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

function KbcResult({ 
  score, 
  totalQuestions, 
  playerName, 
  onPlayAgain, 
  onGoHome 
}) {
  const percentage = totalQuestions > 0 ? Math.round((score / (totalQuestions * 5000)) * 100) : 0;
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return 'उत्कृष्ट! आप एक सच्चे धर्मज्ञ हैं!';
    if (percentage >= 70) return 'बहुत अच्छा! आपका ज्ञान प्रशंसनीय है!';
    if (percentage >= 50) return 'अच्छा प्रदर्शन! और अभ्यास करें।';
    if (percentage >= 30) return 'ठीक है। और अध्ययन की आवश्यकता है।';
    return 'कोई बात नहीं। धर्म का अध्ययन जारी रखें।';
  };

  const getScoreColor = () => {
    if (percentage >= 70) return '#27ae60';
    if (percentage >= 50) return '#f39c12';
    return '#e74c3c';
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultCard}>
        <Text style={styles.title}>परिणाम</Text>
        
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{playerName}</Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>आपका स्कोर</Text>
          <Text style={[styles.score, { color: getScoreColor() }]}>
            {score.toLocaleString()}
          </Text>
          <Text style={styles.totalScore}>
            {(totalQuestions * 5000).toLocaleString()} में से
          </Text>
          <Text style={[styles.percentage, { color: getScoreColor() }]}>
            {percentage}%
          </Text>
        </View>

        <View style={styles.performanceContainer}>
          <Text style={styles.performanceMessage}>
            {getPerformanceMessage()}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>कुल प्रश्न</Text>
            <Text style={styles.statValue}>{totalQuestions}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>सही उत्तर</Text>
            <Text style={styles.statValue}>{Math.floor(score / 5000)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>गलत उत्तर</Text>
            <Text style={styles.statValue}>{totalQuestions - Math.floor(score / 5000)}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.playAgainButton} onPress={onPlayAgain}>
            <LinearGradient
              colors={['#127c28', '#0e6321']}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>फिर से खेलें</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={onGoHome}>
            <LinearGradient
              colors={['#1976d2', '#303f9f']}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>होम जाएं</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

KbcResult.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  playerName: PropTypes.string,
  onPlayAgain: PropTypes.func.isRequired,
  onGoHome: PropTypes.func.isRequired,
};

KbcResult.defaultProps = {
  playerName: 'खिलाड़ी',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#127c28',
    textAlign: 'center',
    marginBottom: 20,
  },
  playerInfo: {
    alignItems: 'center',
    marginBottom: 25,
  },
  playerName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  totalScore: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  performanceContainer: {
    backgroundColor: '#e8f5e8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
  },
  performanceMessage: {
    fontSize: 16,
    color: '#127c28',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  buttonContainer: {
    gap: 15,
  },
  playAgainButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  homeButton: {
    borderRadius: 12,
    overflow: 'hidden',
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
});

export default KbcResult;
