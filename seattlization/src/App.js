import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import DataSet from './components/DataSet';
import './App.css';

import Nav from './components/Nav';
import DataContainer from './components/DataContainer';
import SoundContainer from './components/SoundContainer';


class App extends Component {

  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="title-container">
            <h1 className="title"><Link to="/">Seattlization</Link></h1>
          </div>
          <Nav />
        </header>
        <Route path="/" exact="true" render={() => <DataContainer greet="Main Page Intro"/>} />
        <Route path="/sound" render={() => <SoundContainer/>}/>
        <Route path="/numbers" render={() => <DataContainer/>} />
        <Route path="/about" />
      </div>
    );
  }
}

export default App;
