import React from 'react';
import $ from "jquery";
import {GoogleMap, Marker, withGoogleMap, withScriptjs, InfoBox} from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import AccidentDetails from './AccidentDetails';
import CurrentPositionMarker from './CurrentPositionMarker';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//      DON'T TOUCH THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => 
  {
    const {onMapMounted, ...otherProps} = props;
    return <GoogleMap {...otherProps} ref={c => 
  {
    onMapMounted && onMapMounted(c)
  }}>{props.children}</GoogleMap>
}));

//The map component, displaying the map and the markers
export default class MapPage extends React.Component 
{

  state = 
  {
    markers: [],//the markers for accidents
  };

  _isDemo = true;
  _currentPositionIndex = 0;
  _demoPositions = [
    {lat:43.617184, lng:7.071983},
    {lat:43.617141, lng:7.072133},
    {lat:43.617096, lng:7.072318},
    {lat:43.617048, lng:7.072471},
    {lat:43.617001, lng:7.072648},
    {lat:43.616951, lng:7.072908},
    {lat:43.616972, lng:7.073316},    
    {lat:43.616962, lng:7.073506},        
    {lat:43.616840, lng:7.073683},
    {lat:43.616751, lng:7.073868},
    {lat:43.616751, lng:7.073868},
    {lat:43.616727, lng:7.073919},
    {lat:43.616727, lng:7.073919},
    {lat:43.616727, lng:7.073919},
    {lat:43.616685, lng:7.074147},
    {lat:43.616737, lng:7.074633},
    {lat:43.617013, lng:7.074751},    
   
  ];

  _mapRef = null; //ma reference we will pass to child components


  componentDidMount() 
  {

    //This is where we get the accident datas
    console.log('Mounted @ ' + Date.now());
    const url = "https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json";
    fetch(url)
      .then(res => res.json())
      .then(data => {
      });

      this.setState( {center:{lat:8.983491, lng:38.745232}, markers: []});
      
      //Make map operations in _handleMapMounted
  }


  //Promise to get the current position
  getLocation = () => new Promise((resolve, reject) => 
  {
    if (navigator.geolocation)    
     {
      navigator.geolocation.getCurrentPosition((position) => 
      {
        const latLng = {lat:position.coords.latitude, lng: position.coords.longitude};
        this.setState(latLng);
        resolve(latLng);    //returning the latLng object    
        
      });
    } 
    else
    { 
        console.log( "Geolocation is not supported by this browser.");
    }
  });

  //Don't touch this
  _handleMapMounted = (c) => 
  {
    if (!c || this._mapRef) return;
    this._mapRef = c;
    console.log('Ref set later @ ' + Date.now());
    this.initializeMap();  
  };

  //Don't touch this
  _handleBoundsChanged = () => 
  {
    if (!this._mapRef) return;
    const center = this._mapRef.getCenter();
    const bounds = this._mapRef.getBounds();
  };

  initializeMap = () =>
  {
    this.getLocation().then((value) =>
    {
      this.setState({center: value});//setting the center once we get the curent position
    });

    //Getting the current position every second                
    setInterval(() =>
    {
       //console.log("Updating position"); 
       let self = this;
       if(!this._isDemo)
       {
          this.getLocation().then((value) =>
          {
          this.setState({center: value});         
          //this.props.notifier(value, this.state.markers); 
        });
       }
       else
       {
         if(this._currentPositionIndex < this._demoPositions.length)
         {
            this.setState({center: this._demoPositions[this._currentPositionIndex]});
            this.props.notifier(this.state.center, this.state.markers); 
            this._currentPositionIndex++;          
         }
       }
       
      }, 1000);
  }

  hide = () =>
  {
    console.log("Hiding ");
    $('#map').hide();
  }

  show = () =>
  {
    $('#map').show();
  }

  newAccident = () =>
  {
    //WARNING need an id + latitude + longitude to make a marker object
    let id = Math.floor(Math.random() * (20000 - 0) + 0);
    let updatedMarkers = this.state.markers;
    updatedMarkers.push({id:id, latitude:this.state.center.lat, longitude:this.state.center.lng});
    console.log(updatedMarkers);
    console.log(this.state.center);
    console.log(this.state.markers);
    
    console.log(this.state);
    this.setState({markers:updatedMarkers});
    console.log(" New accident at "+ this.state.center.lat + " & "+ this.state.center.lng);
  }

//get the results from the db and filling the markers
  fill = (results) =>
  {
    let updatedMarkers = [];
    for (let index = 0; index < results.length; index++) 
    {
      updatedMarkers.push(results[index]);     
    }
    this.setState({markers:updatedMarkers});

    console.log(results);
  }

  clickMarker = (id, position, address, type, date, comments)=>
  {
    console.log("Clicked marker ");
    console.log(position);
    console.log(address);
    console.log(type);
    console.log(date);
    this.refs.accidentDetails.show(id, type, address, date, comments);    
  }

 
  render() 
  {
    let width = $(window).width();
    let height = $(window).height();
    
  //Some serious shit is going down dere
    return (
      <div>
      <AccidentDetails ref="accidentDetails"/>
      <CurrentPositionMarker/>

      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div id="map" style={{height: `100%`}}/>}
        mapElement={<div style={{height: `${height}px`}}/>}
        defaultZoom={18}
        center={this.state.center}
        onMapMounted={this._handleMapMounted}
        onBoundsChanged={this._handleBoundsChanged}>
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}>
          {this.state.markers.map(marker => (
            <Marker
              key={marker.id}
              position={{lat: marker.latitude, lng: marker.longitude}}
              onClick={() =>this.clickMarker(marker.id,{lat: marker.latitude, lng: marker.longitude}, marker.address, marker.type, marker.date, marker.comments)}
            >
            
            {this.props.isOpen && <InfoBox
              onCloseClick={this.props.onToggleOpen}
              options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
              <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
                <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                  Hello, Kaohsiung!
                </div>
              </div>
            </InfoBox>}
            
            </Marker>
          ))}
        </MarkerClusterer>
      </GoogleMapsWrapper>
      </div>
    )
  }
}