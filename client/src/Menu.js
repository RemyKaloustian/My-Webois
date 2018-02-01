import React, { Component } from 'react';

import 'bulma/css/bulma.css';

class Menu extends Component {
    render() {
      return (
          <div id="bottom-menu">    

                
                    <button id="left-menu" onClick={() => this.props.onManagerViewClick()}>Manager view</button>
                
                    <button id="right-menu">Declare accident</button>
                
            </div>
      

        
      );
    }
  }
  
  export default Menu;
  