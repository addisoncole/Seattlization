import axios from 'axios';
import PropTypes from 'prop-types';
import Tone from 'tone';
import React, { Component } from 'react';

import './SoundContainer.css';

class SoundContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <p>The Sound</p>
      </div>
    )
  }
}

SoundContainer.propTypes = {

};

export default SoundContainer;
