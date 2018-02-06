import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';

class NewAccidentPopup extends Component
{
    componentDidMount(){
        $('#popup-container').hide();
        $('#valid-accident').hide();
    }

    show = () =>{
        console.log("SHowing ");
       $('#popup-container').show();
       $("#accident-popup").animate({
            top: '50%'
        }, 500);
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
        $("#accident-popup").animate({
            top: '0%'
        }, 300);
        setTimeout(function(){
        $('#popup-container').hide();            
        }, 300)
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