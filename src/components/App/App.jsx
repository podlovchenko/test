import './App.css';

import React, { Component } from 'react';

import Questions from '../Questions/Questions';

class App extends Component {
  render() {
    return (
      <div className='App'>
          <div className='App__header'>
              Questions
          </div>
          <Questions amount={10}/>
      </div>
    );
  }
}

export default App;
