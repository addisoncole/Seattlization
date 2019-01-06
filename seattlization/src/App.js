import React, { Component } from 'react';
import DataSet from './components/DataSet';
import './App.css';


class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1>Seattlization</h1>
            <h2><small>The Sound The Data About</small></h2>
        </header>
        <p>Homeless Yearly Count: </p>
        <DataSet />
      </div>
    );
  }
}

export default App;
