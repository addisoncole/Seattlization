import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Nav from './Nav';

import './HeaderContainer.css';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <header className="app-header">
        <div className="title-container">
          <h1 className="title"><Link to="/">Seattlization</Link></h1>
        </div>
        <Nav />
      </header>
    )
  }
}

HeaderContainer.propTypes = {

};

export default HeaderContainer;
