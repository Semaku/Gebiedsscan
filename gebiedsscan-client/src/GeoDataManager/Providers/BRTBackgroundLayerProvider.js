/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";

export default class extends LayerProvider {

  constructor(manager) {
    super(manager);

    this.filters = {
      background: null
    };
    this.zIndex = -1;

    this.name = 'BRTBackground';
    this.type = this.TYPE.TILES;

  }

  render() {
    this.visible = true;
    this.layer =
      new L.TileLayer('http://geodata.nationaalgeoregister.nl/tms/1.0.0/brtachtergrondkaart/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 13,
        tms: true,
        continuousWorld: true
      });

    return this.layer;
  }

  clickEvent(event) {
    return event.latlng;
  }


  filter(params) {
    switch (params.query.background) {
      case 'map':
        this.layer.setUrl('http://geodata.nationaalgeoregister.nl/tms/1.0.0/brtachtergrondkaart/{z}/{x}/{y}.png');
        break;
      case'satellite':
        this.layer.setUrl('https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/tms/1.0.0/Actueel_ortho25/EPSG:28992/{z}/{x}/{y}.jpeg');
        break;
    }
    this.layer.fire('change', {data: params.query.background});
    this.manager._restack();
  }
}

