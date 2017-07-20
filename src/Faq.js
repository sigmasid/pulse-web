import React from 'react'
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
var createReactClass = require('create-react-class');

var FAQ = createReactClass({
  	render() {
    return (
      <Container className="about-faq">
      	<h3 className="mt-3 mb-5">FAQs</h3>
  		<ListGroup>
	        <ListGroupItem>
		        <ListGroupItemHeading> What can I do on Pulse? </ListGroupItemHeading>
		        <ListGroupItemText> Subscribe to exclusive professional channels, discover new thought provoking series’, learn from & interact with experts, become a contributor or even start your own channel – there are endless ways to enjoy Pulse. </ListGroupItemText>
	        </ListGroupItem>
	        <ListGroupItem>
		        <ListGroupItemHeading> How are professionals using Pulse? </ListGroupItemHeading>
		        <ListGroupItemText>Pulse fits a variety of professional needs easily. Whether you are a real estate agent who wants to showcase listings, or a founder who wants to showcase a startup or a food critic reviewing restaurants – you will find (or start) a Pulse to be flexible, fast and easy to use</ListGroupItemText>
	        </ListGroupItem>
	        <ListGroupItem>
		        <ListGroupItemHeading> What type of content can be created on Pulse? </ListGroupItemHeading>
		        <ListGroupItemText> We use your phone Camera as the primary input for content creation. Each clip you record or use can be up to 20 seconds long and you can add up to 7 (140 seconds total). You can mix images, text and videos both directly from camera or from your photo album.  </ListGroupItemText>
	        </ListGroupItem>	    
	        <ListGroupItem>
		        <ListGroupItemHeading> What are the benefits of being a contributor? </ListGroupItemHeading>
		        <ListGroupItemText> Pulse offers an unparalleled platform to showcase your personal brand and expertise in front of a targeted, engaged & informed audience - so you spend more time sharing what you know and less time optimizing how build a following.  </ListGroupItemText>
	        </ListGroupItem>	   
	        <ListGroupItem>
		        <ListGroupItemHeading> How do I become a contributor or a guest? </ListGroupItemHeading>
		        <ListGroupItemText> You can apply directly in the app for any channel you want to become a contributor for. We are looking for experts who can provide unique insights & create thoughtful, interesting content. As a contributor, you can create, collaborate, invite & contribute! </ListGroupItemText>
	        </ListGroupItem>	
  		</ListGroup>
      </Container>
  	)
  },
});

export default FAQ;