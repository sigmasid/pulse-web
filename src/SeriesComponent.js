import React from 'react'
import * as firebase from "firebase";
import ReactFireMixin from 'reactfire';
import 'bootstrap/dist/css/bootstrap.css';

import { Alert, Row, Col, Jumbotron, Container } from 'reactstrap';

import ListDetail from './ListDetailComponent.js';
import ItemDetail from './ItemDetailComponent.js';
import ItemContentComponent from './ItemContentComponent.js';
import GetAppModal from './GetAppModal.js';

import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
var createReactClass = require('create-react-class');

//const util = require('util'); //print an object

var SeriesHeader = createReactClass({
  render: function() {
    if (typeof this.props.selectedSeries !== 'undefined') {
      return(
        <Jumbotron className="text-center">
          <h1 className="display-4">{this.props.selectedSeries.title}</h1>
          <p className="lead">{typeof this.props.selectedSeries.description === 'undefined' ? this.props.selectedSeries.type : this.props.selectedSeries.description }</p>
        </Jumbotron>
      )
    };
    return(
      <Jumbotron>
        <h1 className="display-4 container text-center">Loading Pulse...</h1>
      </Jumbotron>
    );
    }
});

///CHANNELS LIST///
var SeriesComponent = createReactClass({
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

  getListItems: function(seriesID) {
    firebase.database().ref('lists').child(seriesID).once('value').then(function(snapshot) {
      this.setState({
        seriesItems: snapshot.val()
      })
    }.bind(this));
  },

  loadMore: function(page) {
    if (this.state.page < Object.keys(this.state.seriesItems).length) {
      this.setState({
        page: page * 5,
        hasMore: page * 5 > this.state.seriesItems.length ? false : true
      });
    } else {
      this.setState({
        hasMore: false
      });
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.params.itemID !== nextProps.params.itemID) {
      var seriesID = nextProps.params.itemID;

      firebase.database().ref('items').child(seriesID).once('value').then(function(snapshot) {
        this.setState({
          series: snapshot.val()
        })
        this.context.setSelected(snapshot.val(), false);
      }.bind(this));  

      firebase.database().ref('itemCollection').child(seriesID).once('value').then(function(snapshot) {
        this.setState({
          seriesItems: snapshot.val()
        })
      }.bind(this));
    }
  },

  componentWillMount: function() {
    var seriesID = this.props.params.itemID;

    firebase.database().ref('items').child(seriesID).once('value').then(function(snapshot) {
      this.setState({
        series: snapshot.val()
      });

      if (snapshot.val() !== 'undefined' && snapshot.val().type === 'collection') {
        this.getListItems(seriesID);
      };

      this.context.setSelected(snapshot.val(), false);
    }.bind(this));  

    firebase.database().ref('itemCollection').child(seriesID).once('value').then(function(snapshot) {
      this.setState({
        seriesItems: snapshot.val()
      });
    }.bind(this));  
  },

  render: function() {
    var detail = "";
    var seriesItems = [];

    var capitalizeFirstLetter = function(series) {
      return typeof series.title !== 'undefined' ? series.title.charAt(0).toUpperCase() + series.title.slice(1) : '';
    };

    var itemDetail = (this.state.showDetail) ?
                      <ItemContentComponent 
                        user={this.state.selectedUser} 
                        contentURL={this.state.selectedItem.url} 
                        item={this.state.selectedItem} 
                        onClose={this.hideDetail} 
                        thumbURL={this.state.selectedThumbURL} /> : null;

    var addMeta = (typeof this.state.series !== 'undefined') ? 
      <Helmet title={ capitalizeFirstLetter(this.state.series.title) } meta={[
        {"name": "description", "content": typeof this.state.series.description !== 'undefined' ? this.state.series.description : ''},
        {property: "og:type", content: "website"}
        ]}
      /> : '';

    if (this.state.seriesItems && typeof this.state.series !== 'undefined' && this.state.series.type !== 'collection') {
      Object.keys(this.state.seriesItems).reverse().map((item, index) => {
        if (index < this.state.page) {
          seriesItems.push(
            <Col xs="12" md="8" key={item} className="pb-3 offset-md-2">
              <ItemDetail itemID={item} channelID={this.state.series.cID} onClick={this.showDetail} />
            </Col>
          );
        }
        return null
      });
    } else if (this.state.seriesItems && typeof this.state.series !== 'undefined' && this.state.series.type === 'collection') {
      Object.keys(this.state.seriesItems).map((item, index) => {
        if (index < this.state.page) {
          seriesItems.push(
            <Col xs="12" md="8" key={item} className="pb-3 offset-md-2">
              <ListDetail itemID={item} channelID={this.state.series.cID} userID={this.state.seriesItems[item]} />
            </Col>
          );
        }
        return null
      });
    }

    if (typeof this.state.seriesItems !== 'undefined') {
      detail = <InfiniteScroll
                  pageStart={0}
                  element={'span'}
                  loadMore={this.loadMore}
                  hasMore={this.state.hasMore}
                  loader={this.state.hasMore ? <Alert className="pb-3 col-12 col-md-8 offset-md-2" color="warning text-center"><strong>Loading ...</strong></Alert> : <span></span>} >
                  {seriesItems}
              </InfiniteScroll>
    } else {
      detail = <Alert className="col-12" color="warning text-center">
                <strong>Still to come!</strong> No items yet - download the app to create something new!
              </Alert>
    } 

    return (
      <Container fluid className="Series-content">
        {addMeta}
        <SeriesHeader selectedSeries={this.state.series} onClick={this.toggleGetApp} />
        {this.state.showGetApp ? <GetAppModal modal={this.state.showGetApp} onClose={this.toggleGetApp}/> : ''}
        <Container>
            <Row className={ this.state.showDetail ? 'hidden-xs-up Item-detail' : 'Item-detail'}>
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

export default SeriesComponent;