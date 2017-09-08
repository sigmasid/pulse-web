import React from 'react'
import { Container, Jumbotron, Nav, Navbar, NavItem, NavLink, Row, Col, Card, CardTitle, CardBlock, CardText, TabContent, TabPane, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import imgForCreators from './images/site_for_creators.png'; // Tell Webpack this JS file uses this image
import channelDetailImage from './images/site_channel_detail.png'; // Tell Webpack this JS file uses this image
import FAQ from './Faq.js';

var createReactClass = require('create-react-class');

var About = createReactClass({
	contextTypes: {
    	setSelected: React.PropTypes.func.isRequired
    },

	componentWillMount: function() {
    	var selectedNav = {};
    	selectedNav["title"] = "About";
	    this.context.setSelected(selectedNav, true);
	},

  	getInitialState: function() {
    	return {
    		activeTab: '1'
    	};
  	},

  	render() {
    return (
    <Container className="About-container">
    	<Row>
	    	<Col xs={12} md={2} className="about-nav-col">
	    		<Navbar className="row">
	    	  <Nav tabs navbar className="about-nav">
	          <NavLink href="#" onClick={this.toggle.bind(null, "1")} className={ this.state.activeTab === '1' ? 'active' : ''}>Vision</NavLink>
	          <NavLink href="#" onClick={this.toggle.bind(null, "2")} className={ this.state.activeTab === '2' ? 'active' : ''}>Company</NavLink>
  	          <NavLink href="#" onClick={this.toggle.bind(null, "3")} className={ this.state.activeTab === '3' ? 'active' : ''}>FAQs</NavLink>
	          <NavLink href="#" onClick={this.toggle.bind(null, "4")} className={ this.state.activeTab === '4' ? 'active' : ''}>Contact</NavLink>
	        </Nav>
	        </Navbar>
	    	</Col>
	    	<Col xs={12} md={10}>
	    	  <TabContent activeTab={this.state.activeTab}>
	          	<TabPane tabId="1">
	    			<ValueProposition />
	          	</TabPane>
	         	<TabPane tabId="2">
	         		<Company />
	          	</TabPane>
	         	<TabPane tabId="3">
	         		<FAQ />
	          	</TabPane>
	         	<TabPane tabId="4">
	         		<Contact />
	          	</TabPane>
	        </TabContent>
	    	</Col>
  		</Row>
    </Container>
    )
  },

  toggle: function(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
});

var ValueProposition = createReactClass({
	getInitialState: function() {
    return {
    	activeTab: '1'
    };
  },

  toggle: function(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  },

	render: function() {
    return(
    	<Container className="vision-container">
  		 <Jumbotron className="hidden-xs-down">
          <h5 className="text-center display-5">Building What Matters</h5>
          <p className="text-center">a home for ideas, content & topics that matter</p>
		   	<Navbar>
	    	  <Nav pills className="value-prop-nav">
	    	  	<NavItem>
	          	<NavLink href="#" onClick={this.toggle.bind(null, "1")} className={ this.state.activeTab === '1' ? 'active' : ''}>for creators</NavLink>
	          </NavItem>
	          <NavItem>
	          	<NavLink href="#" onClick={this.toggle.bind(null, "2")} className={ this.state.activeTab === '2' ? 'active' : ''}>for users</NavLink>
	        	</NavItem>
	        </Nav>
		    </Navbar>
      </Jumbotron>
      <Container className="hidden-sm-up mobile-links">
        <h3 className="mt-4 mb-2 text-center display-4">Building What Matters</h3>
	    <p className="mt-2 mb-4 text-center">a home for ideas, content & topics that matter</p>
	  		<Navbar>
	    	  <Nav pills className="value-prop-nav">
	    	  	<NavItem>
	          	<NavLink href="#" onClick={this.toggle.bind(null, "1")} className={ this.state.activeTab === '1' ? 'active' : ''}>for creators</NavLink>
	          </NavItem>
	          <NavItem>
	          	<NavLink href="#" onClick={this.toggle.bind(null, "2")} className={ this.state.activeTab === '2' ? 'active' : ''}>for users</NavLink>
	        	</NavItem>
	        </Nav>
		    </Navbar>
	    </Container>
    	<Row>
	    	<TabContent activeTab={this.state.activeTab}>
	        <TabPane tabId="1">
	  				<CreatorValueProp />
	        </TabPane>
	       	<TabPane tabId="2">
	       		 <UserValueProp />
	        </TabPane>
	      </TabContent>
      </Row>
    </Container>
  	)
  }
});

var Contact = createReactClass({
	render: function() {
    return(
    	<Container>
        <h3 className="mt-3 mb-5">Contact</h3>
        <p>we are a fast growing San Francisco based team!</p>
        <p>want to get in touch? interested in joining the team? send us a note at <strong>hi@getpulse.tv</strong></p>
	    </Container>
  	)
  }
});

var Company = createReactClass({
	render: function() {
    return(
      <Container className="about-company">
      	<h3 className="mt-3 mb-5">The Team</h3>
      	<Card>
    			<CardTitle>Sid Tiwari (Founder)</CardTitle>
    			<CardText>Sid is the founder of Pulse. The vision behind Pulse was to leverage visual storytelling tools for creating impactful professional content. 
    				Pulse is designed to empower professionals, experts, though leaders, authors, critics, creatives, editors and everyone else who wants to 
    				create a smarter alternative to farm-to-table brunch stories.<br/><br/>
    				After spending 8 years in Finance, most recently as Vice President and Head of Internet & E-Commerce at Blackstone, Sid was the co-founder of Jeweliq,
    				a direct-to-consumer fashion brand, where he lead business development and overall strategy for the company. 
    			</CardText>
      	</Card>
      </Container>
  	)
  }
});


var CreatorValueProp = createReactClass({
  render: function() {
    return(
  		<Row className="creator-value-prop">
			<Col xs={12} md={6}>
				<Card>
					<CardBlock>
						<ListGroup>
			        <ListGroupItem>
			        	<ListGroupItemHeading className="capitalize">for mobile, of mobile, by mobile</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	use mobile, camera & messaging for a higher professional purpose (and it doesn't disappear in 24 hours)
			          </ListGroupItemText>
			        </ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>create different, create bold, create new</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			        	discussions, debates, interviews, roundtables, panels, Q&A, feedback sessions and on and on
			        </ListGroupItemText>
			        </ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>interact + engage + collaborate</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	connect whoever, wherever, whenever - connect people, ideas, content in real-time, directly on platform
			          	</ListGroupItemText>
						</ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>you are the star</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	build thriving brands for any topic big or small (minus the overhead) - RIP top-down, monolithic media pubs
			          </ListGroupItemText>
					</ListGroupItem>
		      	</ListGroup>
					</CardBlock>
				</Card>
			</Col>
			<Col md={6} className="hidden-sm-down creator-img">
				<img src={imgForCreators} alt="value for creators" />
			</Col>
			</Row>
    )}
});

var UserValueProp = createReactClass({
  render: function() {
    return(
		<Row>
			<Col xs={12} md={6}>
				<Card>
					<CardBlock>
						<ListGroup>
			        <ListGroupItem>
			        	<ListGroupItemHeading>sh** that matters</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	professional content = yes, cat videos = no
			          </ListGroupItemText>
			        </ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>raw & unfiltered</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	no media biases - undistorted, unfiltered views directly from experts
			          </ListGroupItemText>
			        </ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>bite sized & tap ready</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	RIP long articles - why? because you probably won't even finish reading this
			          </ListGroupItemText>
							</ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>be part of the story</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	ask a question, get feedback on a project, share you perspectives (and a lot more)
			          </ListGroupItemText>
							</ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>curated for you</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	channel editors curate the experience - no need to follow / unfollow
			          </ListGroupItemText>
					</ListGroupItem>
		      	</ListGroup>
					</CardBlock>
				</Card>
			</Col>
			<Col md={6} className="hidden-sm-down creator-img">
				<img src={channelDetailImage} alt="value for creators" />
			</Col>
		</Row>
    )}
});

export default About;