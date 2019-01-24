import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';

import DataContainer from './components/DataContainer';
import SoundContainer from './components/SoundContainer';
import WelcomeComponent from './components/WelcomeComponent';
import AboutContainer from './components/AboutContainer';

class App extends Component {

  // constructor() {
  //   super();
  // }

  render() {
    return (
      <div className="app">
        <Route path="/" exact="true" render={() => <WelcomeComponent/>} />
        <Route path="/sound" render={() => <SoundContainer/>}/>
        <Route path="/numbers" render={() => <DataContainer/>} />
        <Route path="/about" render={() => <AboutContainer/>}/>
      </div>
    );
  }
}

export default App;
