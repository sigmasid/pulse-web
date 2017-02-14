import React from 'react';
import * as firebase from "firebase";

import { Row, Badge, Jumbotron, Container, Card, CardBlock, CardFooter } from 'reactstrap';
import AnswerThumbComponent from './AnswerThumbComponent.js';
import AnswerVideoComponent from './AnswerVideoComponent.js';
import UserSummary from './UserSummaryComponent.js';
import Helmet from 'react-helmet';

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

var AnswerComponent = React.createClass({
  	getInitialState: function() {
    	return {
      	answer: '',
      	user: '',
      	question: ''
    	};
  	},

	hideDetail: function() {
		this.setState({
			showDetail: false
		})
	},

	showDetail: function() {
		this.setState({
			showDetail: true
		})
	},

  	componentDidMount: function() {
    	firebase.database().ref('/answers/' + this.props.params.aID).once('value').then(function(snapshot) {
    	if (snapshot.val().hasOwnProperty('uID')) {
	   		firebase.database().ref('/userPublicSummary/' + snapshot.val().uID).once('value').then(function(userSnap) {
	    		this.setState({
	        		answer: snapshot.val(),
	        		user: userSnap.val()
	      		})
    		}.bind(this));
		}

    	if (snapshot.val().hasOwnProperty('qID')) {
			firebase.database().ref('questions').child(snapshot.val().qID).once('value').then(function(qSnap) {
				this.setState({
					question: qSnap.val()
				});
			}.bind(this));
		}
    }.bind(this));
  	},

  	render: function() {
  	var userSummaryItem = null;

	var capitalizeFirstLetter = function(title) {
  		return typeof title !== 'undefined' ? title.charAt(0).toUpperCase() + title.slice(1) : '';
	};

	var videoDetail = (this.state.showDetail) ?
		<AnswerVideoComponent 	user={this.state.user} 
								question={this.state.question} 
								questionID={this.state.answer.qID} 
								answerID={this.props.params.aID} 
								onClose={this.hideDetail} 
								/> : null;

    if (this.state.user !== '') {
      userSummaryItem = <UserSummary user={this.state.user} />; 
    }

    var getQuestionTitle = function(question) {
    	return (typeof question !== 'undefined' ? question.title : '')
    };

    var metaDescription1 = " answer to \"" + getQuestionTitle(this.state.question) + "\" on Pulse";

  	var addMeta = <Helmet 
		title={ capitalizeFirstLetter(getQuestionTitle(this.state.question)) } 
		meta={[
			{"name": "description", "content": metaDescription1},
			{property: "og:title", content: getQuestionTitle(this.state.question)},
			{property: "og:type", content: "website"},
			]}
		/>;

  	var postDate = new Date(this.state.answer.createdAt);
    return(
    	<Container fluid>
    	    {addMeta}
    		<Container fluid>
				<QuestionHeader question={this.state.question} />
    		</Container>
	    	<Container className="Answer-content">
	    		<Row className={ this.state.showDetail ? 'hidden-xs-up' : ''}>
					<Card className="Answer-thumb Video-content">
			   			<AnswerThumbComponent answerID={this.props.params.aID} user={this.state.user} onClick={this.showDetail} />
			    		<CardBlock>
			    			{userSummaryItem}
			    		</CardBlock>
						<CardFooter>
							<small className="text-muted">Posted on { postDate.toLocaleDateString("en-US") }</small>
						</CardFooter>
					</Card>
	    		</Row>
	    		<Row className={ this.state.showDetail ? 'show pb-4' : 'invisible'}>
	    			{ this.state.showDetail ? videoDetail : null }
	    		</Row>
	    	</Container>
    	</Container>
    );
  }
});

export default AnswerComponent