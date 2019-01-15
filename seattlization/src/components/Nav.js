import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavItem from './NavItem';
import './Nav.css';

const NAVLINKS = [
  {route: "/sound", title: "the sound"},
  {route: "/data", title: "the data"},
  {route: "/about", title: "about"}
]

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const displayLinks = NAVLINKS.map((link, i) => {
      return (
        <NavItem id={i} route={link.route} title={link.title} />
      )
    });

    return (
        <div className="nav">
          {displayLinks}
        </div>
    )
  }
}

Nav.propTypes = {
  
};


export default Nav;
