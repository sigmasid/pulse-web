/* esli nt-disable react-in-jsx-scope */
import React from 'react'
import { Button, Navbar, Nav, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router';

import 'bootstrap/dist/css/bootstrap.css';

export default class TopNav extends React.Component {

  render() {
    return(
    <Navbar className="navbar fixed-top">
      <Nav className="mr-auto">
        <Breadcrumb tag="nav" className="navbar-brand">
          <BreadcrumbItem tag={Link} to={"/"} className="navbar-toggler-left breadcrumb-item">PULSE</BreadcrumbItem>
          <BreadcrumbItem tag="a" href="#" className="breadcrumb-item-first text-lower hidden-xs-down">
            {this.props.message !== 'undefined' ? this.props.message : ''}
          </BreadcrumbItem>
        </Breadcrumb>
  		<Button color="primary" className="navbar-toggler-right">Get App</Button>
      </Nav>
    </Navbar>
    )
  }
}