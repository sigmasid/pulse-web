import React from 'react';
import * as firebase from "firebase";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserSummary from './UserSummaryComponent.js';

var AnswerVideoItem = React.createClass({
  render: function() {
    return(
    <video controls>
          <source src={this.props.videoURL} type="video/mp4" />
      </video>
    )}
});

var AnswerVideoComponent = React.createClass({
  	getInitialState: function() {
    	return {
    		answerURL: '',
    		modal: false
    	};
  	},

   	toggle: function() {
        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
        }

		this.setState({
      		modal: !this.state.modal
    	});
  	},

  	componentDidMount: function() {
  	if (this.state.answerURL === '') {
		var storageRef = firebase.storage().ref().child('answers');
		storageRef.child(this.props.questionID).child(this.props.answerID).getDownloadURL().then(function(url) {
	      	this.setState({
	        	answerURL: url,
	        	modal: true
	      	});
	  	}.bind(this))}
	   },

  	render: function() {
    var answerVideo = <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=320&h=640" alt="Card cap" />
    if (this.state.answerURL !== '') {
      	answerVideo = <AnswerVideoItem videoURL={this.state.answerURL} />; 
    }
    
    return(
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-sm">
          <ModalHeader toggle={this.toggle}>
            <span className="font-weight-bold">{typeof this.props.question !== 'undefined' ? this.props.question.title : 'Current Question'}</span>
          </ModalHeader>
          <ModalBody>{answerVideo}</ModalBody>
          <ModalFooter>
            <UserSummary user={typeof this.props.user !== 'undefined' ? this.props.user : 'Default User'} />
          </ModalFooter>        
        </Modal>
    );
  }	  
});

export default AnswerVideoComponent