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

    //This is where we get the accident datas
    console.log('Mounted @ ' + Date.now());
    const url = "https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json";
    fetch(url)
      .then(res => res.json())
      .then(data => {
      });

      this.setState( {center:{lat:8.983491, lng:38.745232}, markers: [{id:1, latitude:43.616650 , longitude: 7.075074}, {id:2, latitude:43.617551 , longitude: 7.068636}, {id:3, latitude:43.614786 , longitude: 7.067993}]});
      
      //Make map operations in _handleMapMounted
  }

  _mapRef = null;

  //Promise to get the current position
  getLocation = () => new Promise((resolve, reject) => {
    if (navigator.geolocation)     {
      navigator.geolocation.getCurrentPosition((position) => {
        const latLng = {lat:position.coords.latitude, lng: position.coords.longitude};
        this.setState(latLng);
        resolve(latLng);       
        
      });
    } 
    else
    { 
        console.log( "Geolocation is not supported by this browser.");
    }
  });

  _handleMapMounted = (c) => {
    if (!c || this._mapRef) return;
    this._mapRef = c;
    console.log('Ref set later @ ' + Date.now());
    this.initializeMap();  
  };

  _handleBoundsChanged = () => {
    if (!this._mapRef) return;
    const center = this._mapRef.getCenter();
    const bounds = this._mapRef.getBounds();
  };

  initializeMap = () =>{
    this.getLocation().then((value) =>{
      this.setState({center: value});      
    });

  }

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
            />
          ))}
        </MarkerClusterer>
      </GoogleMapsWrapper>
    )
  }
}