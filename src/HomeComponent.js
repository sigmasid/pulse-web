import React from 'react';
import Carousel from 'nuka-carousel';

import { Link } from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import { Alert, Card, CardText, CardTitle} from 'reactstrap';

import exploreImage from './images/site_explore_channels.png'; // Tell Webpack this JS file uses this image
import channelDetailImage from './images/site_channel_detail.png'; // Tell Webpack this JS file uses this image
import contentDetailImage from './images/site_content_detail.png'; // Tell Webpack this JS file uses this image

import previousButton from './images/back_button.png'; // Tell Webpack this JS file uses this image
import nextButton from './images/next_button.png'; // Tell Webpack this JS file uses this image
var createReactClass = require('create-react-class');

var Slide = createReactClass({
  render: function() {
    return(
      <Row className="Slide-row">
        <Col xs={10} md={4} className="slide-img offset-1 text-center">
          <img src={this.props.slideImage} alt="About Pulse" className="text-center" />
        </Col>
        <Col xs={10} md={4} className="slide-text offset-1 pt-5 pt-sm-5">
          <Card className="">
            <CardTitle className="text-capitalize text-center">{this.props.slideTitle}</CardTitle>
            <CardText className="text-center">{this.props.slideDescription}</CardText>
          </Card>
        </Col>
      </Row>
    );
  }
});

var HomeComponent = createReactClass({
  mixins: [Carousel.ControllerMixin],

  render: function() {
  console.log('render function fired');

  var exploreTitle = "Pulse is content that matters";
  var channelDetailTitle = "Pulse is voices that matter";
  var contentDetailTitle = "Pulse is creating what matters";

  var exploreDescription = "Pulse is channels for finance & investing, entrepreneurship, real estate, arts, movies, sports & more";
  var channelDetailDescription = "Pulse is execs talking IPOs, VCs talking deals, founders showcasing new idea, authors giving interviews, admission counselors doing Q&A, scientists debating scientists";
  var contentDetailDescription = "Pulse mobile publishing & discovery tools for collaborating, creating & showcasing professional content that is as craveworthy as artisnal lattes";

  var Decorators = [{
    component: createReactClass({
      render() {
        return (
          <button onClick={this.props.previousSlide} className="previous-button hidden-xs-down">
            <img src={previousButton} alt="previous"></img>
          </button>
        )
      }
    }),
    position: 'CenterLeft',
    style: {
      padding: 20
    }
  }, { 
    component: createReactClass({
      render() {
        return (
          <button
            onClick={this.props.nextSlide} className="next-button hidden-xs-down">
            <img src={nextButton} alt="next"></img>
          </button>
        )
      }
    }),
    position: 'CenterRight',
    style: {
      padding: 20
    }}];

  return(
    <Container fluid className="Container-home-fluid">
      <Alert className="Row text-center" color="info">
        <Link to={`/web`}><strong>Ideas, content and voices that matter</strong><br /><u>see a preview</u></Link>
      </Alert>
      <Container className="Container-home">
        <Carousel autoplay={true} autoplayInterval={3000} initialSlideHeight={500} slideWidth={1} wrapAround={true} decorators={Decorators} className="Home-carousel pt-1">
          <Slide slideTitle={exploreTitle} slideDescription={exploreDescription} slideImage={exploreImage} />
          <Slide slideTitle={channelDetailTitle} slideDescription={channelDetailDescription} slideImage={channelDetailImage} />
          <Slide slideTitle={contentDetailTitle} slideDescription={contentDetailDescription} slideImage={contentDetailImage} />
        </Carousel>
      </Container>
    </Container>
  );
  }
})

export default HomeComponent;