import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import encampment from './Nickelsville.jpg';

import './WelcomeComponent.css';

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="front-page-container">
        <div className="gradient-wrap">
          <div className="contrast-wrap">
            <img alt="Tent Encampment, Nickelsville" className="encampment-image" src={encampment} />
          </div>
        </div>
          <h1 className="intro">Before, American cities worried about becoming the next <span className="span-intro">Manhattan</span>...
            Then, they feared the <span className="span-intro">San Franciso-ization</span> of their towns...Now, comes <span className="span-end">Seattlization.</span></h1>
          <h4 className="enter-button"><Link className="enter" to="/numbers">Enter</Link></h4>
      </div>
    )
  }
}

WelcomeComponent.propTypes = {

};

export default WelcomeComponent;
