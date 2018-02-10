import React, { Component } from 'react';
import $ from 'jquery';


class NearbyAccidentNotifier extends Component
{
    componentDidMount()
    {
        $('#nearby-accident-popup').css('width', $(window).width());
        $('#nearby-accident-popup').css('height', $(window).height());
        $('#nearby-accident-popup').css('top', '-'+ $(window).height() + 'px');
        
    }

    //The accidents are passed, in markers form (??? , for right now, yes, marker form)
    checkNearbyAccidents = (curentPosition, accidentsList) =>
    {

    }

    showNearbyAccidentPopup = () =>
    {
       
        $('#nearby-accident-popup').show();
        $('#nearby-accident-popup').animate({
            top: '0'
        }, 500);
        
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
                    <h3>Warning, accident nearby</h3>
                    <p>[adresse de l'accident]</p>
                </div>
            </div>
        );
    }
}

export default NearbyAccidentNotifier;