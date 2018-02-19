import React, { Component } from 'react';
import $ from 'jquery';
import MapPage from './MapPage' //The map component
import Menu from './Menu'; //The bottom menu
import ManagerView from './ManagerView'; //The view with the accidents in list
import NewAccidentPopup from './NewAccidentPopup'; //The popup for declaring a new accident
import NearbyAccidentNotifier from './NearbyAccidentNotifier';
import {getAllOrNearby} from '../services/accidents-service';// The methods for updating data
import DataStore from "../services/data-store";

//The main component
class App extends Component {

  componentDidMount(){
    this.showMapView(); //Showing the map on launch
    getAllOrNearby();
  }

  showManagerView = () =>  {
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

  showNewAccident = () =>{
    this.refs.accidentPopupComponent.show();
  }

  render() {
    //Adding the DB components, then the map, the menu, the manager view and the popup
    //In menu, we pass the functions for showing map/manager view, because we want the menu buttons to use thses functions
    return (
      <div className="App">
       
        <MapPage ref="mapComponent" notifier={() => this.refs.nearbyAccidentNotifier.checkNearbyAccidents(this.refs.mapComponent.state.center, this.refs.mapComponent.state.markers)}
          
        />
        <Menu 
          onManagerViewClick = {() => this.showManagerView()} 
          onMapViewClick = {() => this.showMapView()}
          onNewAccidentClick = {() => this.showNewAccident()}
          />
        <ManagerView ref="managerViewComponent" />
        <NewAccidentPopup ref="accidentPopupComponent" onNewAccident={() => this.validateNewAccident()}/>
        <NearbyAccidentNotifier ref="nearbyAccidentNotifier"/>
      </div>
    );
  }
}

export default App;
