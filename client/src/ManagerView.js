import React, {Component} from 'react';
import $ from "jquery";

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
                        return (<p key={i}>{item}</p>);
                    })
                }
            </div>
          </div>
        );
      }
}

export default ManagerView;