import React, {Component} from 'react';

import 'bulma/css/bulma.css';

const MAPVIEW = "mapview";
const MANAGERVIEW = "managerview";

//the bottom menu
class Menu extends Component {

    state = {currentView: MAPVIEW}; //is used to check what view we display when pressing the button

    switchView = () => {
        if (this.state.currentView === MAPVIEW) {
            this.props.onManagerViewClick();
            this.setState({currentView: MANAGERVIEW});
        }
        else if (this.state.currentView === MANAGERVIEW) {
            this.props.onMapViewClick();
            this.setState({currentView: MAPVIEW});
        }
    };

    render() {
        return (
            <div style={styles.bottomMenu} id={"bottom-menu"}>
                <button id={"left-menu"} style={{...styles.buttonMenu, ...styles.leftMenu}} onClick={() => this.switchView()}>Manager
                    view
                </button>
                <button id={"right-menu"} style={{...styles.buttonMenu, ...styles.rightMenu}}
                        onClick={() => this.props.onNewAccidentClick()}>Declare accident
                </button>
            </div>

        );
    }
}


const styles = {
    leftMenu: {
        width: '50%',
        cursor: 'pointer',
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',

    },
    rightMenu: {
        width: '50%',
        cursor: 'pointer',
        borderLeft: '2px rgba(169, 169, 169, 0.67)',
        borderRight: 'none',
        borderTop: 'none',
        borderBottom: 'none'
    },
    buttonMenu: {
        height: '100%',
        backgroundColor: '#0050ef',
        color: 'white',
        fontSize: '1.2rem',
        fontFamily: 'GothamLight, sans-serif',
        transitionDuration: '0.3s',
    },
    bottomMenu:{
        position: 'absolute',
        bottom: '0px',
        width:'100%',
        height:'10%',
        overflow: 'hidden'
    },

};

export default Menu;

  