import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Book extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fields : [],
            books : [],
            selectedBooks : [],
            id:[]
        }
        this.selectedBook = this.selectedBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    componentDidMount(){
        //console.log("Book ",this.props.book);
        const fields = JSON.parse(localStorage.getItem("booksCustomViewData"));
        const books = JSON.parse(localStorage.getItem("books"));
        this.setState({
            fields,
            books,
            booksAvailable : true
        });
    }

    deleteBook(id, title) {
        this.props.deleteBook(id, title);
    }

    selectedBook(e){
        this.props.handleSelectedBooks(e);
    }

    render(){
        return(
            <tr>
                <td align='center'><input type="checkbox" value={this.props.book.id} 
                onChange={this.selectedBook}/></td>
                {this.state.fields["title"] && <td><NavLink activeClassName="active" 
                to={`/book/${this.props.book.id}`}>{this.props.book.title}</NavLink></td>}
                {this.state.fields["author"] && <td>{this.props.book.author}</td>}
                {this.state.fields["isbn"] && <td>{this.props.book.isbn}</td>}
                {this.state.fields["publicationDate"] && <td>{this.props.book.publicationDate}</td>}
                {this.state.fields["publisher"] && <td>{this.props.book.publisher}</td>}
                {this.state.fields["price"] && <td>{this.props.book.price}</td>}
                {this.state.fields["genre"] && <td>{this.props.book.genre}</td>}
                {this.state.fields["format"] && <td>{this.props.book.format}</td>}
                <td><NavLink className="btn btn-xs btn-primary" to={`/updateBook/${this.props.book.id}`}>Edit</NavLink></td>
                <td><button className="btn btn-xs btn-danger" onClick={ () => this.deleteBook(this.props.book.id, 
                this.props.book.title)}>Delete</button></td>
            </tr>
        );
    }

}