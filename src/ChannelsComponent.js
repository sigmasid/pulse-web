import React from 'react'
import * as firebase from "firebase";
import 'bootstrap/dist/css/bootstrap.css';

import { Alert, Row, Col, Button, Jumbotron, Container } from 'reactstrap';

import ItemDetail from './ItemDetailComponent.js';
import ItemContentComponent from './ItemContentComponent.js';
import GetAppModal from './GetAppModal.js';

import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
var createReactClass = require('create-react-class');

var ChannelHeader = createReactClass({
  render: function() {
    if (typeof this.props.selectedChannel.title !== 'undefined') {
      return(
        <Jumbotron className="text-center">
          <h1 className="display-4">{this.props.selectedChannel.title}</h1>
          <p className="lead">{this.props.selectedChannel.description}</p>
          <Button color="primary hidden-sm-down Subscribe-button" onClick={this.props.onClick.bind(null, true)}>Subscribe</Button>
        </Jumbotron>
      )
    };
    return(
      <Jumbotron>
        <h1 className="display-4 container text-center">Loading Pulse</h1>
      </Jumbotron>
    );
    }
});

///CHANNELS LIST///
var ChannelsComponent = createReactClass({
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
      showDetail: false,
      page: 5,
      hasMore: true
    };
  },

  toggleGetApp: function(show) {
    this.setState({
      showGetApp: show
    })
  },

  loadMore: function(page) {
    let totalItems = Object.keys(this.state.channelItems).length
    if (this.state.page < totalItems) {
      this.setState({
        page: page * 5,
        hasMore: page * 5 > totalItems ? false : true
      });
    } else {
      this.setState({
        hasMore: false
      });
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.params.channelID !== nextProps.params.channelID) {
      var channelID = this.props.params.channelID; 

      if (typeof this.props.selected.title !== 'undefined') {
        this.setState({
          channelID: channelID,
          selectedChannel: this.props.selected
        });
        this.context.setSelected(this.props.selected, true);
      } else {
          firebase.database().ref('/channels/' + channelID).once('value').then(function(snapshot) {
          this.setState({
            channelID: channelID,
            selectedChannel: snapshot.val()
          });
          this.context.setSelected(snapshot.val(), true);
        }.bind(this));
      }
    }
  },

  componentWillMount: function() {
    var channelID = this.props.params.channelID; 
    if (typeof this.props.selected.title !== 'undefined') {
      this.setState({
        channelID: channelID,
        selectedChannel: this.props.selected
      });
      this.context.setSelected(this.props.selected, true);
    } else {
        firebase.database().ref('/channels/' + channelID).once('value').then(function(snapshot) {
        this.setState({
          channelID: channelID,
          selectedChannel: snapshot.val()
        });
        this.context.setSelected(snapshot.val(), true);
      }.bind(this));
    }

    firebase.database().ref('channelItems').child(channelID).orderByChild('createdAt').limitToLast(50).once('value').then(function(snapshot) {
        var orderedItems = {};

        snapshot.forEach(function(child) {
          orderedItems[child.key] = child.val();
        });

        this.setState({
          channelItems: orderedItems
        });
    }.bind(this));  
  },

  render: function() {
    var detail = "";
    var cItems = [];

    var capitalizeFirstLetter = function(channel) {
      return typeof channel.title !== 'undefined' ? channel.title.charAt(0).toUpperCase() + channel.title.slice(1) : '';
    };

    var itemDetail = (this.state.showDetail) ?
                      <ItemContentComponent 
                        user={this.state.selectedUser} 
                        contentURL={this.state.selectedItem.url} 
                        item={this.state.selectedItem} 
                        onClose={this.hideDetail} 
                        thumbURL={this.state.selectedThumbURL} /> : null;

    var addMeta = <Helmet 
      title={ capitalizeFirstLetter(this.state.selectedChannel) } 
      meta={[
        {"name": "description", "content": typeof this.state.selectedChannel.description !== 'undefined' ? this.state.selectedChannel.description : ''},
        {property: "og:type", content: "website"}
        ]}
      />;

    Object.keys(this.state.channelItems).reverse().map((itemID, index) => {
      let item = this.state.channelItems[itemID];
      if (index < this.state.page) {
        cItems.push(
          <Col xs="12" md="8" key={itemID} className="pb-3 offset-md-2">
            <ItemDetail item={item} channelID={this.state.channelID} itemID={itemID} onClick={this.showDetail} />
          </Col>
        );
      }
      return null;
    });

    if (this.state.channelItems !== 'undefined') {
      detail = <InfiniteScroll
                  pageStart={0}
                  element={'span'}
                  loadMore={this.loadMore}
                  hasMore={this.state.hasMore}
                  loader={this.state.hasMore ? <Alert className="pb-3 col-12 col-md-8 offset-md-2" color="warning text-center"><strong>Loading ...</strong></Alert> : <span></span>} >
                  {cItems}
              </InfiniteScroll>
    } else {
      detail = <Alert className="col-12" color="warning text-center">
                <strong>Still to come!</strong> No items yet - download the app to create something new!
              </Alert>
    } 

    return (
      <Container fluid className="Channel-content">
        {addMeta}
        <ChannelHeader selectedChannel={this.state.selectedChannel} onClick={this.toggleGetApp} />
        {this.state.showGetApp ? <GetAppModal modal={this.state.showGetApp} onClose={this.toggleGetApp}/> : ''}
        <Container>
            <Row className={ this.state.showDetail ? 'hidden-xs-up' : ''}>
              { detail }
            </Row>
            <Row className={ this.state.showDetail ? 'show pb-4' : 'invisible'}>
                { this.state.showDetail ? itemDetail : null }
            </Row>
        </Container>
      </Container>
    );
  }
});

export default ChannelsComponent;