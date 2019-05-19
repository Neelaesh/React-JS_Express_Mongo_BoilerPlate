import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class DeleteModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            books : []
          };
        this.handleClose = this.handleClose.bind(this);
        this.deleteBooks = this.deleteBooks.bind(this);
    }

    componentDidMount(){
        this.setState({
            books : this.props.books
        });
    }

    handleClose() {
        let show = false;
        this.props.handleClose(show);
    }

    deleteBooks(){
        let deleteBooksUrl = 'http://localhost:3000/books/deleteBook';
        axios.post(deleteBooksUrl, this.state.books).then((response) => {
            console.log("Response ",response);
            this.props.history.push('/about');
        }).catch((error) => {
            console.log("Error while Deleting Books ",error);
        });
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={this.deleteBooks}>
                    Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

}

export default withRouter(DeleteModal);