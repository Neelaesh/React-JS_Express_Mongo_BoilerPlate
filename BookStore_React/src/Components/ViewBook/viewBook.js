import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

const textAlignCenter = {
    textAlign : 'center'
};

const textAlignLeft = {
    textAlign : 'left'
};

const crimsonColor = {
    color: 'crimson'
}

class ViewBook extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title : null,
            author : null,
            isbn : null,
            publicationDate : null,
            publisher : null,
            price : null,
            genre : null,
            format : null
        }
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount(){
        console.log("ID ",this.props.match.params.id);
        let fetchBookUrl = 'http://localhost:3000/books/viewBook/' + this.props.match.params.id;
        $('.loading').show();
        axios.get(fetchBookUrl).then((response) => {
            console.log("Book Details ",response.data);
            $('.loading').hide();
            let date = response.data.publicationDate;
            let day = date.substring(8,10);
            let month = date.substring(5,7);
            let year = date.substring(0,4);
            response.data.publicationDate = day + "/" + month + "/" +year;
            console.log("Final Date ",response.data.publicationDate);
            this.setState({
                title : response.data.title,
                author : response.data.author,
                isbn : response.data.isbn,
                publicationDate : response.data.publicationDate,
                publisher : response.data.publisher,
                price : response.data.price,
                genre : response.data.genre,
                format : response.data.format
            });
        }).catch((error) => {
            console.log("Error while fetching Book Details ",error);
            $('.loading').hide();
        });
        
    }

    goBack(){
        this.props.history.push('/');
    }

    render(){
        return(
            <div className="container" style={textAlignCenter}>
                <div className="loading"></div>
                <h1 style={crimsonColor}>Book Details</h1>
                    <div className='panel panel-primary'>
                        <div className='panel-body'>
                            <table border="0" align="center">
                                <tbody>
                                <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label>Title:</label>&nbsp;{this.state.title}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label>Author:</label>&nbsp;{this.state.author}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label>ISBN:</label>&nbsp;{this.state.isbn}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label>Publication Date:</label>&nbsp;{this.state.publicationDate}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label>Publisher:</label>&nbsp;{this.state.publisher}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label>Price:</label>&nbsp;{this.state.price}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label>Genre:</label>&nbsp;{this.state.genre}
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className="form-group" style={textAlignLeft}>
                                        <label>Format:</label>&nbsp;{this.state.format}
                                    </div>
                                </td>
                                </tr>
                                </tbody>
                            </table>
                            <div style={textAlignCenter}>
                                <div className="form-group">
                                    <button type="button" className="btn btn-xs btn-primary" 
                                    onClick={this.goBack}>Back</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }

}

export default withRouter(ViewBook)