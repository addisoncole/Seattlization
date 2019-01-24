import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import encampment from './Nickelsville.jpg';

import './WelcomeComponent.css';

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="front-page-container">
        <div className="box-overlay"></div>
        <div className="gradient-wrap">
          <div className="contrast-wrap">
            <img alt="Tent Encampmennt, Nickelsville" className="encampment-image" src={encampment} />
          </div>
        </div>
      </div>
    )
  }
}

WelcomeComponent.propTypes = {

};

export default WelcomeComponent;
