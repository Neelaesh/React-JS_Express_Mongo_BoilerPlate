import React from 'react';
import { withRouter } from 'react-router-dom';

const textAlignCenter = {
    textAlign : 'center'
};

const textAlignLeft = {
    textAlign : 'left'
};

const darkgrayColor = {
    color : 'darkgray',
    textAlign : 'center'
}

class CustomizedView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fields : {
                title : false,
                author : false,
                isbn : false,
                publicationDate : false,
                publisher : false,
                price : false,
                genre : false,
                format : false,
            } 
        };
        //this.handleChecked =this.handleChecked.bind(this);
    }

    componentDidMount(){
        const booksCustomViewData = JSON.parse(localStorage.getItem("booksCustomViewData"));
        console.log("booksCustomViewData ",booksCustomViewData);
        this.setState({
            fields : {
                    title : booksCustomViewData.title,
                    author : booksCustomViewData.author,
                    isbn : booksCustomViewData.isbn,
                    publicationDate : booksCustomViewData.publicationDate,
                    publisher : booksCustomViewData.publisher,
                    price : booksCustomViewData.price,
                    genre : booksCustomViewData.genre,
                    format : booksCustomViewData.format,
            }
        });
        
    }

    goBack(){
        console.log("State ",this.state);
        this.props.history.push('/');
    }

    handleChecked(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.checked;
        this.setState({
            fields
        });
    }

    submit(e){
        e.preventDefault();
        console.log("View ",this.state.fields);
        localStorage.setItem("booksCustomViewData", JSON.stringify(this.state.fields));
        this.props.history.push('/');
    }

    render(){
        return(
            <div className="container" style={textAlignCenter}>
                <h3 style={darkgrayColor}>Book Basement Custom View</h3>
                <div className='panel panel-primary'>
                    <div className='panel-body'>
                        <form name="customViewForm" onSubmit={this.submit.bind(this)}>
                        <table border="0" align="center">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label htmlFor="title">Title:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <input type="checkbox" id="title" name="title"
                                        checked={this.state.fields["title"]} 
                                        onChange={this.handleChecked.bind(this, "title")}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label htmlFor="author">Author:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="checkbox" id="author" name="author" 
                                        checked={this.state.fields["author"]} 
                                        onChange={this.handleChecked.bind(this, "author")}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label htmlFor="isbn">ISBN:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="checkbox" id="isbn" name="isbn" 
                                        checked={this.state.fields["isbn"]} 
                                        onChange={this.handleChecked.bind(this, "isbn")}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label htmlFor="publicationDate">Publication Date:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="checkbox" id="publicationDate" 
                                        name="publicationDate" 
                                        checked={this.state.fields["publicationDate"]} 
                                        onChange={this.handleChecked.bind(this, "publicationDate")}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label htmlFor="publisher">Publisher:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="checkbox" id="publisher" name="publisher" 
                                        checked={this.state.fields["publisher"]} 
                                        onChange={this.handleChecked.bind(this, "publisher")}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label htmlFor="price">Price:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="checkbox" id="price" name="price" 
                                        checked={this.state.fields["price"]} 
                                        onChange={this.handleChecked.bind(this, "price")}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label htmlFor="genre">Genre:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="checkbox" id="genre" name="genre" 
                                        checked={this.state.fields["genre"]} 
                                        onChange={this.handleChecked.bind(this, "genre")}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label htmlFor="format">Format:</label>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <input type="checkbox" id="format" name="format" 
                                        checked={this.state.fields["format"]} 
                                        onChange={this.handleChecked.bind(this, "format")}/>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                        <div style={textAlignCenter}>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Submit</button>&nbsp;&nbsp;
                                <button type="button" className="btn btn-info" onClick={this.goBack.bind(this)}>Back</button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(CustomizedView);