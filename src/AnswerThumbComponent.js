import React from 'react';
import * as firebase from "firebase";
import { CardBlock } from 'reactstrap';

var AnswerThumbComponent = React.createClass({
  getInitialState: function() {
    return {
      answerURL: ''
    };
  },

  componentDidMount: function() {
  var storageRef = firebase.storage().ref().child('answerThumbnails');

  storageRef.child(this.props.answerID).getDownloadURL().then(function(url) {
      this.setState({
        answerURL: url
      })
  }.bind(this));
  },

  render: function() {
    var answerImage = <img className="rounded" width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Loading&w=318&h=180" alt="answer thumbnail" />;

    if (this.state.answerURL !== '') {
      answerImage = <img className="rounded" width="100%" src={this.state.answerURL} 
                         onClick={this.props.onClick.bind(null, 
                                                          this.props.answerID, 
                                                          typeof this.props.user !== 'undefined' ? this.props.user : '', 
                                                          this.state.answerURL
                                                          )} 
                         alt="click to load answer"/>; 
    }

    return(<CardBlock>{answerImage}</CardBlock>);
  } 
});

export default AnswerThumbComponent