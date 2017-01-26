/* eslint-disable react-in-jsx-scope */
import React from 'react'
import { Button, Navbar, NavbarBrand, Nav, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';

export default class TopNav extends React.Component {

  render() {
    return(
    <Navbar className="navbar fixed-top">
      <Nav className="mr-auto">
        <Breadcrumb tag="nav">
          <NavbarBrand tag={Link} to={"/"} className="navbar-toggler-left breadcrumb-item-first">PULSE</NavbarBrand>
          <BreadcrumbItem tag="a" href="#" className="navbar-brand">{this.props.message !== 'undefined' ? this.props.message : ''}</BreadcrumbItem>
        </Breadcrumb>
  		<Button color="primary" className="navbar-toggler-right">Get the App</Button>
      </Nav>
    </Navbar>
    )
  }
}