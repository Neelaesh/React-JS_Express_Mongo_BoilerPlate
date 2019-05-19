import React from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {

    constructor(props){
        super(props);
        console.log("Nav Bar");
    }

    render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-center">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link font-weight-bolder"  
                        to="/about">About Book Basement</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact className="nav-link font-weight-bolder" 
                        to="/">Books Stock Section</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link font-weight-bolder" 
                        to="/customizedView">Customized View</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}