import React from 'react';
import * as firebase from "firebase";
import { Jumbotron, Card, CardTitle, CardText, Container, Alert, Label, Col, Form, FormGroup, Input, Button } from 'reactstrap';

var createReactClass = require('create-react-class');

var AccountCreated = createReactClass({
	render: function() {
		if (this.props.error !== '') {
			return(
				<Container className="Verification-form">
					<Alert color="danger text-center">Oh no! there was an error. Please see the details below</Alert>
				    <Card block>
	      				<CardTitle className="text-center">{this.props.error}</CardTitle>
			        	<CardText className="text-center">You can try submitting your request again or contact us for assistance at hi@getpulse.tv</CardText>
	      				<Button color="primary" onClick={this.props.tryAgain}>Try again</Button>
	    			</Card>
				</Container>
			);			
		} else {
			return(
				<Container className="Verification-form">
					<Alert color="success text-center"><strong>You are in! </strong>Your account has been created </Alert>
				    <Card block>
	      				<CardTitle className="text-center">Time to Get the App</CardTitle>
			        	<CardText className="text-center">Our app allows you to answer questions, message users and be part of the Pulse experience.</CardText>
	      				<a href="https://itunes.apple.com/us/app/pulse-channels-content-for-professionals/id1200702658?ls=1&mt=8" className="Get-app-btn btn btn-primary text-white">download app</a>
	    			</Card>
				</Container>
			);
		}
	}	
});

var ExistingUser = createReactClass({
	handleSubmit: function(event) {
		event.preventDefault();
		console.log('go to app store / open app');
	},

	render: function() {
		return(
		<Container className="Verification-form">
	    	<Alert color="info text-center">
          		<strong>Looks like you have a Pulse account!</strong> Download or open up the app to accept your invitation!
			</Alert>
		    <Card block>
	        	<CardText className="text-center col-10 col-md-8 offset-md-2 offset-1">Answer questions, share your perspectives, do interviews & tell your stories - a better way to collaborate, create & share with the Pulse App.</CardText>
  				<a href="https://itunes.apple.com/us/app/pulse-channels-content-for-professionals/id1200702658?ls=1&mt=8" className="Get-app-btn btn btn-primary text-white">download app</a>
				
			</Card>
		</Container>

		)
	}
});

var InviteHeader = createReactClass({
	render: function() {
		return(
			<Jumbotron className="Question-header text-center" color="white">
      			<h1>{this.props.title === '' ? "Verifying Invite" : this.props.title}</h1><br/>
      			<p className="text-muted">{this.props.subtitle1 === '' ? "" : this.props.subtitle1}<br/>
      			{this.props.subtitle2 === '' ? "" : this.props.subtitle2}</p>
	        </Jumbotron>
		);
	}
});

var VerificationForm = createReactClass({
  	getInitialState: function() {
    	return {
      	email: this.props.email,
      	name: this.props.name,
      	password: ''
    	};
  	},

	handleSubmit: function(event) {
		event.preventDefault();
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
          		<strong>Let's get started!</strong> Please verify your information and select a password so we can get you onboard!
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

var InviteComponent = createReactClass({
  	getInitialState: function() {
    	return {
      	toUserEmail: '',
      	toUserName: '',
      	approved: '',
      	toUserID: '',
      	accountError: '',
    	};
  	},

  	mainContent: function() {
  		var content = '';

  		if (!this.state.approved) {
  			content = <Container className="Verification-form"><Alert color="warning text-center">Please contact us at hi@getpulse.tv for assistance!</Alert></Container>
  		} else if (this.state.toUserID === '') {
  			content = <VerificationForm name={this.state.toUserName} email={this.state.toUserEmail} claimAccount={this.claimAccount} />
  		} else if (this.state.accountCreated === true) {
  			content = <AccountCreated error={this.state.accountError} tryAgain={this.tryAgain} />
  		} else {
  			content = <ExistingUser />
  		}

  		return(
  			<Container>{ content }</Container>
  		)
  	},

  	componentDidMount: function() {
    	firebase.database().ref('/invites/' + this.props.params.inviteID).once('value').then(function(snapshot) {
    		if (snapshot.exists()) {
    			this.setState({
        			toUserEmail: typeof snapshot.val().toUserEmail !== 'undefined' ? snapshot.val().toUserEmail  : '',
        			toUserName: typeof snapshot.val().toUserName !== 'undefined' ? snapshot.val().toUserName  : '',
        			toUserID: typeof snapshot.val().toUserID !== 'undefined' ? snapshot.val().toUserID  : '',
        			fromUserID: typeof snapshot.val().fromUserID !== 'undefined' ? snapshot.val().fromUserID  : '',
        			title: typeof snapshot.val().title !== 'undefined' ? snapshot.val().title  : '',
        			tagTitle: typeof snapshot.val().tagTitle !== 'undefined' ? snapshot.val().tagTitle  : '',
        			approved: snapshot.val().approved !== false,
        			type: typeof snapshot.val().type !== 'undefined' ? snapshot.val().type : '',
        			fromUserName: typeof snapshot.val().type !== 'undefined' ? snapshot.val().fromUserName : ''
      			})

			} else {
				this.setState({
					approved: false
				})
			}
    	}.bind(this));
  	},

  	tryAgain: function() {
  		this.setState({
  			accountError: ''
  		})
  	},

  	claimAccount: function(name, email, password) {
  		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;

			if (errorCode === 'auth/weak-password') {
			    alert('The password is too weak.');
			} else {
				alert(errorMessage);
			}
			
			this.setState({
				accountError: error.message,
			})
		}.bind(this));

		firebase.auth().onAuthStateChanged(function(user) {
		  	if (user) {
		  		firebase.database().ref('/invites/' + this.props.params.inviteID).update({
		  			"toUserName":name,
          			"toUserID":user.uid,
          			"accountCreated":true
		  		});

		  		firebase.database().ref('/userPublicSummary/' + user.uid).update({
		  			"name":name
		  		});

				firebase.auth().signOut().then(function() {
					this.setState({
						toUserID: user.uid,
						accountCreated: true
					})
				}.bind(this));
			}
		}.bind(this));
  	},

	render: function() {

	var title = '';
	var subtitle1 = '';
	var subtitle2 = '';

	if (this.state.approved === '') {
		title = "Verifying Request";
	} else if (this.state.approved === false) {
		title = "Sorry! This invitation is invalid";
	} else if (this.state.approved === true) {
		title = this.state.toUserName !== '' ? "Welcome " + this.state.toUserName + "!" : "Hi There!";
		if (this.state.type === 'contributorInvite' && this.state.fromUserID !== this.state.toUserID) {
			subtitle1 = "You have been recommended as an expert for Channel "+this.state.title;
			subtitle2 = "Pulse is home to top experts, critics & professionals - showcasing content, ideas & perspectives that matters. Want to join?";
		} else if (this.state.type === 'contributorInvite' && this.state.fromUserID === this.state.toUserID) {
			subtitle1 = "Thanks for your interest in being a contributor for "+this.state.title;
			subtitle2 = "Your request is pending - please check back again!";
		} else if (this.state.type === 'interviewInvite') {
			subtitle1 = "You received an interview invitation from "+this.state.fromUserName+" for the series "+this.state.tagTitle;
			subtitle2 = "Interviews are a great way to showcase your expertise and grow your brand - we hope you will join us!";
		} else if (this.state.type === 'questionInvite') {
			subtitle1 = "Could you help answer this question from "+this.state.fromUserName;
			subtitle2 = this.state.title;
		} else if (this.state.type === 'perspectiveInvite') {
			subtitle1 = "Could you share your perspectives on: ";
			subtitle2 = this.state.title;
		} else if (this.state.type === 'showcaseInvite') {
			subtitle1 = "You are invited to create a showcase!";
			subtitle2 = this.state.title;
		} else if (this.state.type === 'feedbackInvite') {
			subtitle1 = "Could you share your feedback on:";
			subtitle2 = this.state.title;
		}
	}

	return(
		<Container fluid>
			<InviteHeader title={title} subtitle1={subtitle1} subtitle2={subtitle2}/>
			{ this.mainContent() }
		</Container>
		)
	}
});

export default InviteComponent