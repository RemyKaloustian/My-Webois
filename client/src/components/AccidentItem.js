import React, {Component} from 'react';
import $ from "jquery";

import {deleteAccident} from '../services/accidents-service';
import DataStore from "../services/data-store";

//An accident item is used in the manager view, to list the accidents
class AccidentItem extends Component
{
    state = {isActive:true}; //is used for display/hide

    remove = () =>
    {
        console.log(this.props.id);
        //No longer displaying
        $("#"+this.props.id).animate({
            marginLeft: '100%'
        }, 500,  () => {
            $("#"+this.props.id).remove();
            deleteAccident(this.props.id);
        });
    }

    render()
    {
        return (
            <div className='accident-item' id={this.props.id}>
                <img src={"../../"+this.props.image} />
                <p>{DataStore.instance._severityEnum[this.props.severity]}</p>
                <p className='accident-item-address'>{this.props.address}</p>
                <p>Report requests : {this.props.reports}</p>
                <button style={styles.button} className='remove-accident-btn' onClick={()=>this.remove()}>Remove</button>
            </div>      
        );
    }
}

export default AccidentItem;


const styles = {
    button: {
        cursor: 'pointer'
    }
};