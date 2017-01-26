import React from 'react';
import { Row, Col } from 'reactstrap';

var UserSummary = React.createClass({
	render: function() {
	    return(
	    	<Row className="User-summary">
    			<img src={this.props.user.thumbPic} alt={this.props.user.name} className="offset-1 rounded-circle img-thumbnail" />
	    		<Col xs="8">
	    			<small className="User-summary text-capitalize font-weight-bold">{this.props.user.name}<br/></small>
	    			<small className="User-summary text-capitalize text-muted">{this.props.user.shortBio}</small>
	    		</Col>
	        </Row>
	    );	
	}
});

export default UserSummary