import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';

class NewAccidentPopup extends Component
{
    componentDidMount(){
        $('#popup-container').hide();
        $('#valid-accident').hide();
        
        //Centering the popup in here cuz it breaks my balls to do it in css
        //$('#accident-popup').css('margin-left', $(window).width()/2 - $('#accident-popup').width()/2);
        //$('#valid-accident').css('margin-left', $(window).width()/2 - $('#valid-accident').width()/2);
        
    }

    show = () =>{
        console.log("SHowing ");
        $('#popup-container').show();
    }

    validateAccident = ()=>{
        this.props.onNewAccident();
        this.closePopup();
        $('#valid-accident').show();

        setTimeout(()=>{
        $('#valid-accident').hide();
            
        }, 2000);
    }

    closePopup = () =>{
        $('#popup-container').hide();
    }

    render(){
        return (
            <div id="popup-container">
                <div id="accident-popup">
                <img src="assets/close.png" id='close-popup'  onClick={()=>this.closePopup()}/>
                    <h4>New accident</h4> 
                    <p>Do you really want to signal an accident at your position ?</p>
                    <button onClick={() => this.validateAccident()}>Validate</button>  

                                
                </div>
                <div id="valid-accident">
                    New accident on your position
                </div>  
            </div>
        );
    }


}
export default NewAccidentPopup;