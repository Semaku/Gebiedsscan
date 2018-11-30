<template>
  <div style="height:100%;">
    <slot></slot>
    <MapControls :manager="manager"></MapControls>
    <div class="map" :id="mapId"></div>
  </div>
</template>

<style>
  @import "../../node_modules/leaflet/dist/leaflet.css";
</style>

<script>
  import Leaflet from 'leaflet';
  import 'leaflet-draw';
  import 'leaflet.markercluster';
  import 'leaflet.pm';
  import proj4leaflet from "proj4leaflet";
  import Manager from '../GeoDataManager/Manager';
  import proj4 from "proj4";

  var Terraformer = require('terraformer');
  export default{
    data() {
      return {
        map: null,
        manager: null,
        group: 1,
      }
    },
    props: {
      bounds: {
        type: Object,
      },
      params: {
        type: Object,
        default: () => {
          return {
            layers: {},
            query: {},
            options: {
              flyToBoundsAnimated: true
            }
          }
        }
      },
      center: {
        type: Array,
        default: () => [51.441642, 5.469722]
      },
      zoomLevel: {
        type: Number,
        default: 6
      }
    },
    mounted()
    {
      proj4.defs('urn:ogc:def:crs:EPSG::28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs');
      var RD = new L.Proj.CRS('EPSG:28992', '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
        {
          resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
          bounds: L.bounds([-285401.92, 22598.08], [595401.9199999999, 903401.9199999999]),
          origin: [-285401.92, 22598.08]
        }
      );

      this.map = new L.Map(this.mapId, {
        continuousWorld: true,
        crs: RD,
        maxZoom: 13,
        zoomControl: false
      });

      this.map.setView(this.center, this.zoomLevel);
      this.manager = new Manager(this.map);

      this.manager.add(['BRTBackground', ...this.params.layers]);

      //Pane created for elements
      let myPane = this.map.createPane("ElementsPane");
      myPane.style.zIndex = 399;

      // this.map.
      this.manager.applyParams(this.params);
      this.manager.onManager('availableFiltersUpdated', (filters) => {
        this.$emit('availableFiltersUpdated', filters);
      });
      if (this.bounds) {
        this.flyToBounds(this.bounds);
      }

      Object.keys(this.$listeners).forEach(listener => {
        let segments = listener.match(/(^[A-Za-z]+)([A-Z][a-z]+$)/);
        if (segments && segments.length === 3) {
          this.manager.on(segments[2].toLowerCase(), segments[1], this.$listeners[listener]);
        } else {
          this.manager.on(listener, this.$listeners[listener]);
        }
      });

      this.$emit('managerSetup', this.manager);
    },
    methods: {
      flyToBounds(geometry){
        try {
          this.map.flyToBounds(L.geoJson(geometry).getBounds(), {maxZoom: 13, easeLinearity: 0.1, animate: this.params.options.flyToBoundsAnimated});
        } catch (error) {
          // 
        }
      }
    },
    computed: {
      mapId () {
        return 'map' + this._uid;
      }
    },
    watch: {
      'params.layers': {
        handler() {
          this.manager.applyParams(this.params);
        },
        deep: true
      },
      'params.query': {
        handler() {
          this.manager.applyParams(this.params);
        },
        deep: true
      },
      bounds(newBounds) {
        this.flyToBounds(newBounds);
      }
    }
  }
</script>