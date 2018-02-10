import React, { Component } from 'react';
import $ from 'jquery';


class NearbyAccidentNotifier extends Component
{
    //The accidents are passed, in markers form (??? , for right now, yes, marker form)
    checkNearbyAccidents = (accidentsList) =>
    {

    }

    notifyNearByAccident = () =>
    {
        console.log("Playing notifier sound");
        $('#notifier-sound')[0].play();
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