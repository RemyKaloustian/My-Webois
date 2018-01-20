<template>
  <div>
    <div class="google-map" :id="mapName">
    </div>
  </div>
</template>
<script>

//J'ai testé des trucs en global mais ça fait pareil on dirait
let _currentLoc = {};
_currentLoc.tamaire = "kk";

export default {
  name: 'google-map',
  props: ['name'],
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
      markers: [], 
      baybay:"tt",//pour tester
      currentLocation:{} //C'est ça qu'on veut modifier
    }
  },
  methods:{ 
    updateCurrentPosition(){    
      navigator.geolocation.getCurrentPosition((position) => {
        //Là on set ce putain d'objet
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("After setting, This.currentLocation = ");
        console.log(this.currentLocation);//Là ça affiche bien l'objet

        this.tamaire = "tété";
       _currentLoc.lat = this.currentLocation.lat;
        _currentLoc.lng = this.currentLocation.lng;
        console.log(_currentLoc.lat); //Là aussi les affichages marchent
        console.log(_currentLoc.lng);

        this.baybay = "AYNORMHEU";
        console.log(this.baybay);//Là aussi ça marche
        this.$set(this, 'baybay', "AYNORMHEU"); //ça c'est sur le site de VUE         

        this.map.panTo(new google.maps.LatLng(this.currentLocation.lat, this.currentLocation.lng));
        this.map.setZoom(18);
      });      
    },  

    initializeMap(){        
      this.updateCurrentPosition(); 

      console.log("Before addMarker, This.currentLocation = ");
      console.log(this.currentLocation); //Là on a plus les valeurs qu'on a set,, objet vide
      console.log(_currentLoc.lat);//marche pas
      console.log(_currentLoc.lng);//marche pas 
      console.log(_currentLoc.tamaire);//pas changé alors que modifiée dans updateCurrentPosition
      console.log(this.baybay); //Là la valeur est pas changée(alors qu'on a mis AYNORMEUH avant)
        
      this.addMarker(this.currentLocation);
    },

    addMarker(LatLngObj){
      //on dirait que LatLngObj marche pas non plus
      console.log("In addMarker This.currentLocation = ");
      console.log(this.currentLocation);  //marche pas objet vide
        console.log(this.baybay);//same shit     
        
      var marker =  new google.maps.Marker({
        position: new google.maps.LatLng(LatLngObj.lat, LatLngObj.lng),
        map:this.map,
        icon:'http://www.magic-emoji.com/emoji/images/619_emoji_iphone_ok_hand_sign.png'
      });
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
    this.initializeMap();    
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