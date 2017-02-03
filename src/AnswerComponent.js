import React from 'react';
import ReactFireMixin from 'reactfire';
import * as firebase from "firebase";

import { Alert, Row, Col, Badge, Jumbotron, Container, Card, CardBlock, CardFooter } from 'reactstrap';
import AnswerThumbComponent from './AnswerThumbComponent.js';
import AnswerVideoComponent from './AnswerVideoComponent.js';
import UserSummary from './UserSummaryComponent.js';
import Helmet from 'react-helmet';

var QuestionHeader = React.createClass({
	render: function() {
		return(
			<Jumbotron className="Question-header text-center" color="white">
      			<h1>{this.props.question.title}</h1>
      			<p className="lead">answer by: {this.props.user.name}</p>
	        </Jumbotron>
		);
	}
});


var AnswerComponent = React.createClass({
  	getInitialState: function() {
    	return {
      	answer: '',
      	user: ''
    	};
  	},

  	componentDidMount: function() {
    firebase.database().ref('/answers/' + this.props.answerID).once('value').then(function(snapshot) {
    	if (snapshot.val().hasOwnProperty('uID')) {
	   		firebase.database().ref('/userPublicSummary/' + snapshot.val().uID).once('value').then(function(userSnap) {
	    		this.setState({
	        		answer: snapshot.val(),
	        		user: userSnap.val()
	      		})
    		}.bind(this));
	   	}
    }.bind(this));
  	},

  	render: function() {
  	var userSummaryItem = null;

    if (this.state.user !== '') {
      userSummaryItem = <UserSummary user={this.state.user} />; 
    }

  	var postDate = new Date(this.state.answer.createdAt);
    return(
		<Card className="Answer-thumb">
   			<AnswerThumbComponent answerID={this.props.answerID} user={this.state.user} onClick={this.props.onClick} />
    		<CardBlock onClick={this.props.onClick.bind(null, this.props.answerID, this.state.user)}>
    			{userSummaryItem}
    		</CardBlock>
			<CardFooter>
				<small className="text-muted">Posted on { postDate.toLocaleDateString("en-US") }</small>
			</CardFooter>
		</Card>
    );
  }
});

var AnswerComponent = React.createClass({
	mixins: [ReactFireMixin],

	contextTypes: {
    	setSelected: React.PropTypes.func.isRequired
  	},

	hideDetail: function() {
		this.setState({
			selectedAnswer: '',
			selectedUser: '',
			showDetail: false,
			selectedThumbURL: ''
		})
	},

	showDetail: function(selected, selectedUser, selectedThumbURL) {
		this.setState({
			showDetail: true,
			selectedUser: selectedUser,
			selectedAnswerID: selected,
			selectedThumbURL: selectedThumbURL
		})
	},

	getInitialState: function() {
	    return {
	      answersID: [],
	      currentQuestion: '',
	      selectedAnswer: '',
	      showDetail: false
	    };
  	},
	componentDidMount: function() {
		if (typeof this.props.selected.tags !== 'undefined') {
	      this.setState({
	        currentQuestion: this.props.selected,
	        answersID: this.props.selected.answers
	      })
	    } else {
			firebase.database().ref('questions').child(this.props.params.questionID).once('value').then(function(snapshot) {
				this.setState({
					currentQuestion: snapshot.val(),
					answersID: snapshot.val().answers
				})
				this.context.setSelected(snapshot.val(), true);
			}.bind(this));
		}
	},

	render: function() {
		var capitalizeFirstLetter = function(title) {
      		return typeof title !== 'undefined' ? title.charAt(0).toUpperCase() + title.slice(1) : '';
    	};

    	<QuestionHeader user={this.}
		<AnswerVideoComponent user={this.state.selectedUser} 
							question={this.state.currentQuestion} 
							questionID={this.props.params.questionID} 
							answerID={this.state.selectedAnswerID} 
							onClose={this.hideDetail} 
							thumbURL={this.state.selectedThumbURL} />

	    return (
	    	<Container fluid>
	    	    {addMeta}
	    		<Container fluid>
    				<QuestionHeader question={this.state.currentQuestion} />
	    		</Container>
		    	<Container>
		    		<Row>{ typeof this.state.answersID !== 'undefined' ? 
		    			Object.keys(this.state.answersID).map(createItem) : 
		    		    <Col xs="12">
		    		    	<Alert color="warning text-center">
        						<strong>Sorry!</strong> No answers yet. Download the app to add your answer or send to an expert!
      						</Alert>
      					</Col>
		    		}</Row>
		    		<div>{videoDetail}</div>
		    	</Container>
	    	</Container>
	    );	
	}
});

export default AnswerComponent

