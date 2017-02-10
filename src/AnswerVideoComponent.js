import React from 'react';
import * as firebase from "firebase";
import { Card, CardTitle, CardHeader, Button } from 'reactstrap';
import Helmet from 'react-helmet';

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
    	};
  	},

   	close: function() {
        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
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
    var itemTitle = typeof this.props.question !== 'undefined' ? this.props.question.title : '';
    var itemAuthor = typeof this.props.user.name !== 'undefined' ? this.props.user.name : '';
    var itemDescription = 'Answer to "' + itemTitle + '" by ' + itemAuthor;

    var addMeta = <Helmet meta={[
      {itemprop: "name", content: itemTitle},
      {itemprop: "description", content: itemDescription},
      {itemprop: "thumbnailUrl", content: typeof this.props.thumbURL !== 'undefined' ? this.props.thumbURL : ''},
      {itemprop: "contentURL", content: typeof this.state.answerURL !== 'undefined' ? this.state.answerURL : ''},
      {itemprop: "author", content: itemAuthor},
      ]}
    />;

    var answerVideo = <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=320&h=640" alt="Card cap" />
    if (this.state.answerURL !== '') {
      	answerVideo = <AnswerVideoItem videoURL={this.state.answerURL} />
    }
    
    return(
        <Card className="Video-content">
          <CardHeader>
              <Button className="close" aria-label="Close" onClick={this.close.bind(this, null)}>
                  <span aria-hidden="true">&times;</span>
              </Button>
          </CardHeader>
          <CardTitle itemProp="video" itemScope itemType="http://schema.org/VideoObject">
            {answerVideo}
            {addMeta}
          </CardTitle>        
        </Card>
    );
  }	  
});

export default AnswerVideoComponent