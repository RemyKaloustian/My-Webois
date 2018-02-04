import React, {Component} from 'react';
import $ from "jquery";

//Is used for updates on the DB such as insertion/deletion/modification
class DataBaseUpdater extends Component
{

    insertAccident = (coordsObj) =>
    {
        console.log("inserting in db w/ lat = "+ coordsObj.lat +" & lng = "+coordsObj.lng);
    }

    //Nothing in render cuz we just want the methods of the database
    render(){return(<p></p>);}
}

export default DataBaseUpdater;