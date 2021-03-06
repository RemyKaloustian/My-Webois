import React, {Component} from 'react';
import $ from "jquery";

import AccidentItem from './AccidentItem';
import DataStore from "../services/data-store";

//The manager view shows the accidents in a list
class ManagerView extends Component {
    state = {accidents: [], removedAccident: ''};//the accidents list

    componentDidMount() //The manager view is never hidden, only its margin-left changes
    {
        //Setting the max height in order to scroll when overflow
        $('#manager-view').css('max-height', $(window).height() - $('#bottom-menu').height());
    }

    show = () => {
        //Making dat phat slide to show the manager view
        $("#manager-view").animate({
            marginLeft: '0px'
        }, 500);
    }

    hide = () => {
        //Making dat phat slide to hide the manager view
        $("#manager-view").animate({
            marginLeft: '100%'
        }, 500);
    }

    //Filling the view with results from db
    fill = (results) => {
        let resaccidents = [];
        for (let index = 0; index < results.length; index++) {
            resaccidents.push(results[index]);
        }
        this.setState({accidents: resaccidents});//setting the accidents
    }

    render() {
        //This is basically like "for each accident, create an AccidentItem"
        let accidentSorted = this.state.accidents.sort((a,b)=> {
           return b.askedRemove - a.askedRemove;
        });
        return (
            <div id="manager-view" style={styles.managerView}>
                <h3 style={styles.title}>The manager view</h3>
                <div>
                    {
                        accidentSorted.map((item, i) => {
                            return (<AccidentItem key={i} severity={item.seriousness} address={item.address} image={DataStore.instance._accidentTypeEnum[item.type].image} id={item._id} reports={item.askedRemove}/>);
                        })
                    }
                </div>
            </div>
        );
    }
}

export default ManagerView;


const styles = {
    managerView: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        fontFamily: 'GothamLight',
        textAlign: 'center',
        overflowY: 'scroll',
        overflowX: 'hidden',
        zIndex: 22,
        width: '100%',
        marginLeft: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5'
    },
    title: {
        color: '#f5f5f5',
        backgroundColor: '#0050ef',
        fontSize: '1.4rem',
        paddingTop: '11px',
        paddingBottom: '13px'
    }
}