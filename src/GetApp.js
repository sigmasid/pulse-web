import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap';

var GetApp = React.createClass({
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
        			<Col xs="8" sm="6">
        				<h6 className="font-weight-bold">
                            { typeof this.props.message !== 'undefined' ? this.props.message : 
        					"Subscribe to channels, ask questions & see full answers!"}
        				</h6>
        			</Col>
        			<Col xs="3" sm="2" className="offset-sm-2 text-right">
        				<Button color="primary">Get App</Button>
    				</Col>
                    <Col xs="1" className="offset-sm-1 offset-md-0">
                        <Button className="close" aria-label="Close" onClick={this.Close.bind(this, null)}>
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </Col>
        		</Row>
        	</Container>
        </Container>
    );
    } else {
        return(null);
    }
  }
})

export default GetApp