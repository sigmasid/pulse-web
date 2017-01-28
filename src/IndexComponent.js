import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';

import { Link } from 'react-router';
import { Container, Badge, Jumbotron, Row, Col, Form, Input, FormGroup, Button } from 'reactstrap';
import { Card, CardBlock, CardLink, CardTitle, CardFooter} from 'reactstrap';

var IndexHeader = React.createClass({
  render: function() {
    return(
      <Jumbotron className="Index-header text-center" color="white">
        <Container>
            <h1 className="display-3 text-capitalize">Pulse</h1>
            <p className="lead">starting point for big decisions & questions that you don't know the answers to but you really should!</p>
            
            <Form>
              <FormGroup row>
                <Col sm={10} xs={12}>
                  <Input placeholder="search channels" onChange={this.props.handleSearch} />
                </Col>
                <Col sm={2} xs={12}>
                  <Button>Check Pulse</Button>
                </Col>
              </FormGroup>
            </Form>

        </Container>
      </Jumbotron>
      );
  }
});

var ChannelItem = React.createClass({
  contextTypes: {
    setSelected: React.PropTypes.func.isRequired
  },

  getLength(length) {
      return(<div>
              <Badge color="info">{length}</Badge>
              <small className="text-muted"> { length === 1 ? " Question" : " Questions" }</small>
            </div>); 
    },

  render: function() {
    return(
      <Card className="Channel-card">
      	<CardBlock>
        	<CardTitle className="row">
            <Col xs="1" className="Hash">#</Col>
            <Col xs="10">
              <Link to={`/c/${this.props.channel['.key']}`} onClick={this.context.setSelected.bind(null,this.props.channel, true)}>
                { this.props.channel.title }
              </Link>
            </Col>
          </CardTitle>
      	</CardBlock>
        <small className="text-muted card-block">{ this.props.channel.description }</small>
      	<CardFooter>
          <CardLink tag={Link} className="tag-link" to={`/c/${this.props.channel['.key']}`} 
                    onClick={this.context.setSelected.bind(null,this.props.channel)}>
            Browse Channel
          </CardLink>
          <span className="small float-right"> 
            { this.props.channel.hasOwnProperty("questions") ? this.getLength(Object.keys(this.props.channel.questions).length) : this.getLength(0)}
          </span>
      	</CardFooter>
      </Card>
      );
  }
});

///CHANNELS LIST///
var IndexComponent = React.createClass({
  mixins: [ReactFireMixin],
  
  contextTypes: {
      setSelected: React.PropTypes.func.isRequired
  },

  handleSearch: function() {
    this.setState({
      headerText: 'Searching...',
      channels: [],
      searchMode: true
    })
  },

  getInitialState: function() {
    return {
      channels: [],
      headerText: 'Trending Channels',
      searchMode: false 
    };
  },

  componentWillMount: function() {
    this.context.setSelected('', true);

    var firebaseRef = firebase.database().ref('tags');
    this.bindAsArray(firebaseRef.limitToFirst(20), 'channels');
  },

  render: function() {
    var createItem = function(channel, index) {
      return(
        <Col md="4" sm="6" xs="12" key={channel['.key']} className="col padding-bottom-2">
          <ChannelItem channel={channel} />
        </Col>);
    }.bind(this);

    return (
      <Container fluid>
        <IndexHeader handleSearch={ this.handleSearch }/>
        <Container className="Index-content">
          <Row><Col xs="12"><p className="blockquote">{this.state.headerText}</p></Col></Row>
          <Row>{ this.searchMode ? '' : this.state.channels.map(createItem) }</Row>
        </Container>
        {this.props.children}
      </Container>
      );
    }
});

export default IndexComponent;