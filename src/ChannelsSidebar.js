import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';
import 'bootstrap/dist/css/bootstrap.css';

import { Link } from 'react-router';
import { Card, CardHeader, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, Button, Jumbotron } from 'reactstrap';
import QuestionList from './QuestionListComponent.js';
import UserList from './UserList.js';
import classnames from 'classnames';

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
          <CardHeader tag="p" className="font-weight-bold">Channels<br/><br/>
            <InputGroup>
              <Input placeholder="search channels" />
              <InputGroupButton><Button>Search</Button></InputGroupButton>
            </InputGroup>
          </CardHeader>
          <ChannelsList channels={ this.state.channels } onClick={this.showDetail} />
        </Card>
      </Col>
    </Row>
    );
  }
});

export default ChannelSidebar;