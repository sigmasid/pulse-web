/* esli nt-disable react-in-jsx-scope */
import React from 'react'
import { Button, Navbar, Nav, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router';
import pulseLogo from './images/pulse-logo-100.png'; // Tell Webpack this JS file uses this image
import pulseLogoText from './images/pulse-logo-text-only.png'
import 'bootstrap/dist/css/bootstrap.css';

export default class TopNav extends React.Component {

  render() {
    return(
      <Navbar className="navbar fixed-top container">
        <Nav className="mr-auto">
          <Breadcrumb tag="nav" className="navbar-brand">
            <BreadcrumbItem tag={Link} to={"/"} className="navbar-toggler-left breadcrumb-item">
              <img src={pulseLogo} alt="logo" className="nav-logo hidden-xs-down" />
              <img src={pulseLogoText} alt="Pulse" className="nav-logo" />
              <sub>beta</sub>
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="#" className="breadcrumb-item-first text-lower hidden-xs-down text-muted">
              {this.props.message !== 'undefined' ? this.props.message : ''}
            </BreadcrumbItem>
          </Breadcrumb>
    		<Button color="primary" className="navbar-toggler-right hidden-sm-up btn-sm">get app</Button>
        <Button color="primary" className="navbar-toggler-right hidden-xs-down">get app</Button>
        </Nav>
      </Navbar>
    )
  }
}