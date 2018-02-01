import React, { Component } from 'react';
import $ from 'jquery';
import 'bulma/css/bulma.css';

class NewAccidentPopup extends Component
{
    componentDidMount(){
        $('#accident-popup').hide();
        $('#valid-accident').hide();
        
        //Centering the popup in here cuz it breaks my balls to do it in css
        $('#accident-popup').css('margin-left', $(window).width()/2 - $('#accident-popup').width()/2);
        $('#valid-accident').css('margin-left', $(window).width()/2 - $('#valid-accident').width()/2);
        
    }

    show = () =>{
        console.log("SHowing ");
        $('#accident-popup').show();
    }

    validateAccident = ()=>{
        this.props.onNewAccident();
        $('#accident-popup').hide();
        $('#valid-accident').show();

        setTimeout(()=>{
        $('#valid-accident').hide();
            
        }, 2000);
    }

    closePopup = () =>{
        $('#accident-popup').hide();
    }

    render(){
        return (
            <div>
                <div id="accident-popup">
                <button onClick={()=>this.closePopup()}>Close</button>
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