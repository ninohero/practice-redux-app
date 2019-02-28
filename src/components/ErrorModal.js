import _ from 'lodash';
import React from 'react';
import { Modal } from 'react-bootstrap';

class ErrorModal extends React.Component {
  constructor(props) {
    super();
    this.handleCloseModal   = this.handleCloseModal.bind(this);

    this.state = {};
  }

  handleCloseModal() {
    this.props.handleCloseModal();
  }

  render() {
    return (
      <Modal show={this.props.errorMessage} onHide={this.handleCloseModal} className="modal-for-errors" bsSize="large">
        <Modal.Title>
          <button onClick={this.handleCloseModal} className="modal-close">
            <span className="fa fa-close"></span>
          </button>
        </Modal.Title>
        <Modal.Body>
          <h3>{this.props.errorMessage}</h3>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.handleCloseModal}
            className="btn btn-default button-cancel" type="button">Close</button>
        </Modal.Footer>
        <div className="clearfix" />
      </Modal>
    );
  }
}

export default ErrorModal;
