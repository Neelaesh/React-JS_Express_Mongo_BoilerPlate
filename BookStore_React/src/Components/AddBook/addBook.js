import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import AddBookModal from '../Modal/addBookModal';

const textAlignCenter = {
    textAlign : 'center'
};

const crimsonColor = {
    color : 'crimson',
    textAlign : 'center'
}

const requiredColor = {
    color : 'red'
}

class AddBook extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            formats : [],
            genres : [],
            fields : {},
            errors : {},
            showModal : false,
            modalMessage : null
        }
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    componentDidMount(){
        const formats = localStorage.getItem('formats');
        console.log("formats ",JSON.parse(formats));
        const genres = localStorage.getItem('genres');
        console.log("genres ",JSON.parse(genres));
        this.setState({
            formats : JSON.parse(formats),
            genres : JSON.parse(genres)
        });
    }

    handleModalClose(show){
        this.setState({
            showModal : show
        });
    }

    goBack(){
        this.props.history.push('/');
    }

    submit(e){
        e.preventDefault();
        console.log("Title ",document.forms['bookForm'].elements['booktitle'].value);
        console.log("Fields ",this.state.fields);
        
        if(this.handleValidation()){
            let saveBookUrl = 'http://localhost:3000/books/saveBook';
            let lastBook = JSON.parse(localStorage.getItem("lastBook"));
            console.log("Last Book ",lastBook.id);
            let fields = this.state.fields;
            fields.id = (Number(lastBook.id) + 1).toString();
            this.setState({
                fields,
                showModal : true,
                modalMessage : "Book Added Successfully"
            });
            console.log("Fields ",this.state.fields);
            axios.post(saveBookUrl, this.state.fields).then((response) => {
                this.props.history.push('/');
            }).catch((error)=>{
                console.log("Error while saving Book ",error);
            })
        }
        else{
            this.setState({
                showModal : true,
                modalMessage : "Form has Errors"
            });
        }
    }

    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({
            fields
        });
        console.log("State ",this.state.fields);
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        // Title
        if(!fields["title"]){
            formIsValid = false;
            errors["title"] = "Title cannot be empty";
        }

        if(typeof fields["title"] !== "undefined"){
            if(!fields["title"].match(/^[a-zA-Z ]+$/)){
                formIsValid = false;
                errors["title"] = "Title should be letters";
            }
        }

        // Author
        if(!fields["author"]){
            formIsValid = false;
            errors["author"] = "Author cannot be empty";
        }

        if(typeof fields["author"] !== "undefined"){
            if(!fields.author.match(/^[a-zA-Z ]+$/)){
                formIsValid = false;
                errors.author = "Author should be letters";
            }
        }

        //ISBN
        if(!fields["isbn"]){
            formIsValid = false;
            errors["isbn"] = "ISBN cannot be empty";
        }

        if(typeof fields["isbn"] !== "undefined"){
            if(!fields["isbn"].match(/^[0-9]+$/)){
                formIsValid = false;
                errors["isbn"] = "ISBN should be numbers";
            }
        }

        // Publisher
        if(!fields["publisher"]){
            formIsValid = false;
            errors["publisher"] = "Publisher cannot be empty";
        }

        if(typeof fields["publisher"] !== "undefined"){
            if(!fields["publisher"].match(/^[a-zA-Z ]+$/)){
                formIsValid = false;
                errors["publisher"] = "Publisher should be letters";
            }
        }

        // Price
        if(!fields["price"]){
            formIsValid = false;
            errors["price"] = "Price cannot be empty";
        }

        if(typeof fields["price"] !== "undefined"){
            if(!fields["price"].match(/^[0-9]+$/)){
                formIsValid = false;
                errors["price"] = "Price should be numbers";
            }
        }

        // Genre
        if(!fields["genre"]){
            formIsValid = false;
            errors["genre"] = "Genre cannot be empty"
        }

        // Format
        if(!fields["format"]){
            formIsValid = false;
            errors["format"] = "Format cannot be empty";
        }

        this.setState({
            errors
        })
        return formIsValid;
    }

    render(){
        return(
            <div className="container">
                <h3 style={crimsonColor}>Add New Book</h3>
                <div className='panel panel-primary'>
                    <div className='panel-body'>
                        <form name="bookForm" onSubmit={this.submit.bind(this)}>
                            <table border="0" align="center">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <label htmlFor="booktitle">Title</label>
                                            <input type="text" className="form-control" id="booktitle" 
                                            name="title" minLength="3" 
                                            onChange={this.handleChange.bind(this,"title")}
                                            required />
                                            <span style={requiredColor}>{this.state.errors["title"]}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <label htmlFor="bookauthor">Author</label>
                                            <input type="text" className="form-control" id="bookauthor" 
                                            name="author" minLength="3" 
                                            onChange={this.handleChange.bind(this, "author")}
                                            required />
                                            <span style={requiredColor}>{this.state.errors["author"]}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <label htmlFor="bookisbn">ISBN</label>
                                            <input type="text" className="form-control" id="bookisbn" 
                                            name="isbn" minLength="13" maxLength="13" 
                                            onChange={this.handleChange.bind(this, "isbn")}
                                            required />
                                            <span style={requiredColor}>{this.state.errors["isbn"]}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <label htmlFor="bookpublicationDate">Publication Date</label>
                                            <input type="date" className="form-control" 
                                            id="bookpublicationDate" name="publicationDate" 
                                            minLength="10" maxLength="10" 
                                            onChange={this.handleChange.bind(this, "publicationDate")}
                                            required /> 
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <label htmlFor="bookpublisher">Publisher</label>
                                            <input type="text" className="form-control" 
                                            id="bookpublisher" name="publisher" minLength="3" 
                                            onChange={this.handleChange.bind(this, "publisher")}
                                            required />
                                            <span style={requiredColor}>{this.state.errors["publisher"]}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <label htmlFor="bookprice">Price</label>
                                            <input type="text" className="form-control" id="bookprice" 
                                            name="price" minLength="2" maxLength="4" 
                                            onChange={this.handleChange.bind(this, "price")}
                                            required />
                                            <span style={requiredColor}>{this.state.errors["price"]}</span> 
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <label htmlFor="bookgenre">Genre</label>
                                            <select className="form-control" id="bookgenre" 
                                            name="genre" onChange={this.handleChange.bind(this, "genre")} 
                                            required>
                                                {
                                                    this.state.genres.map((key, index) => {
                                                        return(<option key={index} value={key.genre}>{key.genre}</option>)
                                                    })
                                                }
                                            </select>
                                            <span style={requiredColor}>{this.state.errors["genre"]}</span> 
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <label htmlFor="bookformat">Format</label>
                                            <select className="form-control" id="bookformat" 
                                            name="format" onChange={this.handleChange.bind(this, "format")}
                                            required >
                                                {
                                                    this.state.formats.map((key, index) => {
                                                        return(<option key={index} value={key.format}>{key.format}</option>)
                                                    })
                                                }
                                            </select>
                                            <span style={requiredColor}>{this.state.errors["format"]}</span> 
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                            <div style={textAlignCenter}>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" 
                                    >Add Book</button>&nbsp;&nbsp;
                                    <button type="button" className="btn btn-info" 
                                    onClick={this.goBack.bind(this)}>Back</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {
                    this.state.showModal && 
                    <AddBookModal show={this.state.showModal} modalMessage={this.state.modalMessage}
                    handleModalClose={this.handleModalClose}></AddBookModal>
                }
            </div>
        );
    }

}

export default withRouter(AddBook);