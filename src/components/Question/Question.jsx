import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import { Radio, RadioGroup } from 'react-radio-group';

import './Question.css'
export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnswers: this.props.type === 'boolean' ? null : [],
      answers: this.props.incorrect_answers.concat([this.props.correct_answer]).sort((a, b) => a[0] - b[0])
    };

    this.createCheckbox = this.createCheckbox.bind(this);
    this.createRadio = this.createRadio.bind(this);
    this.toggleAnswers = this.toggleAnswers.bind(this);
    this.sendAnswers = this.sendAnswers.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedAnswers: nextProps.type === 'boolean' ? null : [],
      answers: nextProps.incorrect_answers.concat([nextProps.correct_answer]).sort((a, b) => a[0] - b[0])
    });
  }

  createCheckbox() {
    return (
            <CheckboxGroup
                checkboxDepth={2}
                name='answers'
                value={this.state.selectedAnswers}
                onChange={this.toggleAnswers}>

                {this.state.answers.map((answer, i) => (<div key={i}><Checkbox value={answer}/>{answer}</div>))}

            </CheckboxGroup>
    );
  }

  createRadio() {
    return (
            <RadioGroup
                name='answers'
                selectedValue={this.state.selectedAnswers}
                onChange={this.toggleAnswers}>

                {this.state.answers.map((answer, i) => (<div key={i}><Radio value={answer}/>{answer}</div>))}

            </RadioGroup>
    );
  }

  toggleAnswers(newAnswers) {
    this.setState({
      selectedAnswers: newAnswers
    });
  }

  sendAnswers() {
    if (!this.state.selectedAnswers || !this.state.selectedAnswers.length) {
      return;
    }

    this.props.sendAnswers(this.state.selectedAnswers);
  }

  render() {
    return (
            <div className='Question'>
                <div>{this.props.question}</div>
                <div className='Question__answers'>{this.props.type === 'boolean' ? this.createRadio() : this.createCheckbox()}</div>
                <button onClick={this.sendAnswers}>Send!</button>
            </div>
    );
  }

}

Question.propTypes = {
  correct_answer: PropTypes.string.isRequired,
  incorrect_answers: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  sendAnswers: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
