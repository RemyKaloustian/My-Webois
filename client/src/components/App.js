import React, { Component } from 'react';
import $ from 'jquery';
import MapPage from './MapPage' //The map component
import Menu from './Menu'; //The bottom menu
import ManagerView from './ManagerView'; //The view with the accidents in list
import NewAccidentPopup from './NewAccidentPopup'; //The popup for declaring a new accident
import DataBaseSelector from '../database/DataBaseSelector'; //The component for getting data
import DataBaseUpdater from '../database/DataBaseUpdater';// The component for updating data

class App extends Component {

  componentDidMount(){
    this.showMapView(); //Showing the map on launch
  }

  showManagerView = () =>  {
    //this.refs.mapComponent.hide();
    //Showing the manager view, filling it with accidents, changing the button text
    this.refs.managerViewComponent.show();
    this.refs.managerViewComponent.fill(this.refs.dbselector.selectAccidents());
    $('#left-menu').text("Map view");
  }

  showMapView = () => {
    //Showing the map, filling it with accidents, hiding the manager view, changing the button text
    this.refs.mapComponent.show();
    this.refs.mapComponent.fill(this.refs.dbselector.selectAccidentsPosition());
    this.refs.managerViewComponent.hide();
    $('#left-menu').text("Manager view");
    
  }

  showNewAccident = () =>{
    this.refs.accidentPopupComponent.show();
  }

  validateNewAccident = () =>{
    //Showing the confirmation and inserting new accident
    this.refs.mapComponent.newAccident();
    this.refs.dbupdater.insertAccident(this.refs.mapComponent.state.center);
  }

  render() {
    //Adding the DB components, then the map, the menu, the manager view and the popup
    //In menu, we pass the functions for showing map/manager view, because we want the menu buttons to use thses functions
    return (
      <div className="App">
        <DataBaseSelector ref="dbselector"/>
        <DataBaseUpdater ref="dbupdater"/>
        <MapPage ref="mapComponent"/>
        <Menu 
          onManagerViewClick = {() => this.showManagerView()} 
          onMapViewClick = {() => this.showMapView()}
          onNewAccidentClick = {() => this.showNewAccident()}
          />
        <ManagerView ref="managerViewComponent"/>
        <NewAccidentPopup ref="accidentPopupComponent" onNewAccident={() => this.validateNewAccident()}/>
      </div>
    );
  }
}

export default App;
