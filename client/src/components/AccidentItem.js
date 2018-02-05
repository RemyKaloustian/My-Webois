import React, {Component} from 'react';
import $ from "jquery";

class AccidentItem extends Component
{

    render()
    {
        return (
            <div>
                <p class='accident-item-address'>{this.props.address}</p>
                <button class='remove-accident-btn'>Remove</button>
            </div>
        )
    }

}

export default AccidentItem;