import React from 'react'
import * as firebase from "firebase";

import { Link } from 'react-router';
import { Badge, Row, Col, Card, CardHeader, CardBlock, CardLink, CardTitle, CardFooter} from 'reactstrap';

var TagItem = React.createClass({
  getLength(length) {
    return (<div><Badge color="info">{length}</Badge>
            <span>{ length > 1 ? " Answers" : " Answer" }</span></div>);
  },

  render: function() {
    return(
      <div>
      	<CardBlock>
        	<CardTitle>{ this.props.tag.title }</CardTitle>
      	</CardBlock>
      	<CardFooter>
          <CardLink tag={Link} className="tag-link" to={`/tag/${this.props.tagID}`}>See More</CardLink>
          <Badge color="info" className="float-right">
            { this.props.tag.hasOwnProperty("questions") ? Object.keys(this.props.tag.questions).length : 0 }
          </Badge>
      	</CardFooter>
      </div>
      );
  }
});

var TagComponent = React.createClass({
  getInitialState: function() {
    return {
      tag: ''
    };
  },

  componentDidMount: function() {
    firebase.database().ref('/tags/' + this.props.tagID).once('value').then(function(snapshot) {
      this.setState({
        tag: snapshot.val()
      })
    }.bind(this));
  },

  render: function() {
    if (this.state.tag !== '') {
      return(
      	<TagItem tag={this.state.tag} tagID={this.props.tagID} />); 
    } else {
      return(null);
    }
  }
});

var TagsComponent = React.createClass({
  render: function() {
    var createItem = function(channelID, index) {
      return(
        <Col md="4" sm="6" xs="12" key={tagID} className="col">
          <Card>
            <TagComponent channelID={tagID} />
          </Card>
        </Col>);
    }.bind(this);

    return (<Row>{ Object.keys(this.props.params.channelID).map(createItem) }</Row>);
    }
});

export default TagsComponent;