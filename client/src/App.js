import React, { Component } from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import './App.css';
import MapPage from './MapPage'
import Menu from './Menu';
import ManagerView from './ManagerView';
import NewAccidentPopup from './NewAccidentPopup';


class App extends Component {

  showManagerView = () =>  {
    this.refs.mapComponent.hide();
    this.refs.managerViewComponent.show();
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

  render() {
    return (
      <div className="App">
       <MapPage ref="mapComponent"/>
       <Menu 
          onManagerViewClick = {() => this.showManagerView()} 
          onMapViewClick = {() => this.showMapView()}
          onNewAccidentClick = {() => this.showNewAccident()}
          />
       <ManagerView ref="managerViewComponent"/>
       <NewAccidentPopup ref="accidentPopupComponent"/>
      </div>
    );
  }
}

export default App;
