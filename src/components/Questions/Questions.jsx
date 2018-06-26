import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Question from '../Question/Question';
import QuestionList from '../QuestionList/QuestionList';

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      isLoading: false,
      currentQuestion: 0
    };

    this.sendAnswers = this.sendAnswers.bind(this);
  }

  componentDidMount() {
    fetch(`https://opentdb.com/api.php?amount=${this.props.amount}`)
            .then((response) => response.json())
            .then((body) => {
              this.setState({
                questions: body.results,
                isLoading: true,
              });
            });
  }

  sendAnswers(selectedAnswers) {
    const newQuestions = this.state.questions;
    newQuestions[this.state.currentQuestion].answers = selectedAnswers;

    this.setState({
      questions: newQuestions,
      currentQuestion: this.state.currentQuestion + 1
    });
  }

  render() {
    if (!this.state.isLoading) {
      return (
                <div>Loading...</div>
      );
    }

    if (this.state.currentQuestion === this.props.amount) {
      return (
                <div>
                    <QuestionList questions={this.state.questions} difficulty={'hard'} />
                    <QuestionList questions={this.state.questions} difficulty={'medium'} />
                    <QuestionList questions={this.state.questions} difficulty={'easy'} />
                </div>
      );
    }

    const currentQuestion = this.state.questions[this.state.currentQuestion];
    const questionProps = { ...currentQuestion, sendAnswers: this.sendAnswers };

    return (
            <div>
                <Question {...questionProps} />
            </div>
    );
  }
}

Questions.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default Questions;
