/* eslint-disable react-in-jsx-scope */
import React from 'react'
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';

export default class BottomNav extends React.Component {

  render() {
    return(
    <Navbar className="header" color="faded" light>
      <Nav className="ml-auto">
        <NavItem>
            <NavLink tag={Link} to={`/about`}>About</NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link} to={`/privacy`}>Privacy</NavLink>
        </NavItem>
        
        <NavItem>
          <NavLink tag={Link} to={`/terms`}>Terms</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
    )
  }
}