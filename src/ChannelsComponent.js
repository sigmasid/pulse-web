import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';
import 'bootstrap/dist/css/bootstrap.css';

import { Link } from 'react-router';
import { Card, CardTitle, Input, InputGroup, InputGroupButton, CardHeader, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, Button, Jumbotron } from 'reactstrap';
import QuestionList from './QuestionListComponent.js';
import UserList from './UserList.js';
import classnames from 'classnames';

var ChannelHeader = React.createClass({
  render: function() {
    if (typeof this.props.selectedChannel.title !== 'undefined') {
      return(
        <Jumbotron className="text-center">
          <h1 className="display-4">{this.props.selectedChannel.title}</h1>
          <hr className="my-2" />
          <p className="lead">{this.props.selectedChannel.description}</p>
          <p className="lead">
            <Button color="primary">Join Channel</Button>
          </p>
        </Jumbotron>
      )
    };
    return(
      <Jumbotron>
        <h1 className="display-4">Please select a channel</h1>
      </Jumbotron>
    );
    }
});

/// STARTING CHANNEL LIST ///
var ChannelsList = React.createClass({
  render: function() {

    var createItem = function(channel, index) {
      return (
          <ListGroupItem tag={Link} to={`/channels/${channel['.key']}`} key={ index } activeClassName="active" onClick={this.props.onClick.bind(null,channel)}>
            <ListGroupItemHeading className="text-capitalize"><small>{ '# ' + channel.title}</small></ListGroupItemHeading>
          </ListGroupItem>
      )
    }.bind(this);

    return (
      <ListGroup>
        { this.props.channels.map(createItem) }
      </ListGroup>
    );
  }
});

///CHANNELS LIST///
var ChannelsComponent = React.createClass({
  mixins: [ReactFireMixin],

  toggle: function(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  },

  getInitialState: function() {
    return {
      channels: [],
      selectedChannel: '',
      selectedChannelName: '',
      shouldShowDetail: false
    };
  },

  showDetail: function(selected) {

    if (selected.hasOwnProperty("questions")) {
      this.setState({
        shouldShowDetail: true,
        selectedChannel: selected,
        selectedChannelName: selected.title
      })
    } else {
      this.setState({
        shouldShowDetail: false,
        selectedChannel: selected,
        selectedChannelName: selected.title
      })
    }
  },

  componentWillMount: function() {
    var firebaseRef = firebase.database().ref('tags');
    this.bindAsArray(firebaseRef.limitToFirst(20), 'channels');
  },

  render: function() {
    return (
    <Row noGutters={true}>
      <Col md="2" sm="3" className="sidebar hidden-xs-down">
        <Card>
          <CardHeader className="font-weight-bold">Channels<br/><br/>
            <InputGroup><Input placeholder="search channels" /></InputGroup>
          </CardHeader>
          <ChannelsList channels={ this.state.channels } onClick={this.showDetail} />
        </Card>
      </Col>
      <Col md="10" sm="9" xs="12">
        <ChannelHeader selectedChannel={this.state.selectedChannel} />
        <Nav pills className="container Channel-sub-nav">
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Questions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Experts
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className="Channel-content container">
          <TabPane tabId="1">
              <QuestionList shouldShowDetail={this.state.shouldShowDetail} channelName={this.state.selectedChannelName} questions={this.state.selectedChannel.questions} />
          </TabPane>
          <TabPane tabId="2">
              <UserList shouldShowDetail={this.state.shouldShowDetail} experts={this.state.selectedChannel.experts} />
          </TabPane>
        </TabContent>
      </Col>
    </Row>
    );
  }
});

export default ChannelsComponent;