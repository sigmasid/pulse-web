import React from 'react';
import * as firebase from "firebase";
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';

import { Container } from 'reactstrap';

import TopNav from './TopNav.js'; 
import BottomNav from './BottomNav.js';
import About from './About.js';
import GetApp from './GetApp.js';

import IndexComponent from './IndexComponent.js';
import ChannelsComponent from './ChannelsComponent.js';
import AnswersComponent from './AnswersComponent.js';
import ChannelDetail from './ChannelDetail.js';
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

firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    firebase.auth().signInAnonymously();
  } else {
    console.log('user', user);
  }
});

var App = React.createClass({
  render: function() {
    return (
    <Container fluid>
      <TopNav />
      <IndexComponent />
      <BottomNav />
      <GetApp />
    </Container>
    );
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <Route path="/c/:channelID" component={ChannelsComponent}></Route>
    </Route>
    <Route path="/q/:questionID" component={AnswersComponent} /> 
    <Route path="/u/:uID" component={UserComponent} />  
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('root'))

export default App;