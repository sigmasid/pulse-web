import React from 'react'
import { Container, Jumbotron, Alert, Nav, Navbar, NavItem, NavLink, Row, Col, Card, CardTitle, CardBlock, CardText, TabContent, TabPane, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import imgForCreators from './images/site_for_creators.png'; // Tell Webpack this JS file uses this image

var About = React.createClass({
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
	    		<Navbar>
	    	  <Nav tabs navbar className="about-nav">
	          <NavLink href="#" onClick={this.toggle.bind(null, "1")} className={ this.state.activeTab === '1' ? 'active' : ''}>Vision</NavLink>
	          <NavLink href="#" onClick={this.toggle.bind(null, "2")} className={ this.state.activeTab === '2' ? 'active' : ''}>Company</NavLink>
	          <NavLink href="#" onClick={this.toggle.bind(null, "3")} className={ this.state.activeTab === '3' ? 'active' : ''}>Contact</NavLink>
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

var ValueProposition = React.createClass({
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
  		 <Jumbotron className="hidden-sm-down">
          <h5 className="text-center">Building What's Next</h5>
          <hr className="mb-3 mt-3" />
          <p className="text-center">a home for ideas, content & topics that matter</p>
          <p className="text-center">join us as we build media channels, brands, shows & magazines of tomorrow</p>
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
      <Container className="hidden-md-up mobile-links">
        <h3 className="mt-3 mb-3 text-center">Building What's Next</h3>
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

var Contact = React.createClass({
	render: function() {
    return(
    	<Container>
        <h3 className="mt-3 mb-5">Contact</h3>
        <p>we are a small (and growing) San Francisco based team!</p>
        <p>want to get in touch? interested in joining the team? send us a note at <strong>hi@checkpulse.co</strong></p>
	    </Container>
  	)
  }
});

var Company = React.createClass({
	render: function() {
    return(
      <Container className="about-company">
      	<h3 className="mt-3 mb-5">The Team</h3>
      	<Card>
    			<CardTitle>Sid Tiwari (CEO & Founder)</CardTitle>
    			<CardText>Sid is the founder of Pulse. The vision behind Pulse was to leverage visual storytelling tools for creating impactful professional content. 
    				Pulse is designed to empower professionals, experts, though leaders, authors, critics, creatives, editors and everyone else who wants to 
    				create content that can compete with farm-to-table brunche stories.<br/><br/>
    				After spending 8 years in Finance, most recently as Vice President and Head of Internet & E-Commerce at Blackstone, Sid was the co-founder of Jeweliq,
    				a direct-to-consumer fashion brand, where he lead business development and overall strategy for the company. 
    			</CardText>
      	</Card>
      </Container>
  	)
  }
});


var CreatorValueProp = React.createClass({
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
			        	<ListGroupItemHeading>built bottoms up</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			        		you are now the brand - future is decentralized, targeted & nimble (RIP top-down, monolithic media pubs)
			          </ListGroupItemText>
			        </ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>create + collaborate</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	create wherever, whenever with whomever - invite & engage peers, experts & users directly on platform
			          </ListGroupItemText>
							</ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>interactive by nature</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	discussions, debates, interviews, roundtables, panels, Q&A, feedback sessions and on and on
			          </ListGroupItemText>
							</ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>you are the star</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	showcase your brand in front of like-minded audiences (no competing with selfies)
			          </ListGroupItemText>
							</ListGroupItem>
		      	</ListGroup>
					</CardBlock>
				</Card>
			</Col>
			<Col md={6} className="hidden-sm-down creator-img">
				<img src={imgForCreators} />
			</Col>
			</Row>
    )}
});

var UserValueProp = React.createClass({
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
			        	<ListGroupItemHeading>bite sized & swipe ready</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	RIP long articles - why? because you won't probably finish reading this
			          </ListGroupItemText>
							</ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>15 mins of fame</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	ask a question, get feedback, share you story - all in one place
			          </ListGroupItemText>
							</ListGroupItem>
			        <ListGroupItem>
			        	<ListGroupItemHeading>curated for you</ListGroupItemHeading>
			        	<ListGroupItemText className="text-muted">
			          	trusted editors & critics curating the experience - no need to follow / unfollow
			          </ListGroupItemText>
							</ListGroupItem>
		      	</ListGroup>
					</CardBlock>
				</Card>
			</Col>
		</Row>
    )}
});

export default About;