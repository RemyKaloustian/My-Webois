import React, {Component} from 'react';
import $ from "jquery";

import {removeAccident} from '../database/DBUpdater';

//An accident item is used in the manager view, to list the accidents
class AccidentItem extends Component
{
    state = {isActive:true}; //is used for display/hide

    remove = ()=>
    {
        //No longer displaying
        $("#"+this.props.id).animate({
            marginLeft: '100%'
        }, 500,  () =>{
            $("#"+this.props.id).remove();
            removeAccident(this.props.id.split('-')[1]);
        });
    }

    render()
    {    
        return (           
            <div className='accident-item' id={this.props.id}>
                <p className='accident-item-address'>{this.props.address}</p>
                <button className='remove-accident-btn' onClick={()=>this.remove()}>Remove</button>
            </div>      
        );
    }
}

export default AccidentItem;