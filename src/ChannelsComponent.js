import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';
import 'bootstrap/dist/css/bootstrap.css';

import { Button, Jumbotron, Container, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Card, CardBlock, CardTitle, Col, CardFooter, CardLink, CardHeader, CardImg } from 'reactstrap';
import { Link } from 'react-router';
import UserSummary from './UserSummaryComponent.js';

//import UserList from './UserListComponent.js';
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
          <Button color="primary hidden-sm-down" onClick={this.props.onClick.bind(null, true)}>Subscribe</Button>
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

var ItemDetail = React.createClass({
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
    firebase.database().ref('/userPublicSummary/' + this.props.item.uID).once('value').then(function(userSnap) {
      this.setState({
          user: userSnap.val()
      })
    }.bind(this));

    if (this.props.item.type === 'post' || this.props.item.type === 'perspective' || this.props.item.type === 'thread') {
      var storageRef = firebase.storage().ref('channels').child(this.props.channelID).child(this.props.item['.key']).child('thumb');
      storageRef.getDownloadURL().then(function(url) {
        this.setState({
          thumbURL: url
        });
      }.bind(this));
    }
  },

  render: function() {
    var userSummaryItem = null; 
    var itemImage = null;
    var itemType = '';
    var cssTag = '';

    if (this.state.user !== '') {
      userSummaryItem = <Link to={`/u/${this.props.item.uID}`} onClick={this.context.setSelected.bind(null, this.state.user)}><UserSummary user={this.state.user} /></Link>; 
    }

    if (this.props.item.type === 'post' || this.props.item.type === 'perspective' || this.props.item.type === 'thread') {
      if (this.state.thumbURL !== '') {
        itemImage = <CardImg top width="100%" src={ this.state.thumbURL } alt="Card image cap" />
      }
    }

    switch (this.props.item.type) {
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
      default: 
        cssTag = 'card-block-default';
        break;
    }

    var date = new Date(this.props.item.createdAt);

    return(
      <Card className="Item-card">
        <CardHeader className="row">
          <Col xs={10} sm={9} md={8}>{ userSummaryItem }</Col>
          <Col xs={2} sm={3} md={4} className="card-tag-title"><small className="text-muted float-right">{itemType}</small></Col>
        </CardHeader>
        { itemImage }
        <CardBlock className={cssTag}>
          <CardTitle>
            <Link to={`/i/${this.props.item['.key']}`}>
                { this.props.item.title }
            </Link>
          </CardTitle>
        </CardBlock>
        <CardFooter>
            <small className="text-muted">{ date.toDateString() }</small>
            <small className="text-muted float-right"># { this.props.item.tagTitle }</small>
        </CardFooter>
      </Card>
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
      channelID: '',
      channelItems: '',
      contributors: '',
      showGetApp: false
    };
  },

  toggleGetApp: function(show) {
    this.setState({
      showGetApp: show
    })
  },

  componentWillMount: function() {
    var channelID = this.props.params.channelID;

    if (typeof this.props.selected.title !== 'undefined') {
      this.setState({
        channelID: channelID,
        selectedChannel: this.props.selected
      });
    } else {
        firebase.database().ref('/channels/' + channelID).once('value').then(function(snapshot) {
        this.setState({
          channelID: channelID,
          selectedChannel: snapshot.val()
        })
      }.bind(this));
    }

    var firebaseRef = firebase.database().ref('channelItems').child(channelID);
    this.bindAsArray(firebaseRef.limitToFirst(10), 'channelItems');
    this.toggle('1');
  },

  render: function() {
    var capitalizeFirstLetter = function(channel) {
      return typeof channel.title !== 'undefined' ? channel.title.charAt(0).toUpperCase() + channel.title.slice(1) : '';
    };

    var createItem = function(item, index) {
      return(
        <Col xs="12" md="8" key={item['.key']} className="pb-3 offset-md-2">
          <ItemDetail item={item} channelID={this.state.channelID} />
        </Col>);
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
                Activity
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                Contributors
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab} className="Channel-content container">
            <TabPane tabId="1">
              { typeof this.state.channelItems !== 'undefined' ? this.state.channelItems.map((createItem), this) : '' }
            </TabPane>
            <TabPane tabId="2">
              {/* <UserList experts={this.state.contributors} /> */}
            </TabPane>
          </TabContent>
        </Container>
      </Container>
    );
  }
});

export default ChannelsComponent;