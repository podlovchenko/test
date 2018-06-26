import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import './QuestionList.css';

export default class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredQuestions: this.props.questions.filter((item) => item.difficulty === this.props.difficulty),
    };
  }

  render() {
      const {filteredQuestions} = this.state;

      if (!filteredQuestions.length) {
          return null;
      }

      return (
          <div>
              <div className='type'>{this.props.difficulty}</div>
              {this.state.filteredQuestions.map((item, i) => {
                  const diff = _.xor(item.answers, item.correct_answer);

                  let state = true;

                  if (diff.length) {
                      state = false;
                  }

                  return (
                      <div className={state ? 'true' : 'false'} key={i}>
                          <div>{item.question}</div>
                          <div>{item.answers}</div>
                      </div>
                  );
              })}
          </div>
      );
  }
}

QuestionList.propTypes = {
  difficulty: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
};
