import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import HeaderContainer from './HeaderContainer';

import './AboutContainer.css';

class AboutContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <HeaderContainer />
      </div>
    )
  }
}

AboutContainer.propTypes = {

};

export default AboutContainer;
