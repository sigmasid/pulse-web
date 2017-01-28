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
import Helmet from 'react-helmet';

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
  childContextTypes: {
    setSelected: React.PropTypes.func.isRequired
  },

  getChildContext: function() {
    return {setSelected: this.setSelected};
  },

  setSelected: function(propVal, updateNav) {
    if (updateNav === true) {
      this.setState({
        selected: propVal,
        selectedNav: propVal
      });
    } else {
      this.setState({
        selected: propVal,
      }); 
    }
  },

  getInitialState: function() {
    return {
      selected: '',
      selectedNav: ''
    };
  },

  render: function() {
    var renderedChildren = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, { selected: this.state.selected })
    }.bind(this));


    var message = '';
    if (typeof this.state.selectedNav.title !== 'undefined') {
      message = this.state.selectedNav.title
    } else if (typeof this.state.selectedNav.name !== 'undefined') {
      message = this.state.selectedNav.name
    }

    return (
    <Container fluid>
      <Helmet defaultTitle="Welcome to Pulse" titleTemplate="Pulse | %s"/>
      <TopNav message={ message } />
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