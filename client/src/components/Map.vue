<template>
  <div>
    <div class="google-map" :id="mapName">
    </div>
  </div>
</template>
<script>
export default {
  name: 'google-map',
  props: ['name'],
  methods:{   

    centerMapToCurrentLocation(){
      navigator.geolocation.getCurrentPosition((position) => {
        var currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log(currentLocation);
        this.map.panTo(new google.maps.LatLng(currentLocation.lat, currentLocation.lng));
        this.map.setZoom(20);
        this.addMarker(currentLocation);
        //Watch position, pour la mise à jour de la position du gars
      });      
    },

    addMarker(LatLngObj){
      var marker =  new google.maps.Marker({
        position: new google.maps.LatLng(LatLngObj.lat, LatLngObj.lng),
        map:this.map,
        icon:'http://www.magic-emoji.com/emoji/images/619_emoji_iphone_ok_hand_sign.png'
      });
    }
  },
  data: function () {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [{
        latitude: 51.501527,
        longitude: -0.1921837
      }, {
        latitude: 51.505874,
        longitude: -0.1838486
      }, {
        latitude: 51.4998973,
        longitude: -0.202432
      }],
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName)
    const mapCentre = this.markerCoordinates[0]
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    }
    this.map = new google.maps.Map(element, options);
    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({ 
        position,
        map: this.map
        
      });
    this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    });
    this.centerMapToCurrentLocation();
    
  }
 
};
</script>
<style scoped>
.google-map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}

/*button
{
  position: absolute;
  z-index: 99;
  right:2px;
  top:2px;
}*/
</style>