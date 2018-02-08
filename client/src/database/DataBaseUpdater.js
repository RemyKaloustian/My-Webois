import React, {Component} from 'react';
import $ from "jquery";

//Is used for updates on the DB such as insertion/deletion/modification
class DataBaseUpdater extends Component
{

    //Is used when we add a new accident
    insertAccident = (coordsObj) =>
    {
        console.log("inserting in db w/ lat = "+ coordsObj.lat +" & lng = "+coordsObj.lng);
    }

    removeAccident = (id) =>
    {
        console.log("Removing accident w/ id " + id);
    }

    //Nothing in render cuz we just want the methods of the database
    render(){return(<p></p>);}
}

export default DataBaseUpdater;