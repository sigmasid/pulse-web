import React from 'react';
import * as firebase from "firebase";
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

import { Container } from 'reactstrap';

import TopNav from './TopNav.js'; 
import BottomNav from './BottomNav.js';
import About from './About.js';
import GetApp from './GetApp.js';

import IndexComponent from './IndexComponent.js';
import ChannelsComponent from './ChannelsComponent.js';
import AnswersComponent from './AnswersComponent.js';
import UserComponent from './UserComponent.js';

import './App.css';

var config = {
  apiKey: "AIzaSyAJa2_jjaxFCWE0mLbRNfZ9lKZWK0mUyNU",
  authDomain: "pulse-84022.firebaseapp.com",
  databaseURL: "https://pulse-84022.firebaseio.com",
  storageBucket: "pulse-84022.appspot.com",
  messagingSenderId: "31468123699"
};
firebase.initializeApp(config);

/**
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    firebase.auth().signInAnonymously();
  } else {
    console.log('user', user);
  }
}); **/

var App = React.createClass({
  setSelected: function(selected) {
    this.setState({
      selected: selected
    });
  },

  getInitialState: function() {
    return {
      selected: '',
    };
  },

  render: function() {
    var renderedChildren = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, { selected: this.state.selected, setSelected: this.setSelected })
    }.bind(this));

    return (
    <Container fluid>
      <TopNav message={typeof this.state.selected.title !== '' ? this.state.selected.title : ''} />
        { renderedChildren }
      <BottomNav />
      <GetApp />
    </Container>
    );
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexComponent} />
      <Route path="/c/:channelID" component={ChannelsComponent}></Route>
      <Route path="/q/:questionID" component={AnswersComponent} /> 
      <Route path="/u/:uID" component={UserComponent} />  
    </Route>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('root'))

export default App;