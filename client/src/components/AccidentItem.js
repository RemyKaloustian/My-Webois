import React, {Component} from 'react';
import $ from "jquery";

class AccidentItem extends Component
{
    state = {isActive:true};

    remove = ()=>
    {
        this.setState({isActive:false});
    }

    render()
    {

        if(this.state.isActive)
        {
            return (           
                <div className='accident-item'>
                    <p className='accident-item-address'>{this.props.address}</p>
                    <button className='remove-accident-btn' onClick={()=>this.remove()}>Remove</button>
                </div>      
            );
        }
        else
        {
            return ('');
        }

       
    }

}

export default AccidentItem;