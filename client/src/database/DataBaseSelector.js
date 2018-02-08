import React, {Component} from 'react';
import $ from "jquery";

//Is used for selection in the database
class DataBaseSelector extends Component
{

    //This one is used for the manager view, gets all the accidents data
    selectAccidents = ()=>
    {
        //Normally use db calls
        return ['En France, c\'est plus de 6 virgule 5 millions', 'de tonnes de nourrrrriture ', 'qui sont jetées chaque' ,'année, par les particluiers (connards de particluiers)','tt',];
    }

    //This one is used for the map view, get only the positions (for now, might more data later)
    selectAccidentsPosition = ()=>
    {
        return [{id:1, latitude:43.616650 , longitude: 7.075074}, {id:2, latitude:43.617551 , longitude: 7.068636}, {id:3, latitude:43.614786 , longitude: 7.067993}];
    }

    //Nothing in render cuz we just want the methods of the database
    render(){ return(<p></p>);}
}

export default DataBaseSelector;