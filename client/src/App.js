import React, { Component } from 'react';
import TestComponent from './components/TestComponent.js';
//Import scss file
import './index.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
          <TestComponent />
      </div>
    );
  }
}

export default App;
