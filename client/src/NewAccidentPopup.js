import React, { Component } from 'react';
import $ from 'jquery';


class NewAccidentPopup extends Component
{
    componentDidMount(){
        $('#accident-popup').hide();

    }

    render(){
        return (<div id="accident-popup">New accident popup</div>);
    }


}
export default NewAccidentPopup;