import React from 'react';
import * as firebase from "firebase";

import { Link } from 'react-router';
import { Alert, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Container, Jumbotron, Card, CardFooter, CardTitle, CardBlock, Col, Row } from 'reactstrap';
import classnames from 'classnames';

import AnswerThumbComponent from './AnswerThumbComponent.js';
import AnswerVideoComponent from './AnswerVideoComponent.js';
import Helmet from 'react-helmet';

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
        	<Col lg="3" md="4" sm="6" xs="12" key={answer} className="pb-3">
	        	<Card className="Answer-thumb">
	       			<AnswerThumbComponent answerID={answer} onClick={this.showDetail} />
	       			<AnswerQuestionComponent questionID={this.props.userAnswers[answer]} onClick={this.showDetail} />
	        	</Card>
        	</Col>
	    )}.bind(this);

	    if (typeof this.props.userAnswers !== 'undefined') {
		    return (
		    	<Container className="Answers-content">
		    		<Row className={ this.state.showDetail ? 'hidden-xs-up' : ''}>
		    			{ Object.keys(this.props.userAnswers).map(createItem) }
		    		</Row>
		    		<Row className={ this.state.showDetail ? 'show pb-4' : 'invisible'}>
		    			{ this.state.showDetail ? videoDetail : null }
		    		</Row>
		    	</Container>
		    );
	    } else {
		    return (
	    	<Container className="Profile-answers">
		    	<Row>
		    		<Col xs="12">
		    		    <Alert color="warning text-center">
    						<strong>Still to come!</strong> This user has not answered any questions yet!
  						</Alert>
  					</Col>
		    	</Row>
		    </Container>
		    );
	    }	
	}
});

var UserProfileComponent = React.createClass({
	contextTypes: {
    	setSelected: React.PropTypes.func.isRequired
  	},

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

		if (typeof this.props.selected.name !== 'undefined') {
			this.setState({
	    		user: this.props.selected
	    	})
		} else {
		    firebase.database().ref('userPublicSummary').child(userID).once('value').then(function(snapshot) {
		    	this.setState({
		    		user: snapshot.val()
		    	})
		    	this.context.setSelected(snapshot.val(), true);
		    }.bind(this)); 
	    }   

	   	firebase.database().ref('userDetailedPublicSummary').child(userID).once('value').then(function(snapshot) {
	    	this.setState({
	    		detailedUser: snapshot.val()
	    	})
	    	this.toggle('1');
	    }.bind(this)); 	
	},

	render: function() {
		var capitalizeFirstLetter = function(title) {
      		return typeof title !== 'undefined' || '' ? title.charAt(0).toUpperCase() + title.slice(1) : '';
    	};

    	var addMeta = <Helmet 
	    			title={ capitalizeFirstLetter(typeof this.state.user.name !== 'undefined' ? this.state.user.name : '') } 
	    			meta={[
    					{"name": "description", "content": typeof this.state.user.shortBio !== 'undefined' ? this.state.user.shortBio : ''},
    					{property: "og:type", content: "profile"},
    					{property: "og:profile:first_name", content: typeof this.state.user.name !== 'undefined' ? this.state.user.name.split(' ')[0] : ''},
    					{property: "og:profile:last_name", content: typeof this.state.user.name !== 'undefined' ? this.state.user.name.split(' ')[1] : ''},
	    				]}
	    			/>;

	    return(
	    	<Container fluid>
	    		{addMeta}
	          	<UserProfileHeader user={this.state.user} />
      	        <Nav pills className="container User-sub-nav">
		          <NavItem>
		            <NavLink
		              className={classnames({ active: this.state.activeTab === '1' })}
		              onClick={() => { this.toggle('1'); }}>
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
         	        	<UserAnswers userSummary={this.state.user} userAnswers={this.state.detailedUser.answers} userID={this.props.params.uID} /> : '' 
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
