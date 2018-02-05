import React, {Component} from 'react';
import $ from "jquery";

import AccidentItem from './AccidentItem';

class ManagerView extends Component
{
    state = {accidents:[]};

    componentDidMount() 
    {
        $('#manager-view').hide();
    }

    show = () =>
    {
        $('#manager-view').show();
    }

    hide = () =>
    {
        $('#manager-view').hide();
    }

    fill = (results)=>
    {
        let resaccidents = [];
        for (let index = 0; index < results.length; index++) 
        {
            resaccidents.push(results[index]);            
        }
        this.setState({accidents:resaccidents});
        console.log(this.state.accidents);
    }

    render() {        
        return (
          <div id="manager-view" >
                The manager view
                <div>
                {
                    this.state.accidents.map(function(item, i)
                    {
                        return (<AccidentItem key={i} address={item}/>);
                    })
                }
            </div>
          </div>
        );
      }
}

export default ManagerView;