import React, { Component } from 'react';

import 'bulma/css/bulma.css';

const MAPVIEW = "mapview";
const MANAGERVIEW = "managerview";

//the bottom menu
class Menu extends Component {

    state = { currentView: MAPVIEW}; //is used to check what view we display when pressing the button

    switchView = () =>{
        if(this.state.currentView === MAPVIEW){
            this.props.onManagerViewClick();
            this.setState({currentView: MANAGERVIEW});
        }
        else if(this.state.currentView === MANAGERVIEW){
            this.props.onMapViewClick();
            this.setState({currentView: MAPVIEW});
        }
    }

    render() {
      return (
        <div id="bottom-menu">    
            <button id="left-menu" className="hvr-shutter-out-horizontal" onClick={() => this.switchView()}>Manager view</button>
            <button id="right-menu" className="hvr-shutter-out-horizontal"   onClick={() => this.props.onNewAccidentClick()}>Declare accident</button>
        </div>
        
      );
    }
  }
  
  export default Menu;
  