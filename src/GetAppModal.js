import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
              Discover & subscribe to channels, enjoy exclusive content or join the experience as a contributor! 
              </small>
            </ModalBody>
            <ModalFooter>
              <a href="https://itunes.apple.com/us/app/pulse-channels-content-for-professionals/id1200702658?ls=1&mt=8" className="Get-app-btn btn btn-primary text-white block">get app</a>
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