import React from 'react';
import $ from "jquery";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
//const google = window.google;

const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
  const {onMapMounted, ...otherProps} = props;
  return <GoogleMap {...otherProps} ref={c => {
    onMapMounted && onMapMounted(c)
  }}>{props.children}</GoogleMap>
}));

export default class MapPage extends React.Component {

  state = {
    markers: [],
  };

  componentDidMount() {

    //This is where we get the acci
    console.log('Mounted @ ' + Date.now());
    const url = "https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json";
    fetch(url)
      .then(res => res.json())
      .then(data => {
        //this.setState({markers: data.photos});
      });

      this.setState({markers: [{id:1, latitude:43.616650 , longitude: 7.075074}, {id:2, latitude:43.617551 , longitude: 7.068636}, {id:3, latitude:43.614786 , longitude: 7.067993}]});
      
      //Make map operations in _handleMapMounted
  }

  _mapRef = null;

  getLocation = ()=> {
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition((position) => {
        
        this.state.lat = position.coords.latitude;
        this.state.lng = position.coords.longitude;
        console.log("In get location = " + this.state.lat +' --  ' + this.state.lng);
        this._mapRef.panTo({lat:this.state.lat, lng:this.state.lng});
      
        
        
      });
    } 
    else
    { 
        console.log( "Geolocation is not supported by this browser.");
    }
  }

  _handleMapMounted = (c) => {
    if (!c || this._mapRef) return;
    this._mapRef = c;
    console.log('Ref set later @ ' + Date.now());
    this.getLocation();
    //console.log("In handleMapMounted = " +this.state.lat +' --  ' + this.state.lng);
    
  };

  _handleBoundsChanged = () => {
    if (!this._mapRef) return;
    const center = this._mapRef.getCenter();
    const bounds = this._mapRef.getBounds();
    // console.log(center, bounds);
  };

  render() {

    let width = $(window).width();
    let height = $(window).height();
  
    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `100%`}}/>}
        mapElement={<div style={{height: `${height}px`}}/>}
        defaultZoom={18}
        defaultCenter={{lat: 25.0391667, lng: 121.525}}
        onMapMounted={this._handleMapMounted}
        onBoundsChanged={this._handleBoundsChanged}>
        <Marker key="333" position={{lat: 43.620720, lng:7.070611}}></Marker>
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}>
          {this.state.markers.map(marker => (
            <Marker
              key={marker.id}
              position={{lat: marker.latitude, lng: marker.longitude}}
            />
          ))}
        </MarkerClusterer>
      </GoogleMapsWrapper>
    )
  }
}