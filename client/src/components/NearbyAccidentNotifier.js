import React, { Component } from 'react';
import $ from 'jquery';


//Panel that shows only when passing by an accident
class NearbyAccidentNotifier extends Component
{
    state = { notified:[], accident:'', address:'' };
    componentDidMount()
    {
        $('#nearby-accident-popup').css('width', $(window).width());
        $('#nearby-accident-popup').css('height', $(window).height());
        $('#nearby-accident-popup').css('top', '-'+ $(window).height() + 'px');
        
    }

    //The accidents are passed, in markers form (??? , for right now, yes, marker form)
    checkNearbyAccidents = (currentPosition, accidentsList) =>
    {
        let debug  = false;
        if(debug)
        {
            console.log('In checkNearbyAccidents');
            console.log('Received current position = ' );
            console.log( currentPosition);
            console.log('Received accidentsList = ');
            console.log(accidentsList);
        }
       

        for (let index = 0; index < accidentsList.length; index++) 
        {
            if((Math.abs(accidentsList[index].latitude - currentPosition.lat) <= 0.000008) && (Math.abs(accidentsList[index].longitude - currentPosition.lng)) <= 0.0009)
            {
                if(!(this.state.notified.indexOf(accidentsList[index].id) > -1))
                {
                    console.log("this one not in state");
                    let not = this.state.notified;
                    not.push(accidentsList[index].id);
                    this.setState({notified : not, accident:accidentsList[index].type, address:accidentsList[index].address});
                    this.notifyNearByAccident();
                }               
            }            
        }
    }

    showNearbyAccidentPopup = () =>
    {
        console.log("Showing an accident nearby");
       
        $('#nearby-accident-popup').show();
        $('#nearby-accident-popup').animate({
            top: '-5'
        }, 500);

        let popuptime = 3800//normal case, 3800
        let self = this;
        setTimeout(function(){
            self.hideNearbyAccidentPopup();
        }, popuptime);
        
    }

    hideNearbyAccidentPopup = () =>
    {
        $('#nearby-accident-popup').animate({
            top: '-'+$(window).height()
        }, 200, function(){
            $('#nearby-accident-popup').hide();
        });
    }

    notifyNearByAccident = () =>
    {
        console.log("Playing notifier sound");
        //$('#notifier-sound')[0].play();
        this.showNearbyAccidentPopup();
    }


    render()
    {
        return (
            <div id="nearby-accident-notifier">
                <audio id="notifier-sound">
                    <source src="assets/sound/warning.mp3" type="audio/mpeg"/>
                </audio>
                <div id="nearby-accident-popup">
                    <div id="nearby-accident-content">
                        <h3>{this.state.accident}</h3>
                        <br/>
                        <br/>
                        <p>{this.state.address}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default NearbyAccidentNotifier;