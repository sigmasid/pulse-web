import React from 'react';
import ReactFireMixin from 'reactfire';
import * as firebase from "firebase";

import { Alert, Row, Col, Badge, Jumbotron, Container, Card, CardBlock, CardFooter } from 'reactstrap';
import AnswerThumbComponent from './AnswerThumbComponent.js';
import AnswerVideoComponent from './AnswerVideoComponent.js';
import UserSummary from './UserSummaryComponent.js';

var QuestionHeader = React.createClass({
	getLength(length) {
    	return (<Badge color="default" pill>{length > 1 ? length + " Answers" : length + " Answer"}</Badge>);
  	},
	render: function() {
		return(
			<Jumbotron className="Question-header text-center" color="white">
      			<h1>{this.props.question.title}</h1>
      			<small className="text-muted">Answers: { this.props.question.hasOwnProperty("answers") ? 
      													this.getLength(Object.keys(this.props.question.answers).length) : 
      													"No Answers" }
      			</small>
	        </Jumbotron>
		);
	}
});

var AnswerDetailComponent = React.createClass({
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

var AnswersComponent = React.createClass({
	mixins: [ReactFireMixin],

	hideDetail: function() {
		this.setState({
			selectedAnswer: '',
			selectedUser: '',
			showDetail: false
		})
	},

	showDetail: function(selected, selectedUser) {
		this.setState({
			showDetail: true,
			selectedUser: selectedUser,
			selectedAnswerID: selected
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
		firebase.database().ref('questions').child(this.props.params.questionID).once('value').then(function(snapshot) {
			this.setState({
				currentQuestion: snapshot.val(),
				answersID: snapshot.val().answers
			})
		}.bind(this));
	},

	render: function() {
		var videoDetail = (this.state.showDetail) ?
			<AnswerVideoComponent user={this.state.selectedUser} question={this.state.currentQuestion} questionID={this.props.params.questionID} answerID={this.state.selectedAnswerID} onClose={this.hideDetail} /> :
			null;

	    var createItem = function(answer, index) {
	      return(
	      	<Col sm="4" md="3" key={answer}>
	        	<AnswerDetailComponent answerID={answer} onClick={this.showDetail} />
	        </Col>
	    )}.bind(this);

	    return (
	    	<Container fluid>
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

export default AnswersComponent