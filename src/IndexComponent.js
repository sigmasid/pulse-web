import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';

import { Link } from 'react-router';
import { Container, Badge, Jumbotron, Row, Col, Alert, Button } from 'reactstrap';
import { Card, CardImg, CardBlock, CardTitle} from 'reactstrap';
import pulseLogo from './images/pulse-logo-text-only.png'; // Tell Webpack this JS file uses this image
import SearchComponent from './SearchComponent.js';
var createReactClass = require('create-react-class');
const util = require('util'); //print an object

var IndexHeader = createReactClass({
  render: function() {
    return(
      <Jumbotron className="Index-header text-center" color="white">
        <Container>
            <img src={pulseLogo} alt="logo" className="pr-sm-4 hidden-xs-down" />
            <p className="lead hidden-xs-down">ideas, content & voices that matter!</p>
            <SearchComponent handleSearch={this.props.handleSearch} />
        </Container>
      </Jumbotron>
    );
  }
});

var SearchItem = createReactClass({
  contextTypes: {
    setSelected: React.PropTypes.func.isRequired
  },

  render: function() {
    return(
      <Card className="Channel-card">
        <Link to={`/c/${this.props.channel._id}`} onClick={this.context.setSelected.bind(null,this.props.channel, true)}>
          <CardImg top width="100%" src={this.props.channel._source.url}  alt="Card image cap" />
          <CardBlock>
            <CardTitle className="row">
              <Col xs={12}>
                { this.props.channel._source.title }
              </Col>  
            </CardTitle>
            <small>{ this.props.channel._source.description }</small>
          </CardBlock>
        </Link>
      </Card>
    );
  }
});

var ChannelItem = createReactClass({
  contextTypes: {
    setSelected: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      thumbURL: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=loading...&w=500&h=270&bg=333333&txtclr=666666'
    };
  },

  componentDidMount: function() {
    var storageRef = firebase.storage().ref('channelCovers').child(this.props.channel['.key']).child('content');
    storageRef.getDownloadURL().then(function(url) {
      this.setState({
        thumbURL: url
      });
    }.bind(this));
  },

  getLength(length) {
    return(<div>
            <Badge color="info">{length}</Badge>
            <small className="text-muted"> { length === 1 ? " Series" : " Series" }</small>
          </div>); 
  },

  render: function() {
    return(
      <Card className="Channel-card">
        <Link to={`/c/${this.props.channel['.key']}`} onClick={this.context.setSelected.bind(null,this.props.channel, true)}>
          <CardImg top width="100%" src={ this.state.thumbURL } alt="Card image cap" />
          <CardBlock>
            <CardTitle className="row">
              <Col xs={12}>
                { this.props.channel.title }
              </Col>  
            </CardTitle>
            <small>{ this.props.channel.description }</small>
          </CardBlock>
        </Link>
      </Card>

        /* 
      	<CardFooter>
          <CardLink tag={Link} className="tag-link" to={`/c/${this.props.channel['.key']}`} 
                    onClick={this.context.setSelected.bind(null,this.props.channel)}>
            Browse Channel
          </CardLink>
          <span className="small float-right"> 
            { this.props.channel.hasOwnProperty("tags") ? this.getLength(Object.keys(this.props.channel.tags).length) : this.getLength(0)}
          </span>
      	</CardFooter> */
    );
  }
});

///CHANNELS LIST///
var IndexComponent = createReactClass({
  mixins: [ReactFireMixin],
  
  contextTypes: {
      setSelected: React.PropTypes.func.isRequired
  },

  handleSearch: function(results) {
    console.log("response is "+util.inspect(results));
    this.setState({
      headerText: 'Search Results',
      results: results.hits,
      searchMode: true
    })
  },

  getInitialState: function() {
    return {
      channels: [],
      results: [],
      headerText: 'Trending Channels',
      searchMode: false 
    };
  },

  componentWillMount: function() {
    this.context.setSelected('', true);
    
    var firebaseRef = firebase.database().ref('channels');
    this.bindAsArray(firebaseRef.limitToFirst(20), 'channels');
  },

  render: function() {
    var createItem = function(channel, index) {
      return(
        <Col md="6" sm="6" xs="12" lg="4" key={channel['.key']} className="pb-3">
          <ChannelItem channel={channel} />
        </Col>);
    };

    var createSearchItem = function(result, index) {
      return(
        <Col md="6" sm="6" xs="12" lg="4" key={result._id} className="pb-3">
          <SearchItem channel={result} />
        </Col>);
    };

    var results = function() {
      return(typeof this.state.results !== 'undefined' ? 
            this.state.results.map(createSearchItem) : 
              <Col xs="12"><Alert color="warning text-center">
              <strong>No Results!</strong> Sorry no results found for this search!</Alert></Col>
    )}.bind(this);

    var close = function() {
      this.setState({
        headerText: 'Trending Channels',
        searchMode: false
      })
    };

    var closeButton = <Col xs="1"><Button className="close" aria-label="Close" onClick={close.bind(this, null)}><span aria-hidden="true">&times;</span></Button></Col>

    return (
      <Container fluid>
        <IndexHeader handleSearch={ this.handleSearch }/>
        <Container className="Index-content">
          <Row>
            <Col xs="11"><p className="blockquote">{this.state.headerText}</p></Col>
            { this.state.searchMode ? closeButton : '' }
          </Row>
          <Row>{ this.state.searchMode ? 
                  results() : 
                  this.state.channels.map(createItem) }
          </Row>
        </Container>
        {this.props.children}
      </Container>
      );
    }
});

export default IndexComponent;