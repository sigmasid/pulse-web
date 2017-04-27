import React from 'react';
import * as firebase from "firebase";
import { Card, CardTitle, CardFooter, CardHeader, Button, Col } from 'reactstrap';
import Helmet from 'react-helmet';

var VideoItem = React.createClass({
  render: function() {
    return(
    <div className="embed-responsive Item-video embed-responsive-9by16">
      <video autoPlay className="embed-responsive-item">
        <source src={this.props.videoURL} type="video/mp4" />
      </video>
    </div>
    )}
});

var ItemVideoComponent = React.createClass({
  	getInitialState: function() {
    	return {
    		contentURL: '',
    	};
  	},

   	close: function() {
        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
  	},

  	componentDidMount: function() {
  	  if (this.props.contentURL === '') {
		    var storageRef = firebase.storage().ref().child('channels').child(this.props.channelID).child(this.props.itemID).child('content');
		    storageRef.getDownloadURL().then(function(url) {
	      	this.setState({
	        	contentURL: url,
	        	modal: true
	      	});
	  	  }.bind(this))
      } else {
        this.setState({
          contentURL: this.props.contentURL,
          modal: true
        });
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

    var capitalizeFirstLetter = function(obj) {
      return obj.charAt(0).toUpperCase() + obj.slice(1);
    };

    var itemVideo = <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=320&h=640" alt="Card cap" />

    if (this.props.contentURL !== '') {
      	itemVideo = <VideoItem videoURL={this.state.contentURL} />
    }
    
    return(
        <Card className="Video-content">
          <CardHeader className="row">
              <Col xs="10" className="padding-0">
                <small className="text-muted">{ capitalizeFirstLetter(itemTitle) }</small><br/>
                <small><strong>{ itemAuthor}</strong></small>
              </Col>
              <Col xs="2 float-right">
                <Button className="close" aria-label="Close" onClick={this.close.bind(this, null)}>
                  <span aria-hidden="true">&times;</span>
                </Button>
              </Col>
          </CardHeader>
          <CardTitle itemProp="video" itemScope itemType="http://schema.org/VideoObject">
            {itemVideo}
            {addMeta}
          </CardTitle> 
          <CardFooter>
            <small className="text-muted">Download the app to see the rest</small>
          </CardFooter>       
        </Card>
    );
  }	  
});

export default ItemVideoComponent