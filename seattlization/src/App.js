import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Seattlization</h1>
            <h2><small>The Sound The Data About</small></h2>
        </header>
        <p>Homeless Yearly Count: </p>
      </div>
    );
  }
}

export default App;
