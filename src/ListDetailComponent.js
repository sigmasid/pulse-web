import React from 'react'
import * as firebase from "firebase";
import { Link } from 'react-router';
import { Col, Card, CardFooter, CardHeader, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import UserSummary from './UserSummaryComponent.js';

var createReactClass = require('create-react-class');
//const util = require('util'); //print an object


var ListItemImage = createReactClass({
  getInitialState: function() {
    return {
      url: ''
    };
  },

  componentDidMount: function() {
    if (typeof this.props.itemID !== 'undefined') {
      var storageRef = firebase.storage().ref('listItems').child(this.props.itemID).child('content');

      storageRef.getDownloadURL().then(function(url) {
        this.setState({
          url: url,
        });
      }.bind(this)).catch(function(error) {
      });
    }
  },

  render: function() {
    if (this.state.url !== '') {
      var cssTag = (typeof this.props.addBorder !== 'undefined') ? "rounded-circle add-border" : "rounded-circle";
      return( <img src={ this.state.url } alt="list item" className={ cssTag } /> );
    };

    return null;
  }
});

var ListDetailComponent = createReactClass({
  contextTypes: {
    setSelected: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      user: '',
      listItems: {},
      isLoading: false
    };
  },

  getListItems: function(listID) {
    firebase.database().ref('listCollection').child(listID).orderByChild('order').once('value').then(function(snapshot) {
      if (snapshot.val() !== null) {
        this.setState({
          listItems: snapshot.val(),
        });
      }
    }.bind(this));
  },

  componentDidMount: function() {
    if (typeof this.props.itemID !== 'undefined') {
      this.getListItems(this.props.itemID);

      firebase.database().ref('/userPublicSummary/' + this.props.userID).once('value').then(function(userSnap) {
        this.setState({
          user: userSnap.val()
        })
      }.bind(this));
    }
  },

  render: function() {
    var userSummaryItem = null; 
    var listItems = '';

    var item  = typeof this.props.item !== 'undefined' ? this.props.item : typeof this.state.item !== 'undefined' ? this.state.item : '';
    var date = null;
    var tagTitle = '';
    var loading = <div className="Loading-container"><div className="Loader"></div></div>

    if (this.state.user !== '') {
      userSummaryItem = <Link to={`/u/${item.uID}`} onClick={this.context.setSelected.bind(null, this.state.user)}><UserSummary user={this.state.user} /></Link>; 
    }

    if (this.state.listItems) {
      listItems = Object.keys(this.state.listItems).map((item, index) => {
        var currentItem = this.state.listItems[item];
        var itemImage = '';

        if (date === null) {
          date = new Date(parseInt(currentItem.createdAt, 10));
        }

        if (typeof currentItem.linkedurl !== 'undefined') {
          itemImage = <a href={currentItem.linkedurl} ><ListItemImage itemID={item} addBorder="true" /></a>
        } else {
          itemImage = <ListItemImage itemID={item} />
        }


        return(
          <ListGroupItem key={item}>
              <Col xs={1} className="List-cols"><h1 className="text-left">{ index + 1 }.</h1></Col>
              <Col xs={8} md={9} className="List-cols">
                <ListGroupItemHeading>{ currentItem.title }</ListGroupItemHeading>
                <ListGroupItemText>{ currentItem.description  }</ListGroupItemText>
              </Col>
              <Col xs={3} md={2} className="List-cols">
                { itemImage }
              </Col>
          </ListGroupItem>
        );
      });
    }

    return(
      <Card className="List-card">
        <CardHeader>
          { userSummaryItem }
        </CardHeader>
        { this.state.isLoading ? loading : null }
        <ListGroup>{  this.state.isLoading ? null : listItems }</ListGroup>
        <CardFooter>
            <small className="text-muted">{ date !== null ? date.toDateString() : null }</small>
            <small className="text-muted float-right">{ tagTitle }</small>
        </CardFooter>
      </Card>
    );
  }
});

export default ListDetailComponent;