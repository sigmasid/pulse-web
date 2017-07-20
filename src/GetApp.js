import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import pulseLogoText from './images/pulse-logo-text-only.png'

var createReactClass = require('create-react-class');

var GetApp = createReactClass({
    getInitialState: function() {
        return {
            closed: false
        };
    },

    Close: function() {
        this.setState({
            closed: true
        });
    },

    render: function() {
    if (!this.state.closed) {
    return (
        <Container fluid className="Get-app">
            <div className="Divider-container">
                <div className="Divider-line"></div>
            </div>
        	<Container>
        		<Row className="Get-app-text align-items-center">
                    <Col xs="8" className="hidden-sm-up">
                        <a href={`/`}><img src={pulseLogoText} alt="Pulse" className="nav-logo" /><sub>beta</sub></a>
                    </Col>
        			<Col sm="6" className="hidden-xs-down">
        				<h6 className="font-weight-bold">
                            { typeof this.props.message !== 'undefined' ? this.props.message : 
        					"Subscribe to channels, join the discussion & showcase your expertise!"}
        				</h6>
        			</Col>
        			<Col xs="4" sm="2" className="offset-sm-2 text-right">
        				<Button color="primary" className="Get-app-btn">get app</Button>
    				</Col>
                    <Col sm="1" className="offset-sm-1 offset-md-0 hidden-xs-down">
                        <Button className="close" aria-label="Close" onClick={this.Close.bind(this, null)}>
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </Col>
        		</Row>
        	</Container>
        </Container>
        );
    } else if (this.state.closed){
        return(
        <Container fluid className="Get-app hidden-sm-up">
            <div className="Divider-container">
                <div className="Divider-line"></div>
            </div>
            <Container>
                <Row className="Get-app-text align-items-center">
                    <Col xs="8" className="hidden-sm-up">
                        <a href={`/`}><img src={pulseLogoText} alt="Pulse" className="nav-logo" /><sub>beta</sub></a>
                    </Col>
                    <Col sm="6" className="hidden-xs-down">
                        <h6 className="font-weight-bold">
                            { typeof this.props.message !== 'undefined' ? this.props.message : 
                            "Subscribe to channels, join the discussion & showcase your expertise!"}
                        </h6>
                    </Col>
                    <Col xs="4" sm="2" className="offset-sm-2 text-right">
                        <Button color="primary" className="Get-app-btn">get app</Button>
                    </Col>
                    <Col sm="1" className="offset-sm-1 offset-md-0 hidden-xs-down">
                        <Button className="close" aria-label="Close" onClick={this.Close.bind(this, null)}>
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Container>
        )
    }
  }
})

export default GetApp