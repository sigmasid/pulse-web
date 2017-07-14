import React from 'react'
import * as firebase from "firebase";
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { Col, Card, CardBlock, CardTitle, CardFooter, CardHeader, CardImg, Button } from 'reactstrap';

import ItemContentComponent from './ItemContentComponent.js';
import UserSummary from './UserSummaryComponent.js';

import previousButton from './images/back_button.png'; // Tell Webpack this JS file uses this image
import nextButton from './images/next_button.png'; // Tell Webpack this JS file uses this image

var createReactClass = require('create-react-class');

var ItemDetailComponent = createReactClass({
  contextTypes: {
    setSelected: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      user: '',
      thumbURL: '',
      showDetail: false,
      showNext: false,
      showPrevious: false,
      nextItemIndex: 0,
      createdItems: {}
    };
  },

  reorderItems: function(items, type) {
    if (type === 'showcase' || type === 'post' || type === 'interview') {
      //since cover is at the end - remove it and add it as first item
      let lastItem = items.pop();
      items.unshift(lastItem);
      var lastCreatedItem = {};
      lastCreatedItem[lastItem] = this.props.item;

      this.setState({
        createdItems: lastCreatedItem
      })
      return items;
    } else {
      //else set items in chron order
      return items;
    }
  },

  getSeriesItems: function(seriesID) {
    firebase.database().ref('itemCollection').child(seriesID).once('value').then(function(snapshot) {
      if (snapshot.val() !== null) {
        var orderedItems = [];

        snapshot.forEach(function(child) {
          orderedItems.push(child.key);
        });

        var reorderedItems = this.reorderItems(orderedItems, this.state.item.type);
        this.getNextItem(reorderedItems[1]);

        this.setState({
          seriesItems: reorderedItems,
          showNext: true,
          nextItemIndex: 1
        });
      }
    }.bind(this));
  },

  getNextItem: function(itemID) {
    firebase.database().ref('items').child(itemID).once('value').then(function(snapshot) {
      if (snapshot.val() !== null) {
        var newItems = this.state.createdItems;
        newItems[itemID] = snapshot.val();
        this.setState({
          nextItem: snapshot.val(),
          createdItems: newItems
        })
      }
    }.bind(this));
  },

  handleNextItem: function() {
    if (this.state.nextItem !== 'undefined' && this.state.nextItem !== '') {
      var tempIndex = this.state.nextItemIndex + 1;
      this.setState({
        previousItem: this.state.item,
        item: this.state.nextItem,
        nextItem: '',
        showPrevious: true,
        nextItemIndex: tempIndex
      });

      if (this.state.nextItemIndex + 1 < this.state.seriesItems.length) {
        if (typeof this.state.createdItems[this.state.seriesItems[tempIndex]] !== 'undefined') {
          this.setState({
            nextItem: this.state.createdItems[this.state.seriesItems[tempIndex]]
          })
        } else {
          this.getNextItem(this.state.seriesItems[this.state.nextItemIndex + 1]);
        }
      } else {
        this.setState({
          showNext: false
        })
      }
    }
  },

  handlePreviousItem: function() {
    if (this.state.previousItem !== 'undefined' && this.state.previousItem !== '') {
      var tempIndex = this.state.nextItemIndex - 1;
      this.setState({
        nextItem: this.state.item,
        item: this.state.previousItem,
        previousItem: '',
        nextItemIndex: tempIndex
      })

      //since we are using nextItemIndex - it will be 1 when we are at the index item
      if (tempIndex - 1 >= 1) {
        this.setState({
          previousItem: this.state.createdItems[this.state.seriesItems[tempIndex - 2]],
          showPrevious: true,
          showNext: true
        })
      } else {
        this.setState({
          previousItem: '',
          showNext: true,
          showPrevious: false
        })
      }
    }
  },

  componentDidMount: function() {
    if (typeof this.props.item !== 'undefined') {
      if (typeof this.props.user === 'undefined') {
        firebase.database().ref('/userPublicSummary/' + this.props.item.uID).once('value').then(function(userSnap) {
          this.setState({
            user: userSnap.val(),
            item: this.props.item
          })
        }.bind(this));
      } else {
        this.setState({
          user: this.props.user,
          item: this.props.item
        })
      }

      if (this.props.item.type !== 'question' && this.props.item.contentType !== 'postcard') {
        var storageRef = firebase.storage().ref('channels').child(this.props.channelID).child(this.props.itemID).child('thumb');
        storageRef.getDownloadURL().then(function(url) {
          if (typeof url !== 'undefined') {
            this.setState({
              thumbURL: url
            });
          }
        }.bind(this));
      }
    } else {
      firebase.database().ref('/items/' + this.props.itemID).once('value').then(function(snap) {
        var item = snap.val();

        if (item.type !== 'question' && item.contentType !== 'postcard') {
            var storageRef = firebase.storage().ref('channels').child(item.cID).child(this.props.itemID).child('thumb');
            storageRef.getDownloadURL().then(function(url) {
              if (typeof url !== 'undefined') {
                this.setState({
                  item: snap.val(),
                  itemID: snap.key,
                  thumbURL: url
                });
              }
          }.bind(this));
        } else {
          this.setState({
              itemID: snap.key,
              item: snap.val()
            });
        }

        if (typeof this.props.user === 'undefined') {
          firebase.database().ref('/userPublicSummary/' + item.uID).once('value').then(function(userSnap) {
          this.setState({
              user: userSnap.val()
          })
          }.bind(this));
        } else {
          this.setState({
            user: this.props.user
          })
        }
      }.bind(this));

    }
  },

  closeDetail: function() {
    this.setState({
      showDetail: false,
      showNext: false,
      showPrevious: false,
      nextItemIndex: 0
    })
  },

  handleClick: function() {
    var item = (typeof this.props.item !== 'undefined') ? this.props.item : (typeof this.state.item !== 'undefined') ? this.state.item : '';
    var itemID = (typeof this.state.itemID !== 'undefined' ? this.state.itemID : (typeof this.props.itemID !== 'undefined') ? this.props.itemID : item['.key'])

    if (item !== '') {
      if (item.type === 'post' || item.type === 'perspective' || item.type === 'answer' || item.type === 'session' || item.type === 'showcase') {
        this.getSeriesItems(itemID);
        this.setState({
          showDetail: true,
        })
        //this.props.onClick(item, this.state.user, this.state.thumbURL);
      } else {
        browserHistory.push(`/i/${itemID}`);
      }
    }
  },

  render: function() {
    var userSummaryItem = null; 
    var itemImage = null;
    var itemDetail = null;
    var itemType = '';
    var cssTag = '';

    var item  = typeof this.props.item !== 'undefined' ? this.props.item : typeof this.state.item !== 'undefined' ? this.state.item : '';
    var date = new Date(item.createdAt);
    var tagTitle = '';

    if (typeof item.tagTitle !== 'undefined') {
      tagTitle = <Link to={`/i/${item.tagID}`}># { item.tagTitle }</Link>;
    }

    if (this.state.user !== '') {
      userSummaryItem = <Link to={`/u/${item.uID}`} onClick={this.context.setSelected.bind(null, this.state.user)}><UserSummary user={this.state.user} /></Link>; 
    }

    if (item !== '') {
      if ((item.type !== 'question') && this.state.thumbURL !== '') {
        itemImage = <Link to={this.props.myroute} onClick={ this.handleClick }>
                      <CardImg top width="100%" src={ this.state.thumbURL } alt="Card image" />
                    </Link>
      }
    } 

    itemDetail = (this.state.showDetail) ?
                <ItemContentComponent 
                  user={this.state.user} 
                  contentURL={this.state.item.url} 
                  item={this.state.item} 
                  thumbURL={this.state.thumbURL} /> : null;

    switch (item.type) {
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
      case 'interview':
        itemType = ' gave an interview';
        cssTag = 'card-block-interview';
        break;
      case 'session':
        itemType = ' requested feedback';
        cssTag = 'card-block-thread';
        break;
      case 'showcase':
        itemType = ' added a showcase';
        cssTag = 'card-block-post';
        break;
      default: 
        cssTag = 'card-block-default';
        break;
    }

    var closeButton = <Col xs={2} sm={3} md={4}  className="float-right"><Button className="close" aria-label="Close" onClick={this.closeDetail.bind(this, null)}><span aria-hidden="true">&times;</span></Button></Col>
    var itemTypeDescription = <Col xs={2} sm={3} md={4} className="card-tag-title"><small className="text-muted float-right">{itemType}</small></Col>
    var rightHeader = this.state.showDetail ? closeButton : itemTypeDescription
    var nextItemButton = this.state.showNext ? <span className="next-detail-item"><Link to={this.props.myroute} onClick={ this.handleNextItem.bind(this, null) }><img src={nextButton} alt="next" /></Link></span> : null
    var previousItemButton = this.state.showPrevious ? <span className="previous-detail-item"><Link to={this.props.myroute} onClick={ this.handlePreviousItem.bind(this, null) }><img src={previousButton} alt="next" /></Link></span> : null


    return(
      <Card className="Item-card">
        <CardHeader className="row">
          <Col xs={10} sm={9} md={8}>{ userSummaryItem }</Col>
          { rightHeader }
        </CardHeader>
        { this.state.showDetail ? itemDetail : itemImage }
        { previousItemButton }
        { nextItemButton }
        <CardBlock className={cssTag}>
          <CardTitle>
            <Link to={this.props.myroute} onClick={ this.handleClick }>
              { item.title }
            </Link>
          </CardTitle>
        </CardBlock>
        <CardFooter>
            <small className="text-muted">{ date.toDateString() }</small>
            <small className="text-muted float-right">{ tagTitle }</small>
        </CardFooter>
      </Card>
    );
  }
});

export default ItemDetailComponent;

