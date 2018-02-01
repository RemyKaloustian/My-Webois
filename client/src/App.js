import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapPage from './MapPage'
import Menu from './Menu';

class App extends Component {
  render() {
    return (
      <div className="App">
       <MapPage ref="mapComponent"/>
       <Menu onManagerViewClick = {() => this.refs.mapComponent.hide()}/>
      </div>
    );
  }
}

export default App;
