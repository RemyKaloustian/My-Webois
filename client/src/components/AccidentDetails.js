import React, { Component } from 'react';
import $ from 'jquery';

class AccidentDetails extends Component
{

    state = {
        type:'',
        address:'',
        date:'',
        comments:[]
    }

    hide = ()=>
    {
        $('#accident-detail').animate(
            {
                'margin-left': '100%'
            }, 500
        )
    }

    render()
    {
        return (<div id='accident-detail'>
                    <div id='accident-detail-content'>
                        <h3>🔥{this.props.type}🔥</h3>
                        <h4>{this.state.address}</h4>
                        <h4>{this.state.date}</h4>
                        <div id='accident-comments'>
                            <h4>Comments</h4>
                            {
                                this.state.comments.map(function(item, i)
                                {
                                    return (<p key={i}> item</p> );
                                })
                            }                   
                        </div>
                        <button>Add Comment</button>   
                        <button onClick={()=> this.hide()}>Back</button>                     
                    </div>
        
        
                </div>);
    }
}

export default AccidentDetails;