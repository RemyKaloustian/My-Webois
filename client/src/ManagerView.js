import React, {Component} from 'react';
import $ from "jquery";

class ManagerView extends Component
{

    componentDidMount() 
    {
        $('#manager-view').hide();
    }

    show = () =>
    {
        $('#manager-view').show();
    }

    render() {        
        return (
          <div id="manager-view" >
                The manager view
          </div>
        );
      }
}

export default ManagerView;