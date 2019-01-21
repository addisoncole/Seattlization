import React, { Component } from 'react';
import NavItem from './NavItem';
import './Nav.css';

const NAVLINKS = [
  {route: "/sound", title: "the sound"},
  {route: "/numbers", title: "the numbers"},
  {route: "/about", title: "about"}
]

class Nav extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    const displayLinks = NAVLINKS.map((link, i) => {
      return (
        <NavItem key={i} route={link.route} title={link.title} />
      )
    });

    return (
        <div className="nav">
          {displayLinks}
        </div>
    )
  }
}

export default Nav;
