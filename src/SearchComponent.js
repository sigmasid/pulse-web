import React from 'react'
import * as firebase from "firebase";
import { Form, FormGroup, Input, Button } from 'reactstrap';
var createReactClass = require('create-react-class');

var SearchComponent = createReactClass({
	getInitialState: function() {
    	return {
      		term: ''
    	};
  	},

	buildQueryBody: function(query, term, matchWholePhrase) {
		if( matchWholePhrase ) {
			var body = query.body = {};
			body.query = {
		  	// match_phrase matches the phrase exactly instead of breaking it
		  	// into individual words
		  	"match_phrase": {
		    // this is the field name, _all is a meta indicating any field
		    	"_all": term
		  	}
			}
		}
		else {
			query.q = term;
		}
	},

	buildQuery: function(searchTerm) {
		// this just gets data out of the form
		var index = "channels";
		var type = "channels";
		var term = searchTerm;
		var matchWholePhrase = true;

		// skeleton of the JSON object we will write to DB
		var query = {
			index: index,
			type: type
		};

		this.buildQueryBody(query, term, matchWholePhrase);

		return query;
	},

	// conduct a search by writing it to the search/request path
	doSearch: function(query) {
		var ref = firebase.database().ref('search');
		var key = ref.child('request').push(query).key;

		ref.child('response/'+key).on('value', this.showResults);
	},

	// when results are written to the database, read them and display
	showResults: function(snap) {
		if( !snap.exists() ) { return; } // wait until we get data
		var results = snap.val().hits;

		// when a value arrives from the database, stop listening
		// and remove the temporary data from the database
		snap.ref.off('value', this.showResults);
		snap.ref.remove();
		this.props.handleSearch(results);
	},

	handleChange: function(event) {
		this.setState({term: event.target.value});
	},

	handleSubmit: function(event) {
		event.preventDefault();
		this.doSearch(this.buildQuery(this.state.term));
	},

	render: function() {
	return(
		<Form inline onSubmit={this.handleSubmit}>
		  <FormGroup>
		    <Input placeholder="search channels" className="form-control col-9 col-lg-10" value={this.state.term} onChange={this.handleChange} />
		    <Button color="primary" className="col-2 col-md-2 col-lg-1 offset-1">Go</Button>
		  </FormGroup>
		</Form>
	);
	}
});

export default SearchComponent;