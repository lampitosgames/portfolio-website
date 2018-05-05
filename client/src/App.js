import React, { Component } from 'react';
import TestComponent from './components/TestComponent.js';
//Import css file
//TODO: Add SCSS support
import './index.css';

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
