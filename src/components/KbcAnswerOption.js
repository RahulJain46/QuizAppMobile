import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

function KbcAnswerOption({ 
  answerContent, 
  answer, 
  questionId, 
  onAnswerSelected,
  disabled = false 
}) {
  const isSelected = answerContent === answer;
  const isYesOption = answerContent === "YES";
  
  const handlePress = () => {
    if (!disabled && !answer) {
      onAnswerSelected(answerContent, questionId);
    }
  };

  const getButtonStyle = () => {
    if (isSelected) {
      return [styles.button, styles.selectedButton];
    }
    if (isYesOption) {
      return [styles.button, styles.yesButton];
    }
    return [styles.button, styles.noButton];
  };

  return (
    <TouchableOpacity 
      style={getButtonStyle()}
      onPress={handlePress}
      disabled={disabled || !!answer}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.buttonText,
        isSelected && styles.selectedText
      ]}>
        {answerContent}
      </Text>
    </TouchableOpacity>
  );
}

KbcAnswerOption.propTypes = {
  answerContent: PropTypes.string.isRequired,
  answer: PropTypes.string,
  questionId: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  yesButton: {
    backgroundColor: '#78aadf',
    borderColor: '#5a8cbf',
  },
  noButton: {
    backgroundColor: '#89eddf59',
    borderColor: '#6bc7b8',
  },
  selectedButton: {
    backgroundColor: '#127c28',
    borderColor: '#0e6321',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default KbcAnswerOption;
