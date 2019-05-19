import React from 'react';

const darkgrayColor = {
    color : 'darkgray',
    textAlign : 'center'
}

export default class Error extends React.Component {

    constructor(){
        super();
        this.state = {
            errorMessage : null
        }
    }

    componentDidMount(){
        let errorMessage = localStorage.getItem("errorMessage");
        this.setState({
            errorMessage
        });
        console.log(typeof errorMessage);
    }

    render(){
        return(
            <div className="container">
            <h3 style={darkgrayColor}>Error Book Basement</h3>
            <div className='panel panel-primary'>
                <div className='panel-body'>
                    <table border="0" align="center">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label><h4>{this.state.errorMessage}</h4></label><br/>
                                        <p>Please Contact Administrator!!!!</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        )
    }

}