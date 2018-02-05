import React, { Component } from 'react';
import $ from 'jquery';
import MapPage from './MapPage'
import Menu from './Menu';
import ManagerView from './ManagerView';
import NewAccidentPopup from './NewAccidentPopup';
import DataBaseSelector from '../database/DataBaseSelector';
import DataBaseUpdater from '../database/DataBaseUpdater';

class App extends Component {

  componentDidMount(){
    this.showMapView();
  }

  showManagerView = () =>  {
    this.refs.mapComponent.hide();
    this.refs.managerViewComponent.show();
    this.refs.managerViewComponent.fill(this.refs.dbselector.selectAccidents());
    $('#left-menu').text("Map view");
  }

  showMapView = () => {
    this.refs.mapComponent.show();
    this.refs.mapComponent.fill(this.refs.dbselector.selectAccidentsPosition());
    this.refs.managerViewComponent.hide();
    $('#left-menu').text("Manager view");
    
  }

  showNewAccident = () =>{
    this.refs.accidentPopupComponent.show();
  }

  validateNewAccident = () =>{
    this.refs.mapComponent.newAccident();
    this.refs.dbupdater.insertAccident(this.refs.mapComponent.state.center);
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
