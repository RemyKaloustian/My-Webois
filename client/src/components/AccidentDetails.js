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

    componentDidMount()
    {
        $('#input-container').hide();
    }

    hide = ()=>
    {
        $('#accident-detail').animate(
            {
                'left': '100%'
            }, 500
        )
    }

    show = (type, address, date, comments) =>
    {
        let com =comments;
        
        this.setState({type:type, address:address, date:date, comments:com});
        console.log("In show()");
        $('#accident-detail').animate(
            {
                'left': '0%'
            }, 500
        )
    }

    showCommentInput = () =>
    {
        $('#accident-detail-content').hide();
        $('#input-container').show();
    }

    hideInput()
    {
        $('#accident-detail-content').show();
        $('#input-container').hide();
    }

    render()
    {
        return (<div id='accident-detail'>
                    <div id='accident-detail-content'>
                        <h3>🔥{this.state.type}🔥</h3>
                        <h4>{this.state.address}</h4>
                        <h4>{this.state.date}</h4>
                        
                            <h4>Comments</h4>
                            <div id='accident-comments'>
                                
                                {
                                    this.state.comments.map(function(item, i)
                                    {
                                        return (<p key={i}>👉 {item.comment}</p> );
                                    })
                                }                   
                            </div>
                            <button id="add-comment-btn" onClick={() => this.showCommentInput()}>Add Comment</button>  
                            <button onClick={()=> this.hide()}>Back</button> 
                                        
                    </div>
                    <div id="input-container">
                        <textarea>
                        </textarea>
                        <br/>
                        <button id="validate-comment">Ok</button> 
                        <button onClick={() => this.hideInput()}>Back</button> 
                    </div>

                </div>);
    }
}

export default AccidentDetails;