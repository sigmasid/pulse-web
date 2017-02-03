import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';
import 'bootstrap/dist/css/bootstrap.css';

import { Button, Jumbotron, Container, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';

import QuestionList from './QuestionListComponent.js';
import UserList from './UserListComponent.js';
import GetAppModal from './GetAppModal.js';

import classnames from 'classnames';
import Helmet from 'react-helmet';

var ChannelHeader = React.createClass({
  render: function() {
    if (typeof this.props.selectedChannel.title !== 'undefined') {
      return(
        <Jumbotron className="text-center">
          <h1 className="display-4">{this.props.selectedChannel.title}</h1>
          <hr className="my-2" />
          <p className="lead">{this.props.selectedChannel.description}</p>
          <Button color="primary hidden-sm-down" onClick={this.props.onClick.bind(null, true)}>Join Channel</Button>
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

///CHANNELS LIST///
var ChannelsComponent = React.createClass({
  mixins: [ReactFireMixin],

  contextTypes: {
      setSelected: React.PropTypes.func.isRequired
  },

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
      showGetApp: false
    };
  },

  toggleGetApp: function(show) {
    this.setState({
      showGetApp: show
    })
  },

  componentWillMount: function() {
    if (typeof this.props.selected.questions !== 'undefined') {
      this.setState({
        selectedChannel: this.props.selected,
        selectedChannelName: this.props.selected.title
      })
      this.toggle('1');
    } else {
      firebase.database().ref('/tags/' + this.props.params.channelID).once('value').then(function(snapshot) {
        this.setState({
          selectedChannel: snapshot.val(),
          selectedChannelName: snapshot.val().title
        })
        this.context.setSelected(snapshot.val(), true);
      this.toggle('1');
      }.bind(this));
    }
  },

  render: function() {
    var capitalizeFirstLetter = function(channel) {
      return typeof channel.title !== 'undefined' ? channel.title.charAt(0).toUpperCase() + channel.title.slice(1) : '';
    };

    var addMeta = <Helmet 
      title={ capitalizeFirstLetter(this.state.selectedChannel) } 
      meta={[
        {"name": "description", "content": typeof this.state.selectedChannel.description !== 'undefined' ? this.state.selectedChannel.description : ''},
        {property: "og:type", content: "website"}
        ]}
      />;

    return (
      <Container fluid>
        {addMeta}
        <ChannelHeader selectedChannel={this.state.selectedChannel} onClick={this.toggleGetApp} />
        {this.state.showGetApp ? <GetAppModal modal={this.state.showGetApp} onClose={this.toggleGetApp}/> : ''}
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