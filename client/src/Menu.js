import React, { Component } from 'react';

import 'bulma/css/bulma.css';

class Menu extends Component {
    render() {
      return (
          <div id="menu">    

                <div id="left-menu">
                    <button>Manager view</button>
                </div>
                <div id="right-menu">
                    <button>Declare accident</button>
                </div>
            </div>
      

        
      );
    }
  }
  
  export default Menu;
  