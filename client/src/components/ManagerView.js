import React, {Component} from 'react';
import $ from "jquery";

import AccidentItem from './AccidentItem';

//The manager view shows the accidents in a list
class ManagerView extends Component
{
    state = {accidents:[], removedAccident:''};//the accidents list

    componentDidMount() //The manager view is never hidden, only its margin-left changes
    {
        //$('#manager-view').hide();
        //Setting the max height in order to scroll when overflow
        $('#manager-view').css('max-height', $(window).height() - $('#bottom-menu').height());
    }

    show = () =>
    {
        //$('#manager-view').show();
        //$('#manager-view').addClass('animated-show-managerview');
       // $('#manager-view').css('margin-left', '0px');

       //Making dat phat slide to show the manager view
        $("#manager-view").animate({
            marginLeft: '0px'
        }, 500);

    }

    hide = () =>
    {
        //$('#manager-view').hide();
        //$('#manager-view').css('margin-left', '100%');

        //Making dat phat slide to hide the manager view
        $("#manager-view").animate({
            marginLeft: '100%'
        }, 500);
        
    }

    //Filling the view with results from db
    fill = (results)=>
    {
        let resaccidents = [];
        for (let index = 0; index < results.length; index++) 
        {
            resaccidents.push(results[index]);            
        }
        this.setState({accidents:resaccidents});//setting the accidents
        console.log(this.state.accidents);
    }

    render() {   
        //This is basically like "for each accident, create an AccidentItem"     
        return (
          <div id="manager-view" >
                <h3>The manager view</h3>
                <div>
                {
                    this.state.accidents.map(function(item, i)
                    {
                        return (<AccidentItem key={item.id} address={item.address} id={item.id}  />);
                    })
                }
            </div>
          </div>
        );
      }
}

export default ManagerView;