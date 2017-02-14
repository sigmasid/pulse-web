import React from 'react';
import * as firebase from "firebase";
import { Jumbotron, Card, CardTitle, CardText, Container, Alert, Label, Col, Form, FormGroup, Input, Button } from 'reactstrap';

var AccountCreated = React.createClass({
	render: function() {
		console.log(this.props.error);
		if (this.props.error !== '') {
			return(
				<Container className="Verification-form">
					<Alert color="danger text-center">Oh no! there was an error. Please see the details below</Alert>
				    <Card block>
	      				<CardTitle className="text-center">{this.props.error}</CardTitle>
			        	<CardText className="text-center">You can try submitting your request again or contact us for assistance at hi@checkpulse.co</CardText>
	      				<Button color="primary" onClick={this.props.tryAgain}>Try again</Button>
	    			</Card>
				</Container>
			);			
		} else {
			return(
				<Container className="Verification-form">
					<Alert color="success text-center">You are in! Your account has been created </Alert>
				    <Card block>
	      				<CardTitle className="text-center">Time to Get the App</CardTitle>
			        	<CardText className="text-center">Our app allows you to answer questions, message users and be part of the Pulse experience.</CardText>
	      				<Button color="primary">Download App</Button>
	    			</Card>
				</Container>
			);
		}
	}	
})

var InviteHeader = React.createClass({
	render: function() {
		return(
			<Jumbotron className="Question-header text-center" color="white">
      			<h1>{this.props.title === '' ? "Verifying Invite" : this.props.title}</h1>
      			<small className="text-muted">{this.props.subtitle === '' ? "" : this.props.subtitle}
      			</small>
	        </Jumbotron>
		);
	}
});

var VerificationForm = React.createClass({
  	getInitialState: function() {
    	return {
      	email: this.props.email,
      	name: this.props.name,
      	password: ''
    	};
  	},

	handleSubmit: function(event) {
		event.preventDefault();
		console.log('values are ' + this.state.name + ' ' + this.state.email + ' ' + this.state.password);
		this.props.claimAccount(this.state.name, this.state.email, this.state.password);
	},

	handleChange: function(type, event) {
      var change = {};
      change[type] = event.target.value;
      this.setState(change);
	},

	render: function() {
	return(
		<Container className="Verification-form">
	    	<Alert color="info text-center">
          		<strong>Let's get started!</strong> Please verify your information and select a password to claim your expert account!
        	</Alert>
			<Form onSubmit={this.handleSubmit}>
		  	<FormGroup row>
  	            <Label for="accountName" md={2} className="col-3 offset-sm-1">Full Name</Label>
  	            <Col md={8}>
		    		<Input name="name" placeholder="your name" id="accountName" className="form-control" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
		    	</Col>
		    </FormGroup>

		  	<FormGroup row>
  	            <Label for="accountEmail" md={2} className="col-3 offset-sm-1">Email</Label>
  	            <Col md={8}>
		    		<Input type="email" placeholder="your email" id="accountEmail" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
  	            </Col>
  	        </FormGroup>

		  	<FormGroup row>
  	            <Label for="accountPassword" md={2} className="col-3 offset-sm-1">Password</Label>
  	            <Col md={8}>
		    		<Input type="password" placeholder="choose a password" id="accountPassword" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
		   		</Col>
		   	</FormGroup>
		   	<Col xs={{ size: 9, offset: 3 }}>
	   			<Button color="primary">Submit</Button>
          	</Col>
			</Form>
		</Container>	
	)}
});

var InviteComponent = React.createClass({
  	getInitialState: function() {
    	return {
      	email: '',
      	name: '',
      	channel: '',
      	requestVerified: '',
      	accountCreated: false,
      	accountError: ''
    	};
  	},

  	componentDidMount: function() {
    	firebase.database().ref('/expertRequests/' + this.props.params.inviteID).once('value').then(function(snapshot) {
    		if (snapshot.exists()) {
    			this.setState({
        			email: snapshot.val().email,
        			name: snapshot.val().name,
        			requestVerified: true,
      			})
			} else {
				this.setState({
					requestVerified: false
				})
			}
    	}.bind(this));
  	},

  	tryAgain: function() {
  		this.setState({
  			accountCreated: false,
  			accountError: ''
  		})
  	},

  	claimAccount: function(name, email, password) {
  		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  			console.log('error is '+error)
			this.setState({
				accountError: error.message,
				accountCreated: true
			})
		}.bind(this));

		firebase.auth().onAuthStateChanged(function(user) {
		  	if (user) {
		  		firebase.database().ref('/expertRequests/' + this.props.params.inviteID).update({
		  			"name":name,
          			"accountCreated":user.uid
		  		});

				firebase.auth().signOut().then(function() {
					this.setState({
						accountCreated: true
					})
				}.bind(this));
			}
		}.bind(this));
  	},

	render: function() {

	var title = '';
	var subtitle = '';
	var verificationForm = <VerificationForm name={this.state.name} email={this.state.email} claimAccount={this.claimAccount} />;
	var invalidAlert = <Container className="Verification-form"><Alert color="warning text-center">Please contact us at hi@checkpulse.co for assistance!</Alert></Container>

	if (this.state.requestVerified === '') {
		title = "Verifying Request";
	} else if (this.state.requestVerified === false) {
		title = "Sorry! This invitation is invalid";
	} else if (this.state.requestVerified === true) {
		title = "Welcome " + this.state.name + "!";
		subtitle = "We are excited to get you on board!";
	}

	return(
		<Container fluid>
			<InviteHeader title={title} subtitle={subtitle} />
			{ this.state.requestVerified ? !this.state.accountCreated ? verificationForm : <AccountCreated error={this.state.accountError} tryAgain={this.tryAgain} /> : invalidAlert }
		</Container>
		)
	}
});

export default InviteComponent