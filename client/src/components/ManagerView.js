import React, {Component} from 'react';
import $ from "jquery";

import AccidentItem from './AccidentItem';

class ManagerView extends Component
{
    state = {accidents:[]};

    componentDidMount() 
    {
        //$('#manager-view').hide();
        $('#manager-view').css('max-height', $(window).height() - $('#bottom-menu').height());
    }

    show = () =>
    {
        //$('#manager-view').show();
        //$('#manager-view').addClass('animated-show-managerview');
       // $('#manager-view').css('margin-left', '0px');
        $("#manager-view").animate({
            marginLeft: '0px'
        }, 500);

    }

    hide = () =>
    {
        //$('#manager-view').hide();
        //$('#manager-view').css('margin-left', '100%');
        $("#manager-view").animate({
            marginLeft: '100%'
        }, 500);
        
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
                <h3>The manager view</h3>
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