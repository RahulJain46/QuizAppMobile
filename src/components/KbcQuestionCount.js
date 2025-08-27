import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

function KbcQuestionCount({ counter, total }) {
  return (
    <View style={styles.container}>
      <Text style={styles.countText}>
        Question <Text style={styles.highlight}>{counter}</Text> of <Text style={styles.highlight}>{total}</Text>
      </Text>
    </View>
  );
}

KbcQuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5dc', // beige color
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  countText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#127c28',
  },
});

export default KbcQuestionCount;
