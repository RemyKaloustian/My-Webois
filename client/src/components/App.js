import React, {Component} from 'react';
import $ from 'jquery';
import MapPage from './MapPage' //The map component
import Menu from './Menu'; //The bottom menu
import ManagerView from './ManagerView'; //The view with the accidents in list
import NewAccidentPopup from './NewAccidentPopup'; //The popup for declaring a new accident
import NearbyAccidentNotifier from './NearbyAccidentNotifier';
import {getAllOrNearby, managerConnection} from '../services/accidents-service';// The methods for updating data
import DataStore from "../services/data-store";
import Modal from 'react-modal';


//The main component
class App extends Component {


    state = {
        openModal: true,
        user: '',
        password: ''
    }

    componentDidMount() {
        this.showMapView(); //Showing the map on launch
        getAllOrNearby();
    }

    showManagerView = () => {
        //Showing the manager view, filling it with accidents, changing the button text
        this.refs.managerViewComponent.show();
        this.refs.managerViewComponent.fill(DataStore.instance.getAll());
        $('#left-menu').text("Map view");
    }

    showMapView = () => {
        //Showing the map, filling it with accidents, hiding the manager view, changing the button text
        this.refs.mapComponent.show();
        this.refs.mapComponent.fill(DataStore.instance.getAll());
        this.refs.managerViewComponent.hide();
        $('#left-menu').text("Manager view");

    }

    showNewAccident = () => {
        this.refs.accidentPopupComponent.show();
    };

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    connection(){
        managerConnection(this.state.user, this.state.password);
    }

    render() {
        //Adding the DB components, then the map, the menu, the manager view and the popup
        //In menu, we pass the functions for showing map/manager view, because we want the menu buttons to use thses functions
        return (
            <div className="App">

                <Modal
                    isOpen={this.state.openModal}
                    contentLabel="Modal">
                    <div style={styles.modal}>
                        <h1>Connection</h1>
                        <p>Manager</p>
                        <input type={'text'} value={this.state.user} placeholder={'Manager name...'} onChange={this.handleChange}/>
                        <input type={'password'} value={this.state.password} placeholder={'Password'} onChange={this.handleChange}/>
                        <button onClick={this.connection}>Validate</button>
                    </div>
                </Modal>

                <MapPage ref="mapComponent"
                         notifier={() => this.refs.nearbyAccidentNotifier.checkNearbyAccidents(this.refs.mapComponent.state.center, this.refs.mapComponent.state.markers)}

                />
                <Menu
                    onManagerViewClick={() => this.showManagerView()}
                    onMapViewClick={() => this.showMapView()}
                    onNewAccidentClick={() => this.showNewAccident()}
                />
                <ManagerView ref="managerViewComponent"/>
                <NewAccidentPopup ref="accidentPopupComponent" onNewAccident={() => this.validateNewAccident()}/>
                <NearbyAccidentNotifier ref="nearbyAccidentNotifier"/>
            </div>
        );
    }
}

export default App;


const styles = {
    modal: {
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%'
    }
};
