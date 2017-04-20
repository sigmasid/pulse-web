import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';
import 'bootstrap/dist/css/bootstrap.css';

import { Row, Col, Button, Jumbotron, Container } from 'reactstrap';

import ItemDetail from './ItemDetailComponent.js';
import ItemVideoComponent from './ItemVideoComponent.js';
import GetAppModal from './GetAppModal.js';

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

///CHANNELS LIST///
var ChannelsComponent = React.createClass({
  mixins: [ReactFireMixin],

  contextTypes: {
      setSelected: React.PropTypes.func.isRequired
  },

  showDetail: function(selected, selectedUser, selectedThumbURL) {
    this.setState({
      showDetail: true,
      selectedUser: selectedUser,
      selectedItem: selected,
      selectedThumbURL: selectedThumbURL
    })
  },

  hideDetail: function() {
    this.setState({
      selectedItem: '',
      selectedUser: '',
      showDetail: false
    })
  },

  getInitialState: function() {
    return {
      selectedChannel: '',
      channelID: '',
      channelItems: '',
      showGetApp: false,
      showDetail: false
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

    var firebaseRef = firebase.database().ref('channelItems').child(channelID).orderByChild('createdAt').limitToLast(20);
    this.bindAsArray(firebaseRef, 'channelItems');
  },

  render: function() {
    var capitalizeFirstLetter = function(channel) {
      return typeof channel.title !== 'undefined' ? channel.title.charAt(0).toUpperCase() + channel.title.slice(1) : '';
    };

    var videoDetail = (this.state.showDetail) ?
                      <ItemVideoComponent 
                        user={this.state.selectedUser} 
                        contentURL={this.state.selectedItem.url} 
                        item={this.state.selectedItem} 
                        onClose={this.hideDetail} 
                        thumbURL={this.state.selectedThumbURL} /> : null;

    var createItem = function(item, index) {
      return(
        <Col xs="12" md="8" key={item['.key']} className="pb-3 offset-md-2">
          <ItemDetail item={item} channelID={this.state.channelID} onClick={this.showDetail} />
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
            <Row className={ this.state.showDetail ? 'hidden-xs-up' : ''}>
              { typeof this.state.channelItems !== 'undefined' ? this.state.channelItems.reverse().map((createItem), this) : '' }
            </Row>
            <Row className={ this.state.showDetail ? 'show pb-4' : 'invisible'}>
                { this.state.showDetail ? videoDetail : null }
            </Row>
        </Container>
      </Container>
    );
  }
});

export default ChannelsComponent;