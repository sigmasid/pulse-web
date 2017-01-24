/* eslint-disable react-in-jsx-scope */
import React from 'react'
import { Button, Navbar, NavbarBrand, Nav } from 'reactstrap';
import { Link } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';

export default class TopNav extends React.Component {

  render() {
    return(
    <Navbar className="navbar fixed-top">
      <Nav className="mr-auto">
        <NavbarBrand tag={Link} to={"/"} className="navbar-toggler-left">P U L S E</NavbarBrand>
  		<Button color="primary" className="navbar-toggler-right">Get the App</Button>
      </Nav>
    </Navbar>
    )
  }
}