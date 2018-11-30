<template>
  <div class="map-controls">
    <div class="control with-submenu" @mouseleave="layerBoxShown = false">
      <button @click="layerBoxShown = true">
        <svg width="22" height="22" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Vector</title><desc>Created using Figma</desc><g id="Canvas" transform="translate(-17653 -4128)"><g id="Vector"><use xlink:href="#path0_fill6" transform="translate(17653 4128)"/></g></g><defs><path id="path0_fill6" d="M 26.5292 18.6163L 31.9994 15.4911L 26.3767 12.2983L 31.9994 9.08571L 16 -1.44386e-08L 0 9.08571L 5.62274 12.2983L 0 15.4911L 5.62274 18.7036L 0 21.8964L 16 31.0375L 32 21.8964L 26.3773 18.7036L 26.4186 18.6798C 26.4594 18.6646 26.4931 18.6402 26.5292 18.6163ZM 16 1.33872L 29.6469 9.08862L 25.1998 11.6298L 16.0006 16.8857L 2.3531 9.08862L 16 1.33872ZM 6.48047 13.1502C 6.57481 13.3441 6.76988 13.4804 6.99989 13.4804C 7.15711 13.4804 7.29803 13.4169 7.40285 13.3156L 8.72002 14.0679C 8.4114 14.0825 8.1645 14.3329 8.1645 14.645C 8.1645 14.9664 8.42537 15.2273 8.74681 15.2273C 9.06824 15.2273 9.32911 14.9664 9.32911 14.645C 9.32911 14.5442 9.29708 14.4546 9.25225 14.3719L 15.2675 17.8086C 15.1999 17.9036 15.1522 18.0136 15.1522 18.1388C 15.1522 18.4602 15.413 18.7211 15.7345 18.7211C 16.0559 18.7211 16.3168 18.4602 16.3168 18.1388C 16.3168 18.1091 16.3045 18.0841 16.2999 18.0555L 22.1532 14.7114C 22.1876 15.0002 22.424 15.2267 22.7221 15.2267C 23.0436 15.2267 23.3044 14.9658 23.3044 14.6444C 23.3044 14.4551 23.2084 14.2944 23.068 14.1884L 24.3503 13.4559C 24.3899 13.4646 24.4271 13.4798 24.469 13.4798C 24.7276 13.4798 24.939 13.3086 25.0152 13.0757L 25.2016 12.9691L 29.6469 15.4934L 28.4922 16.1531C 28.4008 15.9511 28.1993 15.809 27.9635 15.809C 27.642 15.809 27.3812 16.0699 27.3812 16.3913C 27.3812 16.5171 27.4295 16.6271 27.497 16.7221L 25.1998 18.0346L 21.4801 20.16C 21.5255 20.0773 21.5581 19.9865 21.5581 19.8851C 21.5581 19.5637 21.2972 19.3028 20.9758 19.3028C 20.6544 19.3028 20.3935 19.5637 20.3935 19.8851C 20.3935 20.1978 20.6416 20.4482 20.9508 20.4622L 19.633 21.2151C 19.5282 21.1138 19.3867 21.0498 19.2289 21.0498C 18.9074 21.0498 18.6466 21.3106 18.6466 21.6321C 18.6466 21.6786 18.6629 21.72 18.6734 21.7637L 16.0006 23.2905L 12.788 21.455C 12.7123 21.2215 12.5003 21.0498 12.2412 21.0498C 12.1987 21.0498 12.1609 21.0655 12.1213 21.0742L 10.8396 20.3423C 10.9799 20.2357 11.0766 20.0756 11.0766 19.8857C 11.0766 19.5643 10.8157 19.3034 10.4943 19.3034C 10.1962 19.3034 9.95917 19.5311 9.92539 19.8199L 4.0709 16.4757C 4.07497 16.4472 4.08778 16.4216 4.08778 16.3919C 4.08778 16.0705 3.82691 15.8096 3.50548 15.8096C 3.36631 15.8096 3.24402 15.8649 3.14387 15.9464L 2.35251 15.4946L 6.48047 13.1502ZM 29.6463 21.8993L 15.9994 29.6964L 2.3531 21.8993L 6.79783 19.375L 16 24.6321L 25.2016 19.375L 29.6463 21.8993Z"/></defs></svg>
      </button>
      <div class="submenu" v-if="layerBoxShown">
        <strong>Ondergrond</strong>
        <ul>
          <li @click="setBackground('map')">Kaart</li>
          <li @click="setBackground('satellite')">Luchtfoto</li>
          <li class="disabled">3D</li>
        </ul>
      </div>
    </div>
    <div class="control">
      <button @click="geoLocate" v-if="canGeolocate">
        <div v-show="locating" uk-spinner="ratio: .7"></div>
        <svg v-show="!locating" width="22" height="22" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Vector</title><desc>Created using Figma</desc><g id="Canvas" transform="translate(-17657 -4204)"><g id="Vector"><use xlink:href="#path0_fill9" transform="translate(17657 4204)" fill="#333333"/></g></g><defs><path id="path0_fill9" d="M 12 7.63636C 9.6 7.63636 7.63636 9.6 7.63636 12C 7.63636 14.4 9.6 16.3636 12 16.3636C 14.4 16.3636 16.3636 14.4 16.3636 12C 16.3636 9.6 14.4 7.63636 12 7.63636ZM 21.7091 10.9091C 21.1636 6.32727 17.5636 2.72727 13.0909 2.29091L 13.0909 0L 10.9091 0L 10.9091 2.29091C 6.32727 2.72727 2.72727 6.32727 2.29091 10.9091L 0 10.9091L 0 13.0909L 2.29091 13.0909C 2.83636 17.6727 6.43636 21.2727 10.9091 21.7091L 10.9091 24L 13.0909 24L 13.0909 21.7091C 17.6727 21.1636 21.2727 17.5636 21.7091 13.0909L 24 13.0909L 24 10.9091L 21.7091 10.9091ZM 12 19.6364C 7.74545 19.6364 4.36364 16.2545 4.36364 12C 4.36364 7.74545 7.74545 4.36364 12 4.36364C 16.2545 4.36364 19.6364 7.74545 19.6364 12C 19.6364 16.2545 16.2545 19.6364 12 19.6364Z"/></defs></svg>
      </button>
    </div>
    <div class="control">
      <button @click="zoomIn">
        <span uk-icon="icon: plus; ratio: .5"></span>
      </button>
      <button @click="zoomOut">
        <span uk-icon="icon: minus; ratio: .5"></span>
      </button>
    </div>
  </div>
</template>
<style lang="scss">
  .map-controls {
    z-index: 500;
    position: absolute;
    bottom: 30px;
    right: 20px;

    .control {
      width: 40px;
      height: 40px;
      margin-top: 10px;
      border-radius: 50%;
      background-color: white;
      -webkit-box-shadow: 0 14px 25px rgba(0, 0, 0, 0.16);
      box-shadow: 0 14px 25px rgba(0, 0, 0, 0.16);

      > button {
        display: block;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        line-height: 40px;
        border-radius: 50%;
        cursor: pointer;
        background: none;
        border: none;

        &:not(:only-child) {
          line-height: 20px;

          &:first-child {
            border-radius: 20px 20px 0 0;
            border-bottom: 1px solid rgba(100, 100, 100, 0.2);
          }
          &:not(:first-child) {
            border-radius: 0 0 20px 20px;
          }

          height: 50%;
        }

        &:active {
          background: #cccccc;
          -webkit-box-shadow: inset 0 14px 25px rgba(0, 0, 0, 0.06);
          box-shadow: inset 0 14px 25px rgba(0, 0, 0, 0.06);
        }

        &:focus {
          outline: 0;
        }
      }

      &.with-submenu {
        > button:not(:only-child) {
          height: 100%;
          border-radius: 50%;
        }
        .submenu {
          position: absolute;
          right: 20px;
          top: 30px;
          display: block;
          width: 120px;
          padding: 5px 0;
          border-radius: 4px;
          z-index: 3;
          background-color: white;
          -webkit-box-shadow: 0 14px 25px rgba(0, 0, 0, 0.16);
          box-shadow: 0 14px 25px rgba(0, 0, 0, 0.16);

          li, strong {
            padding: 0 8px;
            &.disabled {
              color: #aaa;
            }
          }
          ul {
            list-style: none;
            margin: 0;
            padding: 0;

            li:hover:not(.disabled) {
              cursor: pointer;
              background-color: #cccccc;
            }
          }
        }
      }
    }
  }
</style>

<script>
  export default{
    data(){
      return {
        layerBoxShown: false,
        locating: false
      }
    },
    props: {
      manager: null
    },
    methods: {
      setBackground(type){
        this.manager.filter({
          'background': type
        });
        this.layerBoxShown = false;
      },
      canGeolocate(){
        return !!navigator.geolocation;
      },
      geoLocate(){
        this.locating = true;
        this.manager.panToUserLocation(() => {
          this.locating = false;
        });
      },
      zoomIn(){
        this.manager.map.zoomIn();
      },
      zoomOut(){
        this.manager.map.zoomOut();
      },
    }
  }
</script>