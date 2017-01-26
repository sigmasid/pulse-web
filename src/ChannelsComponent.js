import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';
import 'bootstrap/dist/css/bootstrap.css';

import { Link } from 'react-router';
import { Container, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, Button, Jumbotron } from 'reactstrap';

import QuestionList from './QuestionListComponent.js';
import UserList from './UserListComponent.js';
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
        <h1 className="display-4">Loading Pulse</h1>
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
      selectedChannel: '',
      selectedChannelName: '',
    };
  },

  showDetail: function(selected) {
    if (selected.hasOwnProperty("questions")) {
      this.setState({
        selectedChannel: selected,
        selectedChannelName: selected.title
      })
    } else {
      this.setState({
        selectedChannel: selected,
        selectedChannelName: selected.title
      })
    }
  },

  componentWillMount: function() {
    if (typeof this.props.selected.title !== 'undefined') {
      this.setState({
        selectedChannel: this.props.selected,
        selectedChannelName: this.props.selected.title
      })
      this.toggle('1');
    } else {
      console.log('fetching channel - not in props');
      firebase.database().ref('/tags/' + this.props.params.channelID).once('value').then(function(snapshot) {
        this.setState({
          selectedChannel: snapshot.val(),
          selectedChannelName: snapshot.val().title
        })
      this.toggle('1');
      }.bind(this));
    }
  },

  render: function() {
    return (
      <Container fluid>
        <ChannelHeader selectedChannel={this.state.selectedChannel} />
        <Container>
          <Nav pills className="container Channel-sub-nav">
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                Questions
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                Experts
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab} className="Channel-content container">
            <TabPane tabId="1">
                <QuestionList channelName={this.state.selectedChannelName} questions={this.state.selectedChannel.questions} />
            </TabPane>
            <TabPane tabId="2">
                <UserList experts={this.state.selectedChannel.experts} />
            </TabPane>
          </TabContent>
        </Container>
      </Container>
    );
  }
});

export default ChannelsComponent;