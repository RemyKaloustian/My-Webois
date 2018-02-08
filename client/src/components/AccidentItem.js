import React, {Component} from 'react';
import $ from "jquery";

//An accident item is used in the manager view, to list the accidents
class AccidentItem extends Component
{
    state = {isActive:true}; //is used for display/hide

    remove = ()=>
    {
        //No longer displaying
        this.setState({isActive:false});
    }

    render()
    {

        if(this.state.isActive)//checking if we display the component
        {
            return (           
                <div className='accident-item'>
                    <p className='accident-item-address'>{this.props.address}</p>
                    <button className='remove-accident-btn' onClick={()=>this.remove()}>Remove</button>
                </div>      
            );
        }
        else //if not displaying
        {
            return ('');
        }

       
    }

}

export default AccidentItem;