import React from 'react'
import * as firebase from "firebase";
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { Col, Card, CardBlock, CardTitle, CardFooter, CardHeader, CardImg } from 'reactstrap';

import UserSummary from './UserSummaryComponent.js';
//const util = require('util') //print an object

var ItemDetailComponent = React.createClass({
  contextTypes: {
    setSelected: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      user: '',
      thumbURL: '',
    };
  },

  componentDidMount: function() {
    if (typeof this.props.item !== 'undefined') {
      firebase.database().ref('/userPublicSummary/' + this.props.item.uID).once('value').then(function(userSnap) {
        this.setState({
          user: userSnap.val()
        })
      }.bind(this));

      if (this.props.item.type === 'post' || this.props.item.type === 'perspective' || this.props.item.type === 'thread') {
        var storageRef = firebase.storage().ref('channels').child(this.props.channelID).child(this.props.itemID).child('thumb');
        storageRef.getDownloadURL().then(function(url) {
          this.setState({
            thumbURL: url
          });
        }.bind(this));
      }
    } else {
      firebase.database().ref('/items/' + this.props.itemID).once('value').then(function(snap) {
        var item = snap.val();
        if (item.type === 'post' || item.type === 'perspective' || item.type === 'thread') {
            var storageRef = firebase.storage().ref('channels').child(item.cID).child(this.props.itemID).child('thumb');
            storageRef.getDownloadURL().then(function(url) {
              this.setState({
                item: snap.val(),
                itemID: snap.key,
                thumbURL: url
              });
          }.bind(this));
        } else {
          this.setState({
              itemID: snap.key,
              item: snap.val()
            });
        }

        if (typeof this.props.user === 'undefined') {
          firebase.database().ref('/userPublicSummary/' + item.uID).once('value').then(function(userSnap) {
          this.setState({
              user: userSnap.val()
          })
          }.bind(this));
        } else {
          this.setState({
            user: this.props.user
          })
        }
      }.bind(this));

    }
  },

  handleClick: function() {
    var item = (typeof this.props.item !== 'undefined') ? this.props.item : (typeof this.state.item !== 'undefined') ? this.state.item : '';
    var itemID = (typeof this.state.itemID !== 'undefined' ? this.state.itemID : item['.key'])
    console.log("this fired"); 

    if (item !== '') {
      if (item.type === 'post' || item.type === 'perspective' || item.type === 'answer') {
        this.props.onClick(item, this.state.user, this.state.thumbURL);
      } else {

        browserHistory.push(`/i/${itemID}`);
      }
    }
  },

  render: function() {
    var userSummaryItem = null; 
    var itemImage = null;
    var itemType = '';
    var cssTag = '';

    var item  = typeof this.props.item !== 'undefined' ? this.props.item : typeof this.state.item !== 'undefined' ? this.state.item : '';
    var date = new Date(item.createdAt);
    var tagTitle = '';

    if (typeof item.tagTitle !== 'undefined') {
      tagTitle = <Link to={`/i/${item.tagID}`}># { item.tagTitle }</Link>;
    }

    if (this.state.user !== '') {
      userSummaryItem = <Link to={`/u/${item.uID}`} onClick={this.context.setSelected.bind(null, this.state.user)}><UserSummary user={this.state.user} /></Link>; 
    }

    if (item !== '') {
      if ((item.type === 'post' || item.type === 'perspective' || item.type === 'thread') && this.state.thumbURL !== '') {
        itemImage = <Link to={this.props.myroute} onClick={ this.handleClick }>
                      <CardImg top width="100%" src={ this.state.thumbURL } alt="Card image cap" />
                    </Link>
      }
    } 

    switch (item.type) {
      case 'post': 
        cssTag = 'card-block-post';
        itemType = ' posted';
        break;
      case 'question': 
        itemType = ' asked';
        cssTag = 'card-block-question';
        break;
      case 'answer': 
        itemType = ' answered';
        cssTag = 'card-block-answer';
        break;
      case 'perspective': 
        itemType = ' added a perspective';
        cssTag = 'card-block-perspective';
        break;
      case 'thread':
        itemType = ' started a thread';
        cssTag = 'card-block-thread';
        break;
      case 'interview':
        itemType = ' interview';
        cssTag = 'card-block-interview';
        break;
      default: 
        cssTag = 'card-block-default';
        break;
    }

    return(
      <Card className="Item-card">
        <CardHeader className="row">
          <Col xs={10} sm={9} md={8}>{ userSummaryItem }</Col>
          <Col xs={2} sm={3} md={4} className="card-tag-title"><small className="text-muted float-right">{itemType}</small></Col>
        </CardHeader>
        { itemImage }
        <CardBlock className={cssTag}>
          <CardTitle>
            <Link to={this.props.myroute} onClick={ this.handleClick }>
              { item.title }
            </Link>
          </CardTitle>
        </CardBlock>
        <CardFooter>
            <small className="text-muted">{ date.toDateString() }</small>
            <small className="text-muted float-right">{ tagTitle }</small>
        </CardFooter>
      </Card>
    );
  }
});

export default ItemDetailComponent;

