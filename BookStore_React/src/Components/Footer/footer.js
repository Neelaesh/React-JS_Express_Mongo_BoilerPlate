import React from 'react';

export default class Footer extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="footer">
                <p>
                    &copy; All Copy Rights Reserved
                </p>
            </div>
        )
    }

}