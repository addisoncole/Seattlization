import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import DataSet from './components/DataSet';
import './App.css';

import Nav from './components/Nav';


class App extends Component {

  constructor() {
    super();

    this.state = {
      currentPage: "/",
    }
  }

  changeCurrentPage = (page) => {
    console.log(page);
    this.setState({
      currentPage: page,
    })
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="title-container">
            <h1 className="title"><Link to="/">Seattlization</Link></h1>
          </div>
          <Nav />
        </header>
        <Route path="/sound" exact="true" render={() => <DataSet />} />
      </div>
    );
  }
}

export default App;
