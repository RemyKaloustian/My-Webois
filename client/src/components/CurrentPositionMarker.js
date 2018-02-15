import React, {Component} from 'react';
import $ from 'jquery';

//The marker that shows the current position
class CurrentPositionMarker extends Component
{
    render()
    {
        //Just an image overlapping the map
        return (            
            <img width="30" height="30" src="assets/location.png" id="current-position"/>
        );
    }
} 

export default CurrentPositionMarker;