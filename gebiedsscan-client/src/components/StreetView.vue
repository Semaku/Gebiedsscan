<template>
  <div>
    asdfasdfasdfasdfasdf
    <div id="map" style="width: 50%; height: 100%;float:left"></div>
    <div id="pano" style="width: 50%; height: 100%;float:left"></div>
  </div>   
</template>

<style>
    /* Always set the map height explicitly to define the size of the div
     * element that contains the map. */
    #map {
    height: 400px;
    width: 300px;
    background: red;
    }
    
  </style>

<script>
  export default{
    data() {
      return {
        map: null,
        manager: null,
        group: 1,
      }
    },
    mounted()
    {
      var map;
      var panorama;

      function initMap() {
        var berkeley = {lng: 5.491017, lat: 51.437489};
        var sv = new google.maps.StreetViewService();

        panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

        // Set up the map.
        map = new google.maps.Map(document.getElementById('map'), {
        center: berkeley,
        zoom: 16,
        streetViewControl: false
        });

        // Set the initial Street View camera to the center of the map
        sv.getPanorama({location: berkeley, radius: 50}, processSVData);

        // Look for a nearby Street View panorama when the map is clicked.
        // getPanoramaByLocation will return the nearest pano when the
        // given radius is 50 meters or less.
        map.addListener('click', function(event) {
        sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
        });
      }

      function processSVData(data, status) {
        if (status === 'OK') {
        var marker = new google.maps.Marker({
          position: data.location.latLng,
          map: map,
          title: data.location.description
        });

        panorama.setPano(data.location.pano);
        panorama.setPov({
          heading: 270,
          pitch: 0
        });
        panorama.setVisible(true);

        marker.addListener('click', function() {
          var markerPanoID = data.location.pano;
          // Set the Pano to use the passed panoID.
          panorama.setPano(markerPanoID);
          panorama.setPov({
          heading: 270,
          pitch: 0
          });
          panorama.setVisible(true);
        });
        } else {
        console.error('Street View data not found for this location.');
        }
      }
      initMap();
    },
    methods: {
       
    }
  }

</script>