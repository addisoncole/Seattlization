import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Route, NavLink } from 'react-router-dom';
import './NavItem.css';

class NavItem extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    return (
      <div>
        <h2 id={this.props.id}>
          <small>
            <NavLink to={this.props.route} className="nav-link" activeClassName="nav-link-selected">{this.props.title}</NavLink>
          </small>
        </h2>
      </div>
    )
  }
}

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default NavItem;
