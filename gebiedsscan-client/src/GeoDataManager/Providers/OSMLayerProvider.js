/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";

export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.name = 'OSMBackground';
    this.type = this.TYPE.TILES;
  }

  render() {
    this.visible = true;
    this.layer = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    return this.layer;
  }

  clickEvent(event){
    return event.latlng;
  }
}

