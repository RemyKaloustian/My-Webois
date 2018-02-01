import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';

class NewAccidentPopup extends Component
{
    componentDidMount(){
        $('#accident-popup').hide();
        //Centering the popup in here cuz it breaks my balls to do it in css
        $('#accident-popup').css('margin-left', $(window).width()/2 - $('#accident-popup').width()/2);

    }

    show = () =>{
        console.log("SHowing ");
        $('#accident-popup').show();
    }

    render(){
        return (
            <div id="accident-popup">
            <button>Close</button>
                <h4>New accident</h4> 
                <p>Do you really want to signal an accident at your position ?</p>
                <button>Validate</button>                
            </div>
        );
    }


}
export default NewAccidentPopup;