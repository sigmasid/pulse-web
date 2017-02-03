import React from 'react'
import * as firebase from "firebase";

import { Link } from 'react-router';
import { Badge, Alert, Row,Col, Card, CardHeader, CardBlock, CardLink, CardTitle, CardFooter} from 'reactstrap';

var QuestionDetailItem = React.createClass({
  contextTypes: {
    setSelected: React.PropTypes.func.isRequired
  },

  getLength(length) {
    return (<div>
              <Badge color="info">{length}</Badge>
              <span>{ length > 1 ? " Answers" : " Answer" }</span>
            </div>);
  },

  render: function() {
    return(
      <div>
      <CardBlock>
        <CardTitle>
          <Link to={`/q/${this.props.questionID}`}
                onClick={this.context.setSelected.bind(null, this.props.question)}>
                { this.props.question.title }
          </Link>
        </CardTitle>
      </CardBlock>
      <CardFooter>
          <CardLink tag={Link} className="tag-link" to={`/q/${this.props.questionID}`}
                    onClick={this.context.setSelected.bind(null, this.props.question)}>
                    See Answers
          </CardLink>
          <Badge color="info" className="float-right">
            { this.props.question.hasOwnProperty("answers") ? Object.keys(this.props.question.answers).length : 0 }
          </Badge>
      </CardFooter>
      </div>
      );
  }
});

var QuestionDetailComponent = React.createClass({
  getInitialState: function() {
    return {
      question: ''
    };
  },

  componentDidMount: function() {
    firebase.database().ref('/questions/' + this.props.questionID).once('value').then(function(snapshot) {
      this.setState({
        question: snapshot.val()
      })
    }.bind(this));
  },

  render: function() {
    if (this.state.question !== '') {
      return(<QuestionDetailItem question={this.state.question} questionID={this.props.questionID} />); 
    } else {
      return(null);
    }
  }
});

var QuestionList = React.createClass({
  render: function() {

    var createItem = function(question, index) {
      return(
        <Col md="4" sm="6" xs="12" key={question} className="pb-3">
          <Card>
            <CardHeader>{"# " + this.props.channelName}</CardHeader>
            <QuestionDetailComponent questionID={question} index={question} key={question} />
          </Card>
        </Col>);
    }.bind(this);

    if (typeof this.props.questions !== 'undefined') {
      return (
        <Row>
          { Object.keys(this.props.questions).map(createItem) }
        </Row>
      );
    }

    return(
      <Row>
        <Col xs="12">
          <Alert color="warning text-center">
              <strong>Sorry!</strong> This channel has no questions. Download the app to ask a question!
          </Alert>
        </Col>
      </Row>
    );
  }
});

export default QuestionList;