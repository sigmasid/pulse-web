import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';
import 'bootstrap/dist/css/bootstrap.css';

import { Alert, Row, Col, Jumbotron, Container } from 'reactstrap';

import ItemDetail from './ItemDetailComponent.js';
import ItemVideoComponent from './ItemVideoComponent.js';
import GetAppModal from './GetAppModal.js';

import Helmet from 'react-helmet';
const util = require('util') //print an object

var SeriesHeader = React.createClass({
  render: function() {
    if (typeof this.props.selectedSeries !== 'undefined') {
      return(
        <Jumbotron className="text-center">
          <h1 className="display-4">{this.props.selectedSeries.title}</h1>
          <hr className="my-2" />
          <p className="lead">{this.props.selectedSeries.description}</p>
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
var SeriesComponent = React.createClass({
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
      seriesItems: '',
      showGetApp: false,
      showDetail: false
    };
  },

  toggleGetApp: function(show) {
    this.setState({
      showGetApp: show
    })
  },

  componentWillReceiveProps: function (nextProps) {
      var seriesID = nextProps.params.itemID;

    firebase.database().ref('items').child(seriesID).once('value').then(function(snapshot) {
      this.setState({
        series: snapshot.val()
      })
      this.context.setSelected(snapshot.val(), true);
    }.bind(this));  

    firebase.database().ref('itemCollection').child(seriesID).once('value').then(function(snapshot) {
      console.log(util.inspect(snapshot.val(), false, null)); 
      this.setState({
        seriesItems: snapshot.val()
      })
    }.bind(this));
  },

  componentWillMount: function() {
    var seriesID = this.props.params.itemID;

    firebase.database().ref('items').child(seriesID).once('value').then(function(snapshot) {
      this.setState({
        series: snapshot.val()
      })
      this.context.setSelected(snapshot.val(), true);
    }.bind(this));  

    firebase.database().ref('itemCollection').child(seriesID).once('value').then(function(snapshot) {
        this.setState({
          seriesItems: snapshot.val()
        })
    }.bind(this));  
  },

  render: function() {
    var capitalizeFirstLetter = function(series) {
      return typeof series.title !== 'undefined' ? series.title.charAt(0).toUpperCase() + series.title.slice(1) : '';
    };

    var videoDetail = (this.state.showDetail) ?
                      <ItemVideoComponent 
                        user={this.state.selectedUser} 
                        contentURL={this.state.selectedItem.url} 
                        item={this.state.selectedItem} 
                        onClose={this.hideDetail} 
                        thumbURL={this.state.selectedThumbURL} /> : null;

    var createItem = function(item, index) {
      //console.log(util.inspect(this.state.series, false, null)); 
      return(
        <Col xs="12" md="8" key={item} className="pb-3 offset-md-2">
          <ItemDetail itemID={item} channelID={this.state.series.cID} onClick={this.showDetail} />
        </Col>);
    };

    var addMeta = (typeof this.state.series !== 'undefined') ? 
      <Helmet title={ capitalizeFirstLetter(this.state.series.title) } meta={[
        {"name": "description", "content": typeof this.state.series.description !== 'undefined' ? this.state.series.description : ''},
        {property: "og:type", content: "website"}
        ]}
      /> : '';

    var detail = this.state.seriesItems ? Object.keys(this.state.seriesItems).map((createItem), this) : 
               <Alert className="col-12" color="warning text-center">
                <strong>Still to come!</strong> No items yet - download the app to create something new!
              </Alert>

    return (
      <Container fluid>
        {addMeta}
        <SeriesHeader selectedSeries={this.state.series} onClick={this.toggleGetApp} />
        {this.state.showGetApp ? <GetAppModal modal={this.state.showGetApp} onClose={this.toggleGetApp}/> : ''}
        <Container>
            <Row className={ this.state.showDetail ? 'hidden-xs-up' : ''}>
              { detail }
            </Row>
            <Row className={ this.state.showDetail ? 'show pb-4' : 'invisible'}>
              { this.state.showDetail ? videoDetail : null }
            </Row>
        </Container>
      </Container>
    );
  }
});

export default SeriesComponent;