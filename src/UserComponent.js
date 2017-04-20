import React from 'react';
import * as firebase from "firebase";

import { Alert, Container, Jumbotron, Col, Row } from 'reactstrap';

import ItemDetail from './ItemDetailComponent.js';
import ItemVideoComponent from './ItemVideoComponent.js';
import Helmet from 'react-helmet';

//const util = require('util') //print an object

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
/* function getQuestionID(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return arr[i]['.value'];
        }
    }
    return -1; //to handle the case where the value doesn't exist
} */

var UserProfileComponent = React.createClass({
	contextTypes: {
    	setSelected: React.PropTypes.func.isRequired
  	},

  	showDetail: function(selected, selectedUser, selectedThumbURL) {
    this.setState({
      showDetail: true,
      selectedUser: selectedUser,
      selectedItem: selected,
      selectedThumbURL: selectedThumbURL
    })
  },

  hideDetail: function() {
    this.setState({
      selectedItem: '',
      selectedUser: '',
      showDetail: false
    })
  },

	getInitialState: function() {
	    return {
	      	user: '',
	      	userItems: '',
        	showDetail: false
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

	   	firebase.database().ref('userDetailedPublicSummary').child(userID).child('items').once('value').then(function(snapshot) {
	    	this.setState({
	    		userItems: snapshot.val()
	    	})
	    }.bind(this)); 	
	},

	render: function() {
		var capitalizeFirstLetter = function(title) {
      		return typeof title !== 'undefined' || '' ? title.charAt(0).toUpperCase() + title.slice(1) : '';
    	};

	   	var createItem = function(itemID, index) {
	      	return(
	        <Col xs="12" md="8" key={itemID} className="pb-3 offset-md-2">
	          <ItemDetail itemID={itemID} user={this.state.user} onClick={this.showDetail} />
	        </Col>);
	    };

        var videoDetail = (this.state.showDetail) ?
                  <ItemVideoComponent 
                    user={this.state.selectedUser} 
                    contentURL={this.state.selectedItem.url} 
                    item={this.state.selectedItem} 
                    onClose={this.hideDetail} 
                    thumbURL={this.state.selectedThumbURL} /> : null;

    	var addMeta = <Helmet 
	    			title={ capitalizeFirstLetter(typeof this.state.user.name !== 'undefined' ? this.state.user.name : '') } 
	    			meta={[
    					{"name": "description", "content": typeof this.state.user.shortBio !== 'undefined' ? this.state.user.shortBio : ''},
    					{property: "og:type", content: "profile"},
    					{property: "og:profile:first_name", content: typeof this.state.user.name !== 'undefined' ? this.state.user.name.split(' ')[0] : ''},
    					{property: "og:profile:last_name", content: typeof this.state.user.name !== 'undefined' ? this.state.user.name.split(' ')[1] : ''},
	    				]}
	    			/>;

	    var detail = this.state.userItems ? Object.keys(this.state.userItems).map((createItem), this) : 
               <Alert className="col-12" color="warning text-center">
                <strong>Still to come!</strong> No items yet - check back soon!
              </Alert>

	    return(
	    	<Container fluid>
	    		{addMeta}
	          	<UserProfileHeader user={this.state.user} />
                <Container>
                    <Row className={ this.state.showDetail ? 'hidden-xs-up' : ''}>
		              	{ detail }
		            </Row>
		            <Row className={ this.state.showDetail ? 'show pb-4' : 'invisible'}>
                		{ this.state.showDetail ? videoDetail : null }
		            </Row>
		        </Container>
	        </Container>
	    );	
	}
});

export default UserProfileComponent
