import React, { Component } from 'react';
//Import scss file
import './scss/index.scss';

class App extends Component {
  render() {
    return (
      <div className={"app-container"}>
          <div className={"sidebar-wrap sidebar-active"}>Home</div>
          <div className={"content-wrap"}>Content</div>
      </div>
    );
  }
}

export default App;
