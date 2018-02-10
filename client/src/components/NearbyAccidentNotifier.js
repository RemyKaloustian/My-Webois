import React, { Component } from 'react';
import $ from 'jquery';


class NearbyAccidentNotifier extends Component
{
    state = { notified:[] };
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
            if((Math.abs(accidentsList[index].latitude - currentPosition.lat) < 0.0008) && (Math.abs(accidentsList[index].longitude - currentPosition.lng)) < 0.004)
            {
                if(!(this.state.notified.indexOf(accidentsList[index].id) > -1))
                {
                    console.log("this one not in state");
                    let not = this.state.notified;
                    not.push(accidentsList[index].id);
                    this.setState({notified : not});
                    this.showNearbyAccidentPopup();
                }               
            }            
        }
    }

    showNearbyAccidentPopup = () =>
    {
        console.log("Showing an accident nearby");
       
        $('#nearby-accident-popup').show();
        $('#nearby-accident-popup').animate({
            top: '0'
        }, 500);

        let self = this;
        setTimeout(function(){
            self.hideNearbyAccidentPopup();
        }, 3800);
        
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
        $('#notifier-sound')[0].play();
        this.showNearbyAccidentPopup();
    }


    render()
    {
        return (
            <div id="nearby-accident-notifier">
                <button onClick={() => this.notifyNearByAccident()}>Test sound</button>
                <audio id="notifier-sound">
                    <source src="assets/sound/warning.mp3" type="audio/mpeg"/>
                </audio>
                <div id="nearby-accident-popup">
                    <div id="nearby-accident-content">
                        <h3>Accident nearby !</h3>
                        <br/>
                        <br/>
                        <p>[adresse de l'accident]</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default NearbyAccidentNotifier;