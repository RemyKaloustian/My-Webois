import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapPage from './MapPage'
import Menu from './Menu';
import ManagerView from './ManagerView';

class App extends Component {

  showManagerView = () => 
  {
    this.refs.mapComponent.hide();
    this.refs.managerViewComponent.show()
  }

  render() {
    return (
      <div className="App">
       <MapPage ref="mapComponent"/>
       <Menu onManagerViewClick = {() => this.showManagerView()}/>
       <ManagerView ref="managerViewComponent"/>
      </div>
    );
  }
}

export default App;
