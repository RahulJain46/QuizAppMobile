import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import KbcQuestion from './KbcQuestion';
import KbcQuestionCount from './KbcQuestionCount';
import KbcAnswerOption from './KbcAnswerOption';

function KbcQuiz({
  answer,
  answerOptions,
  question,
  questionId,
  questionTotal,
  onAnswerSelected
}) {
  return (
    <View style={styles.container}>
      <KbcQuestionCount
        counter={questionId}
        total={questionTotal}
      />
      
      <KbcQuestion content={question} />
      
      <View style={styles.answerOptionsContainer}>
        {answerOptions.map((option, index) => (
          <KbcAnswerOption
            key={option.answerOption || index}
            answerContent={option.answerOption || option}
            answer={answer}
            questionId={questionId}
            onAnswerSelected={onAnswerSelected}
          />
        ))}
      </View>
    </View>
  );
}

KbcQuiz.propTypes = {
  answer: PropTypes.string,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  answerOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default KbcQuiz;
