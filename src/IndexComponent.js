import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';

import { Link } from 'react-router';
import { Container, Badge, Jumbotron, Row, Col, Input, InputGroup, InputGroupButton, Button } from 'reactstrap';
import { Card, CardHeader, CardBlock, CardLink, CardTitle, CardSubtitle, CardFooter} from 'reactstrap';

var IndexHeader = React.createClass({
  render: function() {
    return(
      <Jumbotron className="Index-header text-center" color="white">
        <Container>
            <h1 className="display-3 text-capitalize">Pulse</h1>
            <p className="lead">for all the life's big decisions & questions that you don't know the answers to but you really should!</p>

            <InputGroup>
              <Input placeholder="search channels" />
              <InputGroupButton><Button>Search</Button></InputGroupButton>
            </InputGroup>
        </Container>
      </Jumbotron>
      );
  }
});

var ChannelItem = React.createClass({
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
            <Col xs="10">{ this.props.channel.title }</Col>
          </CardTitle>
      	</CardBlock>
        <small className="text-muted card-block">{ this.props.channel.description }</small>
      	<CardFooter>
          <CardLink tag={Link} className="tag-link" to={`/c/${this.props.channel['.key']}`} 
                    onClick={this.props.setSelected.bind(null,this.props.channel)}>
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

  getInitialState: function() {
    return {
      channels: [],
    };
  },

  componentWillMount: function() {
    if (typeof this.props.setSelected !== 'undefined') {
      this.props.setSelected('undefined');
    } 

    var firebaseRef = firebase.database().ref('tags');
    this.bindAsArray(firebaseRef.limitToFirst(20), 'channels');
  },

  render: function() {
    var createItem = function(channel, index) {
      return(
        <Col md="4" sm="6" xs="12" key={channel['.key']} className="col padding-bottom-2">
          <ChannelItem channel={channel} setSelected={this.props.setSelected}/>
        </Col>);
    }.bind(this);


    return (
      <Container fluid>
        <IndexHeader />
        <Container className="Index-content">
          <Row>
            <Col xs="12"><p className="blockquote">Trending Channels</p></Col>
            { this.state.channels.map(createItem) }
          </Row>
        </Container>
        {this.props.children}
      </Container>
      );
    }
});

export default IndexComponent;