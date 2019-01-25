import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import HeaderContainer from './HeaderContainer';
import cart from './cart.jpg';

import './AboutContainer.css';

class AboutContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <HeaderContainer />
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}>
          <div className="contrast-wrap">
            <img alt="unattended shopping cart with belongings" className="cart-image" src={cart} />
          </div>
          <div className="about-container">
            <h2 className="about-title">About the Project</h2>
            <h2 className="about-title">About the Creator</h2>
          </div>
          <div className="about-container-center">
            <h2 className="about-title">Methodology</h2>
          </div>
        </CSSTransitionGroup>
      </div>
    )
  }
}

AboutContainer.propTypes = {

};

export default AboutContainer;
