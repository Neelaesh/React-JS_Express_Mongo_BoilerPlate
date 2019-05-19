import React from 'react';

const darkgrayColor = {
    color : 'darkgray',
    textAlign : 'center'
}

export default class About extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="container">
            <h3 style={darkgrayColor}>About Book Basement</h3>
            <div className='panel panel-primary'>
                <div className='panel-body'>
                    <table border="0" align="center">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label><h4>Head Office at Jayanagar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4></label><br/>
                                        <p>No. 14, Jayanagar 4th Block, <br/> Bengaluru, Karnataka 560011.</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <label><h4>Branch Office 1 at Church Street&nbsp;&nbsp;</h4></label><br/>
                                        <p>No. 74, Ashok Nagar, <br/> MG Road, Bengaluru, Karnataka 560001.</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label><h4>Branch Office 2 at Domlur&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4></label><br/>
                                        <p>No. 330, AK Colony, <br/> Domlur, Bengaluru, Karnataka 560071.</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="form-group">
                                        <label><h4>Branch Office 3 at Bellandur&nbsp;&nbsp;</h4></label><br/>
                                        <p>No. 424, Devarabisanahalli, <br/> Bellandur, Bengaluru, Karnataka 560103.</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        );
    }

}