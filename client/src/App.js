import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';
import MapPage from './MapPage'
import Menu from './Menu';
import ManagerView from './ManagerView';
import NewAccidentPopup from './NewAccidentPopup';
import DataBaseSelector from './DataBaseSelector';
import DataBaseUpdater from './DataBaseUpdater';

class App extends Component {

  showManagerView = () =>  {
    this.refs.mapComponent.hide();
    this.refs.managerViewComponent.show();
    this.refs.managerViewComponent.fill(this.refs.dbselector.selectAccidents());
    $('#left-menu').text("Map view");
  }

  showMapView = () => {
    this.refs.mapComponent.show();
    this.refs.managerViewComponent.hide();
    $('#left-menu').text("Manager view");
    
  }

  showNewAccident = () =>{
    this.refs.accidentPopupComponent.show();
  }

  validateNewAccident = () =>{
    this.refs.mapComponent.newAccident();
  }

  render() {
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
