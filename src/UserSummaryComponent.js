import React from 'react';
import { Row, Col } from 'reactstrap';

var UserSummary = React.createClass({
	render: function() {
	    return(
	    	<Row className="User-summary">
    			<img src={this.props.user.thumbPic} alt={this.props.user.name} className="rounded-circle img-thumbnail" />
	    		<Col xs="10" sm="8">
	    			<p className="User-summary-name text-capitalize font-weight-bold padding-0">{this.props.user.name}</p>
	    			<p className="User-summary-bio text-capitalize text-muted font-weight-normal padding-0">{this.props.user.shortBio}</p>
	    		</Col>
	        </Row>
	    );	
	}
});

export default UserSummary