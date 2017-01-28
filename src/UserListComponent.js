import React from 'react'
import * as firebase from "firebase";

import { Link } from 'react-router';
import { Row, Col, Card, CardBlock, CardLink, CardTitle, CardFooter } from 'reactstrap';

var UserThumbComponent = React.createClass({
  contextTypes: {
    setSelected: React.PropTypes.func.isRequired
  },

  render: function() {
    var profileImage = <img className="rounded" width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=NoImage&w=318&h=180" alt="profile thumbnail" />;
    if (this.props.user.profilePic !== '') {
      profileImage = <img className="rounded" width="100%" src={this.props.user.profilePic} alt="click to see details"/>; 
    }

    return(<Link className="tag-link" to={`/u/${this.props.userID}`} 
                 onClick={this.context.setSelected.bind(null,this.props.user, true)}>
                 {profileImage}
          </Link>
          );
  } 
});

var UserDetailItem = React.createClass({
  contextTypes: {
    setSelected: React.PropTypes.func.isRequired
  },

  render: function() {
    return(
      <CardFooter>
        <small>
          <CardLink tag={Link} className="tag-link text-capitalize font-weight-bold" 
                    to={`/u/${this.props.userID}`}
                    onClick={this.context.setSelected.bind(null,this.props.user, true)}>
            {this.props.user.name}
          </CardLink>
        </small><br/>
        <small>
          <CardLink tag={Link} className="tag-link text-capitalize" 
                    to={`/u/${this.props.userID}`}
                    onClick={this.context.setSelected.bind(null,this.props.user, true)}>
            {this.props.user.hasOwnProperty("shortBio") ? this.props.user.shortBio : ''}
          </CardLink>
        </small>
      </CardFooter>
      );
  }
});

var UserDetailComponent = React.createClass({
  getInitialState: function() {
    return {
      user: ''
    };
  },

  componentDidMount: function() {
    firebase.database().ref('/userPublicSummary/' + this.props.userID).once('value').then(function(snapshot) {
      this.setState({
        user: snapshot.val()
      })
    }.bind(this));
  },

  render: function() {
    if (typeof this.state.user !== 'undefined') {
      return(
        <Col lg="3" md="4" sm="6" xs="12" className="col" key={this.props.userID}>
          <Card key={this.props.userID}>
            <UserThumbComponent user={this.state.user} userID={this.props.userID}/>
            <UserDetailItem user={this.state.user} userID={this.props.userID} />
          </Card>
        </Col>
        );
    } else {
      return(
        <Col lg="3" md="4" sm="6" xs="12" className="col" key={this.props.userID}>
          <Card block inverse color="warning" key={this.props.userID}>
            <CardBlock>
              <img className="rounded" width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Loading&w=318&h=180" alt="profile thumbnail" />
            </CardBlock>
          </Card>
        </Col>
      );
    }
  }
});

var UserList = React.createClass({
  render: function() {

    var createItem = function(userID, index) {
      return(<UserDetailComponent userID={userID} key={userID} />);
    };

    if (typeof this.props.experts !== 'undefined') {
      return (
        <Row>{ Object.keys(this.props.experts).map(createItem)}</Row>
      );
    } else {
      return(
        <Card>
          <CardBlock>
            <CardTitle>no experts yet!</CardTitle>
          </CardBlock>
        </Card>
      );
    }
  }
});

export default UserList;