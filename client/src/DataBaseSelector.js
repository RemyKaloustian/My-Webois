import React, {Component} from 'react';
import $ from "jquery";

//Is used for selection in the database
class DataBaseSelector extends Component
{

    selectAccidents = ()=>
    {
        //Normally use db calls
        return ['En France, c\'est plus de 6 virgule 5 millions', 'de tonnes de nourrrrriture ', 'qui sont jetées chaque' ,'année, par les particluiers (connards de particluiers)'];
    }

    //Nothing in render cuz we just want the methods of the database
    render(){ return(<p></p>);}
}

export default DataBaseSelector;