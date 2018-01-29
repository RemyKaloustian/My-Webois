import React from 'react';
import GoogleMapsWrapper from './GoogleMapsWrapper.js';
import { Marker } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

class DemoApp extends React.Component {

    _mapRef = null;
	componentWillMount() {
        this.setState({ markers: [] })
        console.log(this._mapRef);
        
	}
	
	componentDidMount() {
        console.log(this._mapRef);
        
		const url = [
			// Length issue
			`https://gist.githubusercontent.com`,
			`/farrrr/dfda7dd7fccfec5474d3`,
			`/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
		].join("")
		
		fetch(url)
		.then(res => res.json())
		.then(data => {
			this.setState({ markers: data.photos });
        });
        
        console.log(this._mapRef);
	}
	
	render () {
        console.log(this._mapRef);
        
		return (
			<GoogleMapsWrapper
				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				defaultZoom={3}
				defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
                onMapMounted= {c=>this._mapRef=c}>
				<MarkerClusterer
					averageCenter
					enableRetinaIcons
					gridSize={60}
					>
					{this.state.markers.map(marker => (
						<Marker
							key={marker.photo_id}
							position={{ lat: marker.latitude, lng: marker.longitude }}
							/>
					))}
				</MarkerClusterer>
			</GoogleMapsWrapper>
		);
	}
}

export default DemoApp;