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

    currentCommentId = '0';

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

    show = (id, type, address, date, comments) =>
    {

        this.currentCommentId = id;
        let com =comments;
        
        this.setState({type:type, address:address, date:date, comments:com});
        console.log("In show(), id = " + id);
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
        $('#input-container').hide();
        $('#accident-detail-content').show();        
        $("#accident-comments").animate({ scrollTop: $('#accident-comments').prop("scrollHeight")}, 1000);
    }

    insertComment = () =>
    {
        console.log("Inserting comment " + $('#input').val() + " on "+ this.currentCommentId );
        //$('#accident-comments').append('<p> 👉' +$('#input').val() + '</p>');
        let com = this.state.comments;
        com.push({comment:$('#input').val()});
        this.setState(com);
        $('#input').val('');
        $('#accident-comments').scrollTop($('#accident-comments')[0].scrollHeight);
        this.hideInput();
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
                        <textarea id="input" rows="15" cols="50" >
                        </textarea>
                        <br/>
                        <button id="validate-comment" onClick={() => this.insertComment()}>Ok</button> 
                        <button onClick={() => this.hideInput()}>Back</button> 
                    </div>

                </div>);
    }
}

export default AccidentDetails;