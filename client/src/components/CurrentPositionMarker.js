import React, {Component} from 'react';
import $ from 'jquery';

class CurrentPositionMarker extends Component
{
    render()
    {
        return (

            
            <img width="30" height="30" src="assets/location.png" id="current-position"/>
        );
    }
} 

export default CurrentPositionMarker;