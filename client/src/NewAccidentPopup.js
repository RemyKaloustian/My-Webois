import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';

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
        return (
            <div id="accident-popup">
                <h4>New accident</h4> 
                <p>Do you really want to signal an accident at your position ?</p>
                <button>Validate</button>                
            </div>
        );
    }


}
export default NewAccidentPopup;