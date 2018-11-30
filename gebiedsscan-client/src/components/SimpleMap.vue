<template>
  <div id="map" ></div>
</template>

<style>
  @import "../../node_modules/leaflet/dist/leaflet.css";
</style>

<script>
  import Leaflet from 'leaflet';
  import proj4leaflet from "proj4leaflet";
  import Manager from '../GeoDataManager/Manager';

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
      this.map = new L.Map('map', {
        continuousWorld: true,
      });
      this.map.setView([51.441642, 5.469722], 13);
      this.manager = new Manager(this.map);
      this.manager.add(['OSMBackground', 'ExamplePolygons', 'ExamplePoints']);
    },
    methods: {
      filter(){
        this.manager.filter({stadsdeelnaam: "Stadsdeel Stratum"});
      },
      resetFilter(){
        this.manager.resetFilters();
      },
      nextGroup(){
        this.manager.filter({group: this.group});
        this.group = this.group === 4 ? 1 : this.group + 1;
      },
      underPoint(){
        this.manager.getUnderPoint([51.441642, 5.469722], ['ExamplePolygons']);
      }
    }
  }

</script>