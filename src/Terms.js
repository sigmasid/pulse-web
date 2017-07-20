import React from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Jumbotron, Container } from 'reactstrap';

export default class Terms extends React.Component {
  render() {
    return (
    	<Container className="terms">
		<Jumbotron className="Question-header text-center" color="white">
			<h1>Pulse Terms of Service</h1>
	    </Jumbotron>
      	<ListGroup>
	        <ListGroupItem>
	          	<ListGroupItemHeading><strong>0. Welcome</strong></ListGroupItemHeading>
	        </ListGroupItem>
          	<ListGroupItem>
				<ListGroupItemText>We’re thrilled you’ve decided to try Pulse and our other products and services, all of which we refer to simply as the “Services.”</ListGroupItemText>
				<ListGroupItemText>We’ve drafted these Terms of Service (which we call the “Terms”) so you’ll know the rules that govern our relationship with you. Although we have tried our best to strip the legalese from the Terms, there are places where these Terms may still read like a traditional contract. There’s a good reason for that: These Terms do indeed form a legally binding contract between you and Think Apart Corporation (also referred to as "Think Apart"). So please read them carefully.</ListGroupItemText>
				<ListGroupItemText>By using the Services, you agree to the Terms. Of course, if you don’t agree with them, then don’t use the Services.</ListGroupItemText>
				<ListGroupItemText>ARBITRATION NOTICE: THESE TERMS CONTAIN AN ARBITRATION CLAUSE A LITTLE LATER ON. EXCEPT FOR CERTAIN TYPES OF DISPUTES MENTIONED IN THAT ARBITRATION CLAUSE, YOU AND THINK APART CORP. AGREE THAT DISPUTES BETWEEN US WILL BE RESOLVED BY MANDATORY BINDING ARBITRATION, AND YOU AND THINK APART CORP. WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS-ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.</ListGroupItemText>
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>1. Who Can Use the Services</strong></ListGroupItemHeading>
				<ListGroupItemText>No one under 13 is allowed to create an account or use the Services. We may offer additional Services with additional terms that may require you to be even older to use them. So please read all terms carefully.</ListGroupItemText>
				<ListGroupItemText>By using the Services, you state that:</ListGroupItemText>
      			<ListGroup className="showBullets">
				<ListGroupItem>You can form a binding contract with Think Apart Corp.</ListGroupItem>
				<ListGroupItem>You are not a person who is barred from receiving the Services under the laws of the United States or any other applicable jurisdiction—meaning that you do not appear on the U.S. Treasury Department’s list of Specially Designated Nationals or face any other similar prohibition.</ListGroupItem>
				<ListGroupItem>You will comply with these Terms and all applicable local, state, national, and international laws, rules, and regulations.</ListGroupItem>
				<ListGroupItemText>If you are using the Services on behalf of a business or some other entity, you state that you are authorized to grant all licenses set forth in these Terms and to agree to these Terms on behalf of the business or entity.</ListGroupItemText>
	          	</ListGroup>
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>2. Rights We Grant You</strong></ListGroupItemHeading>
				<ListGroupItemText>Think Apart Corp. grants you a personal, worldwide, royalty-free, non-assignable, nonexclusive, revocable, and non-sublicensable license to access and use the Services. This license is for the sole purpose of letting you use and enjoy the Services’ benefits in a way that these Terms and our usage policies allow.</ListGroupItemText>
				<ListGroupItemText>Any software that we provide you may automatically download and install upgrades, updates, or other new features. You may be able to adjust these automatic downloads through your device’s settings.</ListGroupItemText>
				<ListGroupItemText>You may not copy, modify, distribute, sell, or lease any part of our Services, nor may you reverse engineer or attempt to extract the source code of that software, unless laws prohibit these restrictions or you have our written permission to do so.</ListGroupItemText>
	        </ListGroupItem>
	       	<ListGroupItem>
	          <ListGroupItemHeading><strong>3. Rights You Grant Us</strong></ListGroupItemHeading>
	          <ListGroupItemText>Our Services via the Pulse application or website let you create, upload, post, send, receive, and store content. When you do that, you retain whatever ownership rights in that content you had to begin with. But you grant us a license to use that content. For all our Services, you grant Think Apart Corp. and our affiliates a worldwide, royalty-free, sublicensable, and transferable license to host, store, use, display, reproduce, modify, adapt, edit, publish, and distribute that content. This license is for the limited purpose of operating, developing, providing, promoting, and improving the Services and researching and developing new ones.</ListGroupItemText>
			  <ListGroupItemText>Given the inherently public nature of the Services, the license you grant us for content submitted also grants us the perpetual license to create derivative works from, promote, exhibit, broadcast, syndicate, sublicense, publicly perform, and publicly display content submitted to our Services in any form and in any and all media or distribution methods (now known or later developed). To the extent it’s necessary, when you submit your content, you also grant Think Apart, our affiliates, and our business partners the unrestricted, worldwide, perpetual right and license to use your name, likeness, and voice. This means, among other things, that you will not be entitled to any compensation from Think Apart, our affiliates, or our business partners if your name, likeness, or voice is conveyed through our Services, either on the Pulse application or on one of our business partner’s platforms.</ListGroupItemText>
			  <ListGroupItemText>For information about how to tailor who can watch your content, please take a look at our Privacy Policy and Support Site.</ListGroupItemText>
			  <ListGroupItemText>While we’re not required to do so, we may access, review, screen, and delete your content at any time and for any reason, including if we think your content violates these Terms. You alone, though, remain responsible for the content you create, upload, post, send, or store through the Service.</ListGroupItemText>
			  <ListGroupItemText>We always love to hear from our users. But if you volunteer feedback or suggestions, just know that we can use your ideas without compensating you.</ListGroupItemText>
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>4. The Content of Others</strong></ListGroupItemHeading>
				<ListGroupItemText>Much of the content on our Services is produced by users, publishers, and other third parties. The content is the sole responsibility of the person or organization that submitted it. Although Think Apart Corp. reserves the right to review or remove all content that appears on the Services, we do not necessarily review all of it. So we cannot—and do not—take responsibility for any content that others provide through the Services.</ListGroupItemText>
				<ListGroupItemText>Through these Terms and our Community Guidelines, we make clear that we do not want the Services put to bad uses. But because we do not review all content, we cannot guarantee that content on the Services will always conform to our Terms or Guidelines.</ListGroupItemText>
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>5. Privacy</strong></ListGroupItemHeading>
	          <ListGroupItemText>
				Your privacy matters to us. You can learn how we handle your information when you use our Services by reading our Privacy Policy. We encourage you to give the Privacy Policy a careful look because, by using our Services, you agree that Think Apart can collect, use, and share your information consistent with that policy.
	          </ListGroupItemText>
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>6. Respecting Other People's Right</strong></ListGroupItemHeading>
	          <ListGroupItemText>Think Apart respects the rights of others. And so should you. You therefore may not use the Services in a manner that:</ListGroupItemText>
				<ListGroup className="showBullets">
				<ListGroupItem>violates or infringes someone else’s rights of publicity, privacy, copyright, trademark, or other intellectual-property right.</ListGroupItem>
				<ListGroupItem>bullies, harasses, or intimidates.</ListGroupItem>
				<ListGroupItem>defames.</ListGroupItem>
				<ListGroupItem>spams or solicits our users.</ListGroupItem>
				</ListGroup>
				<ListGroupItemText>You must also respect Think Apart’s rights. These Terms do not grant you any right to:</ListGroupItemText>
				<ListGroup className="showBullets">
				<ListGroupItem>use branding, logos, designs, photographs, videos, or any other materials used in our Services.</ListGroupItem>
				<ListGroupItem>copy, archive, download, upload, distribute, syndicate, broadcast, perform, display, make available, or otherwise use any portion of the Services or the content on the Services except as set forth in these Terms.</ListGroupItem>
				<ListGroupItem>use the Services, any tools provided by the Services, or any content on the Services for any commercial purposes without our consent.</ListGroupItem>
				<ListGroupItemText>In short: You may not use the Services or the content on the Services in ways that are not authorized by these Terms. Nor may you help anyone else in doing so.</ListGroupItemText>
	          </ListGroup>
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>7. Respecting Copyright</strong></ListGroupItemHeading>
	          <ListGroupItemText>Think Apart honors the requirements set forth in the Digital Millennium Copyright Act. We therefore take reasonable steps to expeditiously remove from our Services any infringing material that we become aware of. And if Think Apart becomes aware that one of its users has repeatedly infringed copyrights, we will take reasonable steps within our power to terminate the user’s account.</ListGroupItemText>
			  <ListGroupItemText>We make it easy for you to report suspected copyright infringement. If you believe that anything on the Services infringes a copyright that you own or control, please email us at hi@checkpulse.co.</ListGroupItemText>
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>8. Safety</strong></ListGroupItemHeading>
	          <ListGroupItemText>We try hard to keep our Services a safe place for all users. But we can’t guarantee it. That’s where you come in. By using the Services, you agree that:</ListGroupItemText>
				<ListGroup className="showBullets">
				<ListGroupItem>You will not use the Services for any purpose that is illegal or prohibited in these Terms.</ListGroupItem>
				<ListGroupItem>You will not use any robot, spider, crawler, scraper, or other automated means or interface to access the Services or extract other user’s information.</ListGroupItem>
				<ListGroupItem>You will not use or develop any third-party applications that interact with the Services or other users’ content or information without our written consent.</ListGroupItem>
				<ListGroupItem>You will not use the Services in a way that could interfere with, disrupt, negatively affect, or inhibit other users from fully enjoying the Services, or that could damage, disable, overburden, or impair the functioning of the Services.</ListGroupItem>
				<ListGroupItem>You will not use or attempt to use another user’s account, username, or password without their permission.</ListGroupItem>
				<ListGroupItem>You will not solicit login credentials from another user.</ListGroupItem>
				<ListGroupItem>You will not post content that contains pornography, graphic violence, threats, hate speech, or incitements to violence.</ListGroupItem>
				<ListGroupItem>You will not upload viruses or other malicious code or otherwise compromise the security of the Services.</ListGroupItem>
				<ListGroupItem>You will not attempt to circumvent any content-filtering techniques we employ, or attempt to access areas or features of the Services that you are not authorized to access.</ListGroupItem>
				<ListGroupItem>You will not probe, scan, or test the vulnerability of our Services or any system or network.</ListGroupItem>
				<ListGroupItem>You will not encourage or promote any activity that violates these Terms.</ListGroupItem>
				</ListGroup>	 
				<ListGroupItemText>We also care about your safety while using our Services. So do not use our Services in a way that would distract you from obeying traffic or safety laws. For example, never Pulse and drive. And never put yourself or others in harm’s way just to capture a Pulse.</ListGroupItemText>         
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>9. Your Account</strong></ListGroupItemHeading>
	          <ListGroupItemText>You are responsible for any activity that occurs in your Pulse account. So it’s important that you keep your account secure. One way to do that is to select a strong password that you don’t use for any other account.</ListGroupItemText>
				<ListGroupItemText>By using the Services, you agree that, in addition to exercising common sense:</ListGroupItemText>
				<ListGroup className="showBullets">
					<ListGroupItem>You will not create more than one account for yourself.</ListGroupItem>
					<ListGroupItem>You will not create another account if we have already disabled your account, unless you have our written permission to do so.</ListGroupItem>
					<ListGroupItem>You will not buy, sell, rent, or lease access to your Pulse account, username, or a friend link without our written permission.</ListGroupItem>
					<ListGroupItem>You will not share your password.</ListGroupItem>
					<ListGroupItem>You will not log in or attempt to access the Services through unauthorized third-party applications or clients.</ListGroupItem>
					<ListGroupItem>If you think that someone has gained access to your account, please immediately reach out to hi@checkpulse.co.</ListGroupItem>
	          </ListGroup>
	        </ListGroupItem>	
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>10. Data Charges and Mobile Phones</strong></ListGroupItemHeading>
	          <ListGroupItemText>You are responsible for any mobile charges that you may incur for using our Services, including text-messaging and data charges. If you’re unsure what those charges may be, you should ask your service provider before using the Services.</ListGroupItemText>
			  <ListGroupItemText>If you change or deactivate the mobile phone number that you used to create a Pulse account, you must update your account information through Settings within 72 hours to prevent us from sending to someone else messages intended for you.</ListGroupItemText>
	        </ListGroupItem>	
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>11. Third-Party Services</strong></ListGroupItemHeading>
	          <ListGroupItemText>
				If you use a service, feature, or functionality that is operated by a third party and made available through our Services (including Services we jointly offer with the third party), each party’s terms will govern the respective party’s relationship with you. Think Apart is not responsible or liable for a third party’s terms or actions taken under the third party’s terms.
	          </ListGroupItemText>
	        </ListGroupItem>	
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>12. Modifying the Services and Termination</strong></ListGroupItemHeading>
	          <ListGroupItemText>We’re relentlessly improving our Services and creating new ones all the time. That means we may add or remove features, products, or functionalities, and we may also suspend or stop the Services altogether. We may take any of these actions at any time, and when we do, we may not provide you with any notice beforehand.</ListGroupItemText>
				<ListGroupItemText>While we hope you remain a lifelong Pulse user, you can terminate these Terms at any time and for any reason by deleting your account.</ListGroupItemText>
				<ListGroupItemText>Think Apart may also terminate these Terms with you at any time, for any reason, and without advanced notice. That means that we may stop providing you with any Services, or impose new or additional limits on your ability to use our Services. For example, we may deactivate your account due to prolonged inactivity, and we may reclaim your username at any time for any reason.</ListGroupItemText>
				<ListGroupItemText>Regardless of who terminates these Terms, both you and Think Apart continue to be bound by Sections 3, 6, 9, 10, and 13-22 of the Terms.</ListGroupItemText>
	        </ListGroupItem>		
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>13. Indemnity</strong></ListGroupItemHeading>
	          <ListGroupItemText>
				You agree, to the extent permitted by law, to indemnify, defend, and hold harmless Think Apart, our affiliates, directors, officers, stockholders, employees, licensors, and agents from and against any and all complaints, charges, claims, damages, losses, costs, liabilities, and expenses (including attorneys’ fees) due to, arising out of, or relating in any way to: (a) your access to or use of the Services; (b) your content; and (c) your breach of these Terms.
	          </ListGroupItemText>
	        </ListGroupItem>      
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>14. Disclaimers</strong></ListGroupItemHeading>
	          <ListGroupItemText>We try to keep the Services up and running and free of annoyances. But we make no promises that we will succeed.</ListGroupItemText>
			  <ListGroupItemText>THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE” AND TO THE EXTENT PERMITTED BY LAW WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. IN ADDITION, WHILE THINK APART CORPORATION ATTEMPTS TO PROVIDE A GOOD USER EXPERIENCE, WE DO NOT REPRESENT OR WARRANT THAT: (A) THE SERVICES WILL ALWAYS BE SECURE, ERROR-FREE, OR TIMELY; (B) THE SERVICES WILL ALWAYS FUNCTION WITHOUT DELAYS, DISRUPTIONS, OR IMPERFECTIONS; OR (C) THAT ANY CONTENT, USER CONTENT, OR INFORMATION YOU OBTAIN ON OR THROUGH THE SERVICES WILL BE TIMELY OR ACCURATE.</ListGroupItemText>
			  <ListGroupItemText>THINK APART CORPORATION TAKES NO RESPONSIBILITY AND ASSUMES NO LIABILITY FOR ANY CONTENT THAT YOU, ANOTHER USER, OR A THIRD PARTY CREATES, UPLOADS, POSTS, SENDS, RECEIVES, OR STORES ON OR THROUGH OUR SERVICES. YOU UNDERSTAND AND AGREE THAT YOU MAY BE EXPOSED TO CONTENT THAT MIGHT BE OFFENSIVE, ILLEGAL, MISLEADING, OR OTHERWISE INAPPROPRIATE, NONE OF WHICH THINK APART CORPORATION WILL BE RESPONSIBLE FOR.</ListGroupItemText>
	        </ListGroupItem>  	
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>15. Limitation of Liability</strong></ListGroupItemHeading>
	          <ListGroupItemText>
			TO THE MAXIMUM EXTENT PERMITTED BY LAW, THINK APART CORPORATION AND OUR MANAGING MEMBERS, SHAREHOLDERS, EMPLOYEES, AFFILIATES, LICENSORS, AND SUPPLIERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR MULTIPLE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (B) THE CONDUCT OR CONTENT OF OTHER USERS OR THIRD PARTIES ON OR THROUGH THE SERVICES; OR (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR CONTENT, EVEN IF THINK APART CORPORATION HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT WILL THINK APART’S AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES EXCEED THE GREATER OF $100 USD OR THE AMOUNT YOU PAID THINK APART, IF ANY, IN THE LAST 12 MONTHS.
	          </ListGroupItemText>
	        </ListGroupItem>  	
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>16. Arbitration, Class-Action Waiver, and Jury Waiver</strong></ListGroupItemHeading>
	          <ListGroupItemText>
	          Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
	          </ListGroupItemText>
	        </ListGroupItem>
		        <ListGroupItem>
	          <ListGroupItemHeading><strong>17. Exclusive Venue</strong></ListGroupItemHeading>
	          <ListGroupItemText>
				To the extent that these Terms allow you or Think Apart to initiate litigation in a court, both you and Think Apart agree that all claims and disputes (whether contract, tort, or otherwise), including statutory claims and disputes, arising out of or relating to the Terms or the use of the Services will be litigated exclusively in the United States District Court for the Central District of California. If, however, that court would lack original jurisdiction over the litigation, then all such claims and disputes will be litigated exclusively in the Superior Court of California, County of San Francisco. You and Think Apart consent to the personal jurisdiction of both courts.
	          </ListGroupItemText>
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>18. Choice of Law</strong></ListGroupItemHeading>
	          <ListGroupItemText>
				Except to the extent they are preempted by U.S. federal law, the laws of California, other than its conflict-of-laws principles, govern these Terms and any claims and disputes (whether contract, tort, or otherwise) arising out of or relating to these Terms or their subject matter.
	          </ListGroupItemText>
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>19. Severability</strong></ListGroupItemHeading>
	          <ListGroupItemText>
				If any provision of these Terms is found unenforceable, then that provision will be severed from these Terms and not affect the validity and enforceability of any remaining provisions.
	          </ListGroupItemText>
	        </ListGroupItem>	
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>20. Additional Terms of Specific Services</strong></ListGroupItemHeading>
	          <ListGroupItemText>
				Given the breadth of our Services, we sometimes need to craft additional terms and conditions for specific Services. Those additional terms and conditions, which will be available with the relevant Services, then become part of your agreement with us if you use those Services. If any part of those additional terms and conditions conflicts with these Terms, the additional terms and conditions will prevail.
	          </ListGroupItemText>
	        </ListGroupItem>	
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>21. Final Terms</strong></ListGroupItemHeading>
	          	<ListGroup className="showBullets">
	          		<ListGroupItem>These Terms (together with any additional terms applicable to specific Services you use) make up the entire agreement between you and Think Apart, and supersede any prior agreements.</ListGroupItem>
	          		<ListGroupItem>These Terms do not create or confer any third-party beneficiary rights.</ListGroupItem>
	          		<ListGroupItem>If we do not enforce a provision in these Terms, it will not be considered a waiver.</ListGroupItem>
	          		<ListGroupItem>We reserve all rights not expressly granted to you.</ListGroupItem>
	          		<ListGroupItem>You may not transfer any of your rights or obligations under these Terms without our consent.</ListGroupItem>
	          	</ListGroup>
	        </ListGroupItem>
	        <ListGroupItem>
	          <ListGroupItemHeading><strong>> Contact Us</strong></ListGroupItemHeading>
	          <ListGroupItemText>
				Think Apart welcomes comments, questions, concerns, or suggestions. Please send us feedback by emailing hi@checkpulse.co.
	          </ListGroupItemText>
	        </ListGroupItem>	        	        	                	                     	        	                	        	               	        
      </ListGroup>
      </Container>
    )};
}