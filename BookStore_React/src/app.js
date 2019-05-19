import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './Components/NavBar/navBar';
import Footer from './Components/Footer/footer';
import ViewBooks from './Components/ViewBooks/viewBooks';
import ViewBook from './Components/ViewBook/viewBook';
import About from './Components/About/about';
import CustomizedView from './Components/CustomizedView/customizedView';
import AddBook from './Components/AddBook/addBook';
import UpdateBook from './Components/UpdateBook/updateBook';
import Error from './Components/Error/error';

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            booksAvailable : null,
            books : []
        }
    }

    componentDidMount(){
        let fetchFormatsUrl = 'http://localhost:3000/books/fetchFormats';
        axios.get(fetchFormatsUrl).then((response) => {
            console.log("Formats ",response.data);
            localStorage.setItem('formats', JSON.stringify(response.data));
        }).catch((error) => {
            console.log("Error while fetching Formats ",error.message);
            localStorage.setItem("errorMessage", JSON.stringify(error.message));
        });

        let fetchGenresUrl = 'http://localhost:3000/books/fetchGenres';
        axios.get(fetchGenresUrl).then((response) => {
            console.log("Genres ",response.data);
            localStorage.setItem('genres', JSON.stringify(response.data));
        }).catch((error) =>{
            console.log("Error while fetching Genres ",error.message);
            localStorage.setItem("errorMessage", JSON.stringify(error.message));
        });

        let booksCustomViewData = {
            id  : true,
            title : true,
            author : true,
            isbn : true,
            publicationDate : true,
            publisher : true,
            price : true,
            genre : true,
            format : true
        };
        localStorage.setItem("booksCustomViewData", JSON.stringify(booksCustomViewData));
    }

    render(){
        return(
            <Router>
                <div>
                    <NavBar></NavBar>
                    {/* {   this.state.booksAvailable &&
                    <ViewBooks books={this.state.books}></ViewBooks> 
                    }
                    <center><h2>
                    {
                        !this.state.booksAvailable && "Books Not Available"
                    }
                    </h2></center> */}
                    <Footer></Footer>
                    <Switch>
                        <Route exact path="/" component={ViewBooks} />
                        <Route path="/addBook" component={AddBook} />
                        <Route path="/book/:id" component={ViewBook} />
                        <Route path="/updateBook/:id" component={UpdateBook} />
                        <Route path="/about" component={About} />
                        <Route path="/customizedView" component={CustomizedView} />
                        <Route path="/error" component={Error} />
                    </Switch>
                </div>
            </Router>
        );
    }
}