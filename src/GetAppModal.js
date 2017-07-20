import React from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
var createReactClass = require('create-react-class');

var GetAppModal = createReactClass({
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
              <span className="font-weight-bold">Download Pulse App for iOS</span>
            </ModalHeader>
            <ModalBody>
              <small className="text-muted">
              App allows you to discover & join new channels, become a contributor, and be part of the experience! 
              </small>
            </ModalBody>
            <ModalFooter>
              <Button className="btn-block btn-sm font-weight-bold" color="primary">get app</Button>
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