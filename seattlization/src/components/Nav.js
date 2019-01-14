import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <div className="nav">
          <h2><small><Link to= "/sound">the sound</Link></small></h2>
          <h2><small><Link to= "/data">the data</Link></small></h2>
          <h2><small><Link to= "/about">about</Link></small></h2>
        </div>
    )
  }

}


export default Nav;
