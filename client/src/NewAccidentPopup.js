import React, { Component } from 'react';
import $ from 'jquery';


class NewAccidentPopup extends Component
{
    componentDidMount(){
        $('#accident-popup').hide();

    }

    show = () =>{
        console.log("SHowing ");
        $('#accident-popup').show();
    }

    render(){
        return (<div id="accident-popup">New accident popup</div>);
    }


}
export default NewAccidentPopup;