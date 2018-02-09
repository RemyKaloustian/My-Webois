import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';

//the new accident popup
class NewAccidentPopup extends Component
{
    componentDidMount(){
        //hiding it from the beginning
        $('#popup-container').hide();
        $('#valid-accident').hide();
    }

    show = () =>{
        console.log("SHowing ");
       $('#popup-container').show();
       //PHAT animation
       $("#accident-popup").animate({
            top: '50%'
        }, 500);
    }

    validateAccident = ()=>{
        this.props.onNewAccident();
        let self = this;
        //Need to work on dat
        this.closeAccidentPopup();
        $('#valid-accident').show(); //showing confirmation
        $('#valid-accident').animate({
            top: '40%'
        }, 400, function(){
            setTimeout(function(){
                self.closePopupContainer();
            }, 1500);
        });
    }

    closePopup = (time) =>{
        //PHAT animation
        this.closeAccidentPopup();
        let self = this;

        setTimeout(function(){
            self.closePopupContainer();
        }, time)
    }

    closeAccidentPopup = () =>
    {
        $("#accident-popup").animate({
            top: '-20%'
        }, 400);
    }

    closeValidationPopup =() =>
    {
        $('#valid-accident').hide();
        $('#valid-accident').css('bottom', '10%');
    }

    closePopupContainer = () =>
    {
        $('#popup-container').hide();         
    }

    render(){
        return (
            <div id="popup-container">
                <div id="accident-popup">
                <img src="assets/close.png" id='close-popup'  onClick={()=>this.closePopup(300)}/>
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