import React from 'react';
import * as firebase from "firebase";

import { Link } from 'react-router';
import { Alert, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Jumbotron, Card, CardFooter, CardTitle, CardBlock, Col, Row } from 'reactstrap';
import classnames from 'classnames';

import AnswerThumbComponent from './AnswerThumbComponent.js';
import AnswerVideoComponent from './AnswerVideoComponent.js';

var UserProfileHeader = React.createClass({
	render: function() {
		return(
			<Jumbotron className="User-profile-header text-center" color="white">
				<Container>
					<img src={this.props.user.thumbPic} alt={this.props.user.name} className="rounded-circle img-thumbnail" />
	      			<h1 className="display-4 text-capitalize">{this.props.user.name}</h1>
          			<p className="lead text-capitalize">{this.props.user.hasOwnProperty('shortBio') ? this.props.user.shortBio : ''}</p>
	        	</Container>
	        </Jumbotron>
	    );
	}
});


///NOT USED BUT USEFUL IF WE NEED TO SEARCH THROUGH ARRAY OF OBJECTS
function getQuestionID(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return arr[i]['.value'];
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

var UserExpertiseTag = React.createClass({
  	getInitialState: function() {
    	return {
      		tagTitle: ''
    	};
  	},

  	componentDidMount: function() {
		firebase.database().ref('/tags/' + this.props.tagID).child('title').once('value').then(function(snapshot) {
  			this.setState({
    			tagTitle: snapshot.val()
  			})
    	}.bind(this));
	},

	render: function() {
	    return (
	    	<Card>
	    		<CardBlock>
	    		    <CardTitle>
	    		    	<Link to={`/c/${this.props.tagID}`}>{"# "+this.state.tagTitle}</Link>
	    		    </CardTitle>
	    		</CardBlock>
	    		<CardFooter>
	    			<Link to={`/c/${this.props.tagID}`}>See Details</Link>
	    		</CardFooter>
	    	</Card>
	    );	
	}
});

var UserExpertise = React.createClass({
	render: function() {

	    var createItem = function(tagID, index) {
	      	return(
        	<Col md="3" sm="6" xs="12" key={tagID} className="col">
	       		<UserExpertiseTag tagID={tagID} />
        	</Col>
	    )};

	    return (
	    	<Container className="Profile-expertise">
	    		<Row>{typeof this.props.expertiseTags !== 'undefined' ? 
	    			Object.keys(this.props.expertiseTags).map(createItem) : 
	    			<Col xs="12">
		    		    <Alert color="warning text-center">
    						<strong>Still to come!</strong> This user has not yet been endored as an expert yet!
  						</Alert>
  					</Col>
      				}
	    		</Row>
	    	</Container>
	    );	
	}
});

var AnswerQuestionComponent = React.createClass({
	getInitialState: function() {
	    return {
	      question: '',
	    };
  	},

	componentWillMount: function() {
	    firebase.database().ref('/questions/' + this.props.questionID).once('value').then(function(snapshot) {
			this.setState({
				question: snapshot.val()
			})
	    }.bind(this));
	},

	render: function() {
	    return (
	    	<CardFooter>{this.state.question.title}</CardFooter>
	    );	
	}
});

var UserAnswers = React.createClass({
	hideDetail: function() {
		this.setState({
			selectedAnswer: '',
			showDetail: false
		})
	},

	showDetail: function(selected) {
		var questionID = this.props.userAnswers[selected];
	    firebase.database().ref('/questions/' + questionID).once('value').then(function(snapshot) {
			this.setState({
				showDetail: true,
				selectedAnswerID: selected,
				selectedQuestion: snapshot.val(),
				selectedQuestionID: questionID
			})
	    }.bind(this));
	},

	getInitialState: function() {
	    return {
	      	selectedAnswer: '',
	      	showDetail: false,
	      	selectedQuestion: ''
	    };
  	},

	render: function() {
		var videoDetail = (this.state.showDetail) ?
			<AnswerVideoComponent user={this.props.userSummary} questionID={this.state.selectedQuestionID} question={this.state.selectedQuestion} answerID={this.state.selectedAnswerID} onClose={this.hideDetail} /> :
			null;

	    var createItem = function(answer, index) {
	      	return(
        	<Col md="3" sm="6" xs="12" key={answer} className="col">
	        	<Card>
	       			<AnswerThumbComponent answerID={answer} onClick={this.showDetail} />
	       			<AnswerQuestionComponent questionID={this.props.userAnswers[answer]} onClick={this.showDetail} />
	        	</Card>
        	</Col>
	    )}.bind(this);

	    return (
	    	<Container className="Profile-answers">
	    		<Row>{Object.keys(this.props.userAnswers).map(createItem)}</Row>
	    		<div>{videoDetail}</div>
	    	</Container>
	    );	
	}
});

var UserProfileComponent = React.createClass({
	getInitialState: function() {
	    return {
	      user: '',
	      detailedUser: ''
	    };
  	},

	toggle: function(tab) {
		if (this.state.activeTab !== tab) {
		this.setState({
			activeTab: tab
		});
		}
	},

	componentWillMount: function() {
		var userID = this.props.params.uID;

		if (typeof this.props.userID !== 'undefined') {
			userID = this.props.uID;
		}

	    firebase.database().ref('userPublicSummary').child(userID).once('value').then(function(snapshot) {
	    	this.setState({
	    		user: snapshot.val()
	    	})
	    }.bind(this));    

	   	firebase.database().ref('userDetailedPublicSummary').child(userID).once('value').then(function(snapshot) {
	    	this.setState({
	    		detailedUser: snapshot.val()
	    	})
	    	this.toggle('1');
	    }.bind(this)); 	
	},

	render: function() {
	    return(
	    	<Container fluid>
	          	<UserProfileHeader user={this.state.user} />
      	        <Nav pills className="container User-sub-nav">
		          <NavItem>
		            <NavLink
		              className={classnames({ active: this.state.activeTab === '1' })}
		              onClick={() => { this.toggle('1'); }}
		            >
		              Answers
		            </NavLink>
		          </NavItem>
		          <NavItem>
		            <NavLink
		              className={classnames({ active: this.state.activeTab === '2' })}
		              onClick={() => { this.toggle('2'); }}
		            >
		              Expertise
		            </NavLink>
		          </NavItem>
		        </Nav>
                <TabContent activeTab={this.state.activeTab}>
		          <TabPane tabId="1">
         	        { this.state.detailedUser !== '' ? 
         	        	<UserAnswers userSummary={this.state.user} userAnswers={this.state.detailedUser.answers} userID={this.props.params.uID} /> : 
         	        	'' 
         	        }
		          </TabPane>
		          <TabPane tabId="2">
        	        { this.state.detailedUser !== '' ? <UserExpertise expertiseTags={this.state.detailedUser.expertiseTags} userID={this.props.params.uID} /> : '' }		          	
		          </TabPane>
		        </TabContent>
	        </Container>
	    );	
	}
});

export default UserProfileComponent
