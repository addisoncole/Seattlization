import React, { Component } from 'react';
import DataSet from './components/DataSet';
import './App.css';

import Nav from './components/Nav';


class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="title-container">
            <h1>Seattlization</h1>
          </div>
          <Nav />
        </header>
        <DataSet />
      </div>
    );
  }
}

export default App;
