import React from 'react';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';
import Book from '../ViewBooks/book';
import DeleteModal from '../Modal/deleteBookModal';
import $ from 'jquery'; 

const checkBox = {
    width : '20px',
    textAlign : 'center'
}

class ViewBooks extends React.Component {

    constructor(props){
        super(props);
        console.log("Inside View Books");
        this.state = {
            books : [],
            booksAvailable : false,
            fields : {},
            selectedBooks : [],
            showModal : false,
            modalMessage : null
        };
        this.handleSelectedBooks = this.handleSelectedBooks.bind(this);
        this.delete = this.delete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.addBook = this.addBook.bind(this);
    }

    componentDidMount(){
        const fields = JSON.parse(localStorage.getItem("booksCustomViewData"));
        let fetchBooksUrl = 'http://localhost:3000/books/fetchBooks';
        $('.loading').show();
        axios.get(fetchBooksUrl).then((response) => {
            console.log("Books ",response.data);
            $('.loading').hide();
            for( let i = 0; i< response.data.length; i++){
                let date = response.data[i].publicationDate;
                let day = date.substring(8,10);
                let month = date.substring(5,7);
                let year = date.substring(0,4);
                //console.log("Day "+day+" Month "+month+ " Year ",year);
                response.data[i].publicationDate = day + "/" + month + "/" +year;
                console.log("Final Date ",response.data[i].publicationDate);
            }
            this.setState({
                booksAvailable : true,
                books : response.data,
                fields
            });
            localStorage.setItem("books", JSON.stringify(response.data));
        }).catch((error) => {
            console.log("Error occurred while fetching Books ",error.message);
            $('.loading').hide();
            localStorage.setItem("errorMessage", JSON.stringify(error.message));
            this.setState({
                booksAvailable : false,
                fields
            });
            this.props.history.push('/error');
        });
        let lastBookUrl = 'http://localhost:3000/books/fetchLastBook';
        axios.get(lastBookUrl).then((response) => {
            console.log("Last Book ",response.data);
            localStorage.setItem("lastBook", JSON.stringify(response.data));
        }).catch((error) => {
            console.log("Error occurred while fetching Last Book Details ",error.message);
        })
    }

    handleSelectedBooks(e) {
        console.log("Event", e);
        let selected = e.target.checked;
        let selectedBookId = e.target.value;
        let selectedBooks = this.state.selectedBooks;
        if(selected){
            this.setState({
                selectedBooks: [...selectedBooks, selectedBookId]
            }, ()=> {
                console.log("Selected Books ", selectedBookId, this.state.selectedBooks);
            });
        }
        else{
            let index = selectedBooks.indexOf(selectedBookId);
            if( index > -1){
                selectedBooks.splice(index, 1);
                this.setState({
                    selectedBooks
                }, ()=> {
                    console.log("Selected Books ", selectedBookId, this.state.selectedBooks);
                });
            }
        }
    }

    addBook(){
        this.props.history.push('/addBook');
    }

    delete(){
        this.setState({ 
            showModal: true,
            modalMessage : "Are you sure you want to Delete Selected Books?" 
        });
    }

    handleClose(show){
        console.log("Pop Up Status ",show);
        this.setState({ 
            showModal: show 
        });
    }

    deleteBook(id, title){
        let selectedBooks = [];
        selectedBooks.push(id.toString());
        console.log("Selected Book ",selectedBooks);
        this.setState({ 
            showModal: true,
            modalMessage : "Are you sure you want to Delete the Book " +title +" ?",
            selectedBooks 
        });
    }

    render(){
        return(
            <div>
                <div className="loading"></div>
                <div className="container">
                <center><h2>Book Basement</h2></center>
                    <table className="table" align="center">
                        <thead className="thead-light">
                        <tr>
                            <th style={checkBox}></th>
                            {this.state.fields["title"] && <th>Title</th>}
                            {this.state.fields["author"] && <th>Author</th>}
                            {this.state.fields["isbn"] && <th>ISBN</th>}
                            {this.state.fields["publicationDate"] && <th>Publication Date</th>}
                            {this.state.fields["publisher"] && <th>Publisher</th>}
                            {this.state.fields["price"] && <th>Price</th>}
                            {this.state.fields["genre"] && <th>Genre</th>}
                            {this.state.fields["format"] && <th>Format</th>}
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.books.map((book, index) => {
                                    return (<Book key={book.id} book={book} index={index} 
                                    handleSelectedBooks={this.handleSelectedBooks} 
                                    deleteBooks={this.deleteBooks}
                                    deleteBook={this.deleteBook}></Book>)
                                }) 
                            }
                            {
                                !this.state.booksAvailable && 
                                <tr>
                                    <td className="text-center" rowSpan="10">No Books Available</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    <center>
                        <button className="btn btn-xs btn-primary" onClick={this.addBook}>Add Book</button>&nbsp;&nbsp;
                        <button className="btn btn-xs btn-primary" onClick={this.delete}>Delete Books</button>
                    </center>
                </div>
                {
                    this.state.showModal &&
                    <DeleteModal show={this.state.showModal} modalMessage={this.state.modalMessage}
                    books={this.state.selectedBooks} handleClose={this.handleClose}></DeleteModal>
                }
            </div>
        )
    }

}

export default withRouter(ViewBooks);