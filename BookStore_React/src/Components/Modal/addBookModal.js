import React from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

class AddBookModal extends React.Component {

    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        let show = false;
        this.props.handleModalClose(show);
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default withRouter(AddBookModal);