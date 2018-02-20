import React, {Component} from 'react';
import $ from 'jquery';
import DataStore from "../services/data-store";


//Panel that shows only when passing by an accident
class NearbyAccidentNotifier extends Component {
    state = {notified: [], accident: '', address: ''};

    componentDidMount() {
        $('#nearby-accident-popup').css('width', $(window).width());
        $('#nearby-accident-popup').css('height', $(window).height());
        $('#nearby-accident-popup').css('top', '-' + $(window).height() + 'px');

    }

    //The accidents are passed, in markers form (??? , for right now, yes, marker form)
    checkNearbyAccidents = (currentPosition, accidentsList) => {
        for (let index = 0; index < accidentsList.length; index++) {
            if ((Math.abs(accidentsList[index].latitude - currentPosition.lat) <= 0.000008) && (Math.abs(accidentsList[index].longitude - currentPosition.lng)) <= 0.0009) {
                if (!(this.state.notified.indexOf(accidentsList[index].id) > -1)) {
                    let not = this.state.notified;
                    not.push(accidentsList[index].id);
                    this.setState({
                        notified: not,
                        accident: accidentsList[index],
                        address: accidentsList[index].address
                    });
                    this.notifyNearByAccident();
                }
            }
        }
    }

    showNearbyAccidentPopup = () => {
        if (!("Notification" in window)) {
            alert("Ce navigateur ne supporte pas les notifications desktop");
        }

        // Voyons si l'utilisateur est OK pour recevoir des notifications
        else if (Notification.permission === "granted") {
            // Si c'est ok, créons une notification
            let type = DataStore.instance._accidentTypeEnum[this.state.accident.type];
            let severity = DataStore.instance._severityEnum[this.state.accident.seriousness];
            let body = 'Severity :' + severity + '\n' + this.state.accident.address;
            let options = {
                body: body,
                icon: type.image
            };
            $('#notifier-sound')[0].play();
            let notification = new Notification(type.name, options);
        }

        // Sinon, nous avons besoin de la permission de l'utilisateur
        // Note : Chrome n'implémente pas la propriété statique permission
        // Donc, nous devons vérifier s'il n'y a pas 'denied' à la place de 'default'
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {

                // Quelque soit la réponse de l'utilisateur, nous nous assurons de stocker cette information
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }

                // Si l'utilisateur est OK, on crée une notification
                if (permission === "granted") {
                    let notification = new Notification("You have accepted notifications");
                }
            });
        }
    };

    notifyNearByAccident = () => {
        this.showNearbyAccidentPopup();
    };


    render() {

        return (
            <div id="nearby-accident-notifier">
                <audio id="notifier-sound">
                    <source src="../../assets/sound/warning.mp3" type="audio/mpeg"/>
                </audio>
            </div>
        );
    }
}

export default NearbyAccidentNotifier;