/* eslint-disable react-in-jsx-scope */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

var ChannelDetail = React.createClass({
	getInitialState: function(){
	  return {
	    channel: {
	      questions: []
	    }
	  }
	},

	render: function() {
	if (this.props.params !== '') {
		console.log('have params');
		return (
			<div>{ console.log(this.props.params) }</div>
		)
	} else {
		console.log('no params');
		return(<div></div>)
	}
  }
});

export default ChannelDetail;