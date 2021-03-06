import React from 'react';
import { GoogleMap,withGoogleMap,withScriptjs } from 'react-google-maps';

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//DON'T TOUCH THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

 const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
console.log(props.onMapMounted);
     
  return <GoogleMap {...props} ref={props.onMapMounted}>{props.children}</GoogleMap>
}));

export default GoogleMapsWrapper;