import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Jumbotron, Container } from 'reactstrap';

export default class Privacy extends React.Component {
    static contextTypes = {
    	setSelected: React.PropTypes.func.isRequired
  	}

	componentWillMount() {
		var selectedNav = {};
		selectedNav["title"] = "Privacy";
	    this.context.setSelected(selectedNav, true);
	}

	render() {
    return (
	<Container className="privacy">
		<Jumbotron className="Question-header text-center" color="white"><h1>Pulse Privacy Policy</h1></Jumbotron>
      	<ListGroup>
  		    <ListGroupItem>
				<ListGroupItemText>Pulse is a trusted home for professional mobile content. You can join interactive channels that interest you, browse what others are interested in, interact directly with experts & contributors and also apply to become a featured contributor for channels. You can continue the conversation and chat with experts, users & contributors directly on the platform as well.</ListGroupItemText>
				<ListGroupItemText>When you use these services—and any others we in the Think Apart corporate family roll out, whether in the Pulse app or elsewhere—you’ll share some information with us. We get that that can affect your privacy. So we want to be upfront about the information we collect, how we use it, whom we share it with, and the choices we give you to control, access, and update your information.</ListGroupItemText>
				<ListGroupItemText>That’s why we’ve written this Privacy Policy. And it’s why we’ve tried to write it in a way that’s blissfully free of the legalese that often clouds these documents. Of course, if you still have questions about anything in our Privacy Policy, just email us.</ListGroupItemText>
	        </ListGroupItem>
          	<ListGroupItem><ListGroupItemHeading><strong>Information We Collect</strong></ListGroupItemHeading></ListGroupItem>
	       	<ListGroupItem>
				<ListGroupItemText>There are three basic categories of information we collect:</ListGroupItemText>
			</ListGroupItem>
			<ListGroupItem>
	  		    <ListGroupItemText><strong>1. Information You Choose to Give Us</strong></ListGroupItemText>
	  		    <ListGroupItemText>When you interact with our services, we collect the information that you choose to share with us. For example, most of our services require you to set up a basic account, so we need to collect a few important details about you, such as a password, an email address, a phone number, and your date of birth. To make it easier for others to find you, we may also ask you to provide us with some additional information that will be publicly visible on our services, such as profile pictures, a name, or other useful identifying information. </ListGroupItemText>
				<ListGroupItemText>Of course, you’ll also provide us whatever information you send through the services. Keep in mind that the users you interact with and message can always save that content or copy it outside the app. It probably goes without saying, but we’ll say it anyway: When you contact Pulse Support or communicate with us in any other way, we’ll collect whatever information you volunteer.</ListGroupItemText>
	  		    <ListGroupItemText><strong>2. Information We Get When You Use Our Services</strong></ListGroupItemText>
				<ListGroupItemText>When you use our services, we collect information about which of those services you’ve used and how you’ve used them. We might know, for instance, that you watched a particular Answer, joined a specific channel, and sent messages to other users. Here’s a fuller explanation of the types of information we collect when you use our services :</ListGroupItemText>	
      			<ListGroup className="showBullets">
					<ListGroupItem><strong>Usage Information.</strong> We collect information about your activity through our services. For example, we may collect information about how you interact with the services, such as which channels you view or which videos you watch, or which search queries you submit.</ListGroupItem>
					<ListGroupItem><strong>Content Information. </strong>We collect information about the content you provide, such as if the recipient has viewed the content and the metadata that is provided with the content.</ListGroupItem>
					<ListGroupItem><strong>Device Information. </strong>We collect device-specific information, such as the hardware model, operating system version, advertising identifier, unique application identifiers, unique device identifiers, browser type, language, wireless network, and mobile network information (including the mobile phone number).</ListGroupItem>
					<ListGroupItem><strong>Device Phonebook. </strong>Because you may want to share content, channels or other information on Pulse with friends we may—with your consent—collect information from your device’s phonebook.</ListGroupItem>
					<ListGroupItem><strong>Camera and Photos. </strong>Many of our services require us to collect images and other information from your device’s camera and photos. For example, you won’t be able to add perspectives or interviews or upload photos from your camera roll unless we can access your camera or photos.</ListGroupItem>
					<ListGroupItem><strong>Location Information. </strong>When you use our services we may collect information about your location. With your consent, we may also collect information about your precise location using methods that include GPS, wireless networks, cell towers, Wi-Fi access points, and other sensors, such as gyroscopes, accelerometers, and compasses.</ListGroupItem>
					<ListGroupItem><strong>Information Collected by Cookies and Other Technologies. </strong>Like most online services and mobile applications, we may use cookies and other technologies, such as web beacons, web storage, and unique advertising identifiers, to collect information about your activity, browser, and device. We may also use these technologies to collect information when you interact with services we offer through one of our partners, such as commerce features. Most web browsers are set to accept cookies by default. If you prefer, you can usually remove or reject browser cookies through the settings on your browser or device. Keep in mind, though, that removing or rejecting cookies could affect the availability and functionality of our services. </ListGroupItem>
					<ListGroupItem><strong>Log Information. </strong>We also collect log information when you use our website. That information includes, among other things:
					<ListGroup className="showBulletsNested">
						<ListGroupItem>details about how you’ve used our services.</ListGroupItem>
						<ListGroupItem>device information, such as your web browser type and language.</ListGroupItem>
						<ListGroupItem>access times.</ListGroupItem>
						<ListGroupItem>pages viewed.</ListGroupItem>
						<ListGroupItem>IP address.</ListGroupItem>
						<ListGroupItem>identifiers associated with cookies or other technologies that may uniquely identify your device or browser.</ListGroupItem>
						<ListGroupItem>pages you visited before or after navigating to our website.</ListGroupItem>
					</ListGroup>
					</ListGroupItem>
	  		    </ListGroup>
	  		    <ListGroupItemText><strong>3. Information We Get When From Third Parties</strong></ListGroupItemText>
	  		    <ListGroupItemText>We may collect information that other users provide about you when they use our services. For example, if another user allows us to collect information from their device phonebook—and you’re one of that user’s contacts—we may combine the information we collect from that user’s phonebook with other information we have collected about you. We may also obtain information from other companies that are owned or operated by us, or any other third-party sources, and combine that with the information we collect through our services.</ListGroupItemText>
	        </ListGroupItem>
	        <ListGroupItem>
	          	<ListGroupItemHeading><strong>How We Use Information</strong></ListGroupItemHeading>
				<ListGroupItemText>What do we do with the information we collect? The short answer is: Provide you with an amazing set of products and services that we relentlessly improve. Here are some of the ways we do that:</ListGroupItemText>
				<ListGroup className="showBullets">
					<ListGroupItem>develop, operate, improve, deliver, maintain, and protect our products and services.</ListGroupItem>
					<ListGroupItem>send you communications, including by email. For example, we may use email to respond to support inquiries or to share information about our products, services, and promotional offers that we think may interest you.</ListGroupItem>
					<ListGroupItem>monitor and analyze trends and usage.</ListGroupItem>
					<ListGroupItem>personalize the services by, among other things, suggesting experts or channels you would be interested in.</ListGroupItem>
					<ListGroupItem>contextualize your experience by, among other things, tagging your content using your precise location data (if, of course, you’ve consented to us collecting that data) and applying other labels based on the content.</ListGroupItem>
					<ListGroupItem>enhance the safety and security of our products and services.</ListGroupItem>
					<ListGroupItem>verify your identity and prevent fraud or other unauthorized or illegal activity.</ListGroupItem>
					<ListGroupItem>use information we’ve collected from cookies and other technology to enhance the services and your experience with them.</ListGroupItem>
					<ListGroupItem>enforce our Terms of Service and other usage policies.</ListGroupItem>
				</ListGroup>
				<ListGroupItemText>We may also store some information locally on your device. For example, we may store information as local cache so that you can open the app and view content faster.</ListGroupItemText>
			</ListGroupItem>
			<ListGroupItem>
	          	<ListGroupItemHeading><strong>How We Share Information</strong></ListGroupItemHeading>
	        </ListGroupItem>
	        <ListGroupItem>
				<ListGroupItemText>We may share information about you in the following ways:</ListGroupItemText>
				<ListGroup className="showBullets">
					<ListGroupItem><strong>With other Users. </strong>We may share the following information with other users:
						<ListGroup className="showBulletsNested">
						<ListGroupItem>information about you, such as your name, public profile and contact information.</ListGroupItem>
						<ListGroupItem>information about how you have interacted with the services, such as which channels you follow, and other information that will help Pulse understand your connections with others using the services. </ListGroupItem>
						<ListGroupItem>any additional information you have consented for us to share. For example, when you let us access your device phonebook, we may share information about you with other users who have your phone number in their device phonebook.</ListGroupItem>
						<ListGroupItem>content you post or send will be shared with other Pulse users; most of the time all content posted on Pulse is public and is viewable by anyone using our service. </ListGroupItem>
						</ListGroup>
					</ListGroupItem>
					<ListGroupItem><strong>With all users, our business partners, and the general public. </strong>We may share the following information with all users as well as with our business partners and the general public:
						<ListGroup className="showBulletsNested">
						<ListGroupItem>public information like your public profile name, profile pictures.</ListGroupItem>
						<ListGroupItem>any content that you create. This content may be viewed by the public at large or rebroadcast by our business partners.</ListGroupItem>
						</ListGroup>
					</ListGroupItem>
					<ListGroupItem><strong>With third parties. </strong>We may share your information with the following third parties:</ListGroupItem>
					<ListGroupItem><strong>With service providers, sellers, and partners. </strong>We may share information about you with service providers who perform services on our behalf, sellers that provide goods through our services, and business partners that provide services and functionality.</ListGroupItem>
					<ListGroupItem><strong>With third parties for legal reasons. </strong>We may share information about you if we reasonably believe that disclosing the information is needed to:
						<ListGroup className="showBulletsNested">
						<ListGroupItem>comply with any valid legal process, governmental request, or applicable law, rule, or regulation.</ListGroupItem>
						<ListGroupItem>investigate, remedy, or enforce potential Terms of Service violations.</ListGroupItem>
						<ListGroupItem>protect the rights, property, and safety of us, our users, or others.</ListGroupItem>
						<ListGroupItem>detect and resolve any fraud or security concerns.</ListGroupItem>
						</ListGroup>
					</ListGroupItem>
					<ListGroupItem><strong>With third parties for legal reasons. </strong>We may share information about you if we reasonably believe that disclosing the information is needed to:</ListGroupItem>
					<ListGroupItem><strong>With third parties as part of a merger or acquisition. </strong>If Pulse gets involved in a merger, asset sale, financing, liquidation or bankruptcy, or acquisition of all or some portion of our business to another company, we may share your information with that company before and after the transaction closes.
						<ListGroupItemText>We may also share with third parties—such as advertisers—aggregated, non-personally identifiable, or de-identified information.</ListGroupItemText>
					</ListGroupItem>
				</ListGroup>
			</ListGroupItem>
			<ListGroupItem>
	          	<ListGroupItemHeading><strong>Third-Party Content and Integrations</strong></ListGroupItemHeading>
				<ListGroupItemText>The services may also contain third-party links and search results, include third-party integrations, or offer a co-branded or third-party-branded service. Through these links, third-party integrations, and co-branded or third-party-branded services, you may be providing information (including personal information) directly to the third party, us, or both. You acknowledge and agree that we are not responsible for how those third parties collect or use your information. As always, we encourage you to review the privacy policies of every third-party website or service that you visit or use, including those third parties you interact with through our services.</ListGroupItemText>
          	</ListGroupItem>
          	<ListGroupItem>
          		<ListGroupItemHeading><strong>Analytics and Advertising Services Provided by Others</strong></ListGroupItemHeading>
				<ListGroupItemText>We may let other companies use cookies, web beacons, and similar tracking technologies on our services. These companies may collect information about how you use our services and other websites and online services over time and across different services. This information may be used to, among other things, analyze and track data, determine the popularity of certain content, and better understand your online activity.</ListGroupItemText>
			</ListGroupItem>
          	<ListGroupItem>
          		<ListGroupItemHeading><strong>How Long We Keep Your Content</strong></ListGroupItemHeading>
				<ListGroupItemText>Most content that you share on Pulse are stored as long as necessary unless you explicitly request the content to be removed from our service. To request your content be removed, please email us at hi@getpulse.tv and we will be happy to help you. Finally, we may also retain certain information in backup for a limited period of time or as required by law.</ListGroupItemText>
			</ListGroupItem>
          	<ListGroupItem>
          		<ListGroupItemHeading><strong>Control Over Your Information</strong></ListGroupItemHeading></ListGroupItem>
          	<ListGroupItem>
				<ListGroupItemText>We want you to be in control of your information, so we provide you with the following tools:</ListGroupItemText>
				<ListGroup className="showBullets">
				<ListGroupItem>Access and Updates. We strive to let you access and update most of the personal information that we have about you. There are limits though to the requests we’ll accommodate. We may reject a request for a number of reasons, including, for example, that the request risks the privacy of other users, requires technical efforts that are disproportionate to the request, is repetitive, or is unlawful. You can access and update most of your basic account information right in the app by visiting the app’s Profile page. Because your privacy is important to us, we may ask you to verify your identity or provide additional information before we let you access or update your personal information. We will try to update and access your information for free, but if it would require a disproportionate effort on our part, we may charge a fee. We will of course disclose the fee before we comply with your request.</ListGroupItem>
				<ListGroupItem>Revoking Permissions. If you change your mind about our ongoing ability to collect information from certain sources that you have already consented to, such as your phonebook or location services, you can simply revoke your consent by changing the settings on your device if your device offers those options. Of course, if you do that, certain services may lose full functionality.</ListGroupItem>
				<ListGroupItem>Account Deletion. While we hope you’ll remain a lifelong Pulse user, if for some reason you ever want to delete your account, just email us at hi@getpulse.tv. </ListGroupItem>
				</ListGroup>
			</ListGroupItem>
          	<ListGroupItem>
          		<ListGroupItemHeading><strong>Users Outside the United States</strong></ListGroupItemHeading>
				<ListGroupItemText>Although we welcome Pulse users from all over the world, keep in mind that no matter where you live or where you happen to use our services, your information may be shared within the Pulse family of companies. This means that we may collect your personal information from, transfer it to, and store and process it in the United States and other countries outside of where you live.</ListGroupItemText>
			</ListGroupItem>
          	<ListGroupItem>
          		<ListGroupItemHeading><strong>Children</strong></ListGroupItemHeading>
				<ListGroupItemText>Our services are not intended for—and we don’t direct them to—anyone under 13. And that’s why we do not knowingly collect personal information from anyone under 13.</ListGroupItemText>
			</ListGroupItem>
			<ListGroupItem>
          		<ListGroupItemHeading><strong>Revisions to Privacy Policy</strong></ListGroupItemHeading>
				<ListGroupItemText>We may change this Privacy Policy from time to time. But when we do, we’ll let you know one way or another. Sometimes, we’ll let you know by revising the date at the top of the Privacy Policy that’s available on our website and mobile application. Other times, we may provide you with additional notice (such as adding a statement to our websites’ homepages or providing you with an in-app notification).</ListGroupItemText>
			</ListGroupItem>
      	</ListGroup>
  	</Container>
    )};
}