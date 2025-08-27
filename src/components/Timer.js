import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

function CountdownTimer({ initialSeconds = 900, onTimeUp }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  
  const calculateTimeLeft = (remainingSeconds) => {
    if (remainingSeconds <= 0) {
      return { minutes: 0, seconds: 0 };
    }
    
    return {
      minutes: Math.floor(remainingSeconds / 60),
      seconds: remainingSeconds % 60
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(seconds));

  useEffect(() => {
    if (seconds <= 0) {
      if (onTimeUp) {
        onTimeUp();
      }
      return;
    }

    const timer = setTimeout(() => {
      const newSeconds = seconds - 1;
      setSeconds(newSeconds);
      setTimeLeft(calculateTimeLeft(newSeconds));
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, onTimeUp]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerTitle}>Timer</Text>
      {seconds > 0 ? (
        <Text style={styles.timerText}>
          {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </Text>
      ) : (
        <Text style={styles.timeUpText}>Time's up!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 10,
  },
  timerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    fontFamily: 'monospace',
  },
  timeUpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
});

export default CountdownTimer;
