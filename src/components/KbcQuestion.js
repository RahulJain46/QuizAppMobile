import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

function KbcQuestion({ content }) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {content}
      </Text>
    </View>
  );
}

KbcQuestion.propTypes = {
  content: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#89eddf59',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 28,
  },
});

export default KbcQuestion;
