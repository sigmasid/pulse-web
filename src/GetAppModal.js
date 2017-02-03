import React from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

var GetAppModal = React.createClass({
    componentWillMount: function() {
      	this.setState({
        	modal: this.props.modal
      	})
  	},

    toggle: function() {
    	this.props.onClose(!this.state.modal);

    	this.setState({
      		modal: !this.state.modal
    	});
  	},

    render: function() {
    return (
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="Get-app-modal modal-sm">
          	<ModalHeader toggle={this.toggle}>
          		Get Pulse App
          	</ModalHeader>
          	<ModalBody>
          		<small className="text-muted">
          		App allows you to discover & join new channels, become an expert, ask questions and add your voice to the discussion! 
          		</small>
          	</ModalBody>
          	<ModalFooter>
          		<Button className="btn-block btn-sm" color="primary">Get App</Button>
          	</ModalFooter>
        </Modal>
    );
  }
});

export default GetAppModal

GetAppModal.propTypes = {
  modal: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired
};