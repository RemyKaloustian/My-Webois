import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapPage from './MapPage'
import Menu from './Menu';
import ManagerView from './ManagerView';

class App extends Component {
  render() {
    return (
      <div className="App">
       <MapPage ref="mapComponent"/>
       <Menu onManagerViewClick = {() => this.refs.mapComponent.hide()}/>
       <ManagerView/>
      </div>
    );
  }
}

export default App;
