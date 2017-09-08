import React from 'react';
import * as firebase from "firebase";
import { Card, CardTitle, CardImg } from 'reactstrap';
import Helmet from 'react-helmet';
var createReactClass = require('create-react-class');

var VideoItem = createReactClass({
  render: function() {
    return(
    <div className="embed-responsive Item-video embed-responsive-9by16">
      <video autoPlay muted playsInline src={this.props.videoURL}></video>
    </div>
    )}
});

var ItemContentComponent = createReactClass({
  	getInitialState: function() {
    	return {
    		contentURL: '',
    	};
  	},

    setNewContentURL : function() {
      if (this.props.contentURL === '' && this.props.item.contentType !== 'postcard') {
        var storageRef = firebase.storage().ref().child('channels').child(this.props.channelID).child(this.props.itemID).child('content');
        storageRef.getDownloadURL().then(function(url) {
          this.setState({
            contentURL: url,
          });
        }.bind(this))
      } else {
        this.setState({
          contentURL: this.props.contentURL,
        });
      }
    },

  	componentDidMount: function() {
      this.setNewContentURL()
    },

    componentDidUpdate(prevProps, prevState) {
      if (this.props.item !== prevProps.item) {
        this.setNewContentURL()
      }
    },

  	render: function() {
    var itemTitle = typeof this.props.item !== 'undefined' ? this.props.item.title : '';
    var itemAuthor = typeof this.props.user.name !== 'undefined' ? this.props.user.name : '';
    var itemDescription = this.props.item.type + " " + itemTitle + '" by ' + itemAuthor;

    var addMeta = <Helmet meta={[
      {itemprop: "name", content: itemTitle},
      {itemprop: "description", content: itemDescription},
      {itemprop: "thumbnailUrl", content: typeof this.props.thumbURL !== 'undefined' ? this.props.thumbURL : ''},
      {itemprop: "contentURL", content: typeof this.state.contentURL !== 'undefined' ? this.state.contentURL : ''},
      {itemprop: "author", content: itemAuthor},
      ]}
    />;

    var itemContent = <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=320&h=640" alt="Card cap" />

    if (this.state.contentURL !== '' && (this.props.item.contentType === "recordedVideo" ||  this.props.item.contentType === "albumVideo")) {
      itemContent = <CardTitle itemProp="video" itemScope itemType="http://schema.org/VideoObject"><VideoItem videoURL={this.state.contentURL} /></CardTitle>
    } else if (this.state.contentURL !== '' && (this.props.item.contentType === "recordedImage" ||  this.props.item.contentType === "albumImage")) {
      itemContent = <CardTitle itemProp="image" itemScope itemType="http://schema.org/ImageObject" className="text-center"><CardImg top src={this.state.contentURL} alt="pulse image" /></CardTitle>
    } else if (this.props.item.contentType === "postcard") {
      itemContent = <span className="text-quote"><h1 className="display-5" itemProp="conversation">{ itemTitle }</h1></span>
    }
    
    return(
        <Card className="Item-content">
            {itemContent}
            {addMeta}   
        </Card>
    );
  }	  
});

export default ItemContentComponent