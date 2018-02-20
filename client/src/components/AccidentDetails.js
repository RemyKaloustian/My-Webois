import React, {Component} from 'react';
import $ from 'jquery';
import {insertComment, reportAccident} from '../services/accidents-service';
import DataStore from "../services/data-store";

//A panel to display details of the accident 
class AccidentDetails extends Component {

    state = {
        marker: {
            comments: [],
            seriousness: null,
            type: null,
            _id: null
        }
    };

    currentAccidentId = '3333';

    componentDidMount() {
        //Hiding the input from the beginning
        $('#input-container').hide();
    }

    hide = () => {
        $('#accident-detail').animate(
            {
                'left': '100%'
            }, 500
        )
    }

    //Fills the panel with accident details
    show = (marker) => {
        this.currentAccidentId = marker._id;
        this.setState({marker: marker});
        $('#accident-detail').animate(
            {
                'left': '0%'
            }, 500
        )
    }

    showCommentInput = () => {

        $('#accident-detail-content').hide();
        $('#input-container').show();
    };

    hideInput() {
        $('#input-container').hide();
        $('#accident-detail-content').show();
        $("#accident-comments").animate({scrollTop: $('#accident-comments').prop("scrollHeight")}, 1000);
    }

    insertComment = () => {
        //Inserting in DB
        insertComment(this.currentAccidentId, $('#input').val());
        //Adding the comment to the details, temporarily, if you close and reopen the details before the map refresh, the new comment does not show
        let com = this.state.marker.comments;
        com.push({comment: $('#input').val()});
        this.setState(com);
        $('#input').val('');
        this.hideInput();
    };

    severityStyle = (severityId) => {
        let style = {
            fontSize: '1em',
            fontWeight: 'bold'
        };
        switch (severityId) {
            case 0:
                style.color = '#20bf6b';
                break;
            case 1:
                style.color = '#8854d0';
                break;
            case 2:
                style.color = '#fa8231';
                break;
            case 3:
                style.color = '#eb3b5a';
                break;
            default:
                style.color = '#eb3b5a';
                break;
        }
        return style;
    };

    render() {

        let name = '';
        if(DataStore.instance._accidentTypeEnum[this.state.marker.type])
             name =  DataStore.instance._accidentTypeEnum[this.state.marker.type].name;

        return (<div id='accident-detail' style={styles.accidentDetail}>
            <div id='accident-detail-content' style={styles.accidentDetailContent}>
                <h3 style={styles.titleAccidentDetail}>🔥{name}🔥
                    <p style={this.severityStyle(this.state.marker.seriousness)}>{DataStore.instance._severityEnum[this.state.marker.seriousness]}</p>
                </h3>

                <h4 style={styles.subTitleAccidentDetail}>{this.state.marker.address}</h4>
                <h4 style={styles.subTitleAccidentDetail}>{this.state.marker.date}</h4>

                <h4 style={{
                    ...styles.subTitleAccidentDetail,
                    borderBottom: '1px solid #0050ef',
                    marginBottom: '10px',
                    marginTop: '10px'
                }}>Comments</h4>
                <button style={styles.reportButton} onClick={() => reportAccident(this.currentAccidentId)}>Report</button>
                <div id='accident-comments' style={styles.accidentComments}>

                    {
                        this.state.marker.comments.map(function (item, i) {
                            return (<p key={i} style={styles.accidentText}>👉 {item.comment}</p>);
                        })
                    }
                </div>
                <button id="add-comment-btn" style={styles.accidentButton} onClick={() => this.showCommentInput()}>Add
                    Comment
                </button>
                <button style={styles.backButton} onClick={() => this.hide()}>Back</button>

            </div>
            <div id="input-container" style={styles.inputContainer}>
                        <textarea id="input" rows="15" cols="50" style={styles.textarea} placeholder={"Add a comment..."}>
                        </textarea>
                <br/>
                <button style={styles.accidentButton} id="validate-comment" onClick={() => this.insertComment()}>Ok
                </button>
                <button style={styles.backButton} onClick={() => this.hideInput()}>Back</button>
            </div>

        </div>);
    }
}

export default AccidentDetails;


const styles = {
    accidentDetail: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 88,
        backgroundColor: '#f5f5f5',
        color: '#0050ef',
        fontFamily: 'GothamLight',
        left: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    accidentDetailContent: {
        textAlign: 'center',
        width: '90%',
        marginLeft: '50%',
        transform: 'translateX(-50%)',
        marginTop: '10%'
    },
    titleAccidentDetail: {
        fontSize: '2rem',
        borderBottom: 'solid 1px #0050ef',
        marginBottom: '10%'
    },
    subTitleAccidentDetail: {
        fontSize: '1.7rem'
    },
    accidentComments: {
        marginTop: '5%',
        height: '200px',
        maxHeight: '200px',
        overflowY: 'auto'
    },
    accidentText: {
        textAlign: 'left'
    },
    accidentButton: {
        width: '50%',
        textDecoration: 'none',
        border: 'none',
        backgroundColor: '#0050ef',
        color: '#f5f5f5',
        fontFamily: 'Gothamlight',
        height: '50px',
        cursor: 'pointer'
    },
    backButton: {
        width: '50%',
        textDecoration: 'none',
        border: 'none',
        backgroundColor: '#f44336',
        color: '#f5f5f5',
        fontFamily: 'Gothamlight',
        height: '50px',
        cursor: 'pointer'
    },
    inputContainer: {
        marginTop: '10%'
    },
    textarea: {
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        fontSize: '1.2rem',
        overflow: 'auto'
    },
    reportButton: {
        backgroundColor: '#f44336',
        border: 'none',
        color: '#f5f5f5',
        paddingBottom : '3px',
        paddingLeft: '10px',
        paddingRight: '10px',
        cursor: 'pointer'
    }
}
;