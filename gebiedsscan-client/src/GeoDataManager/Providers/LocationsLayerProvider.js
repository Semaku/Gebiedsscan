/**
 * Created by TomasDePomas.
 * Using: PhpStorm
 * On: 2/6/18 - 1:42 PM
 */

import LayerProvider from "../LayerProvider";
import axios from 'axios';

export default class extends LayerProvider {

  constructor(manager) {
    super(manager);
    this.filters = {searchQuery: null, address: null};
    this.name = 'LocationsLayer';
    this.type = this.TYPE.UNKNOWN;
  }

  render() {
    this.visible = true;
    this.layer = new L.GeoJSON();
    return this.layer;
  }

  filter(params) {
    let query = params.query.searchQuery || params.query.address;
    if (!query || query === '')
      query = ' ';
    axios.get(`https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?bq=type:woonplaats%5E2&q=${query}`)
      .then(result => {
        // if (query === this.manager.params.query.searchQuery || params.query.address) {
        this.layer.fire('change', {data: result.data.response.docs});
        // }
      })
  }

  changeEvent(event) {
    return event.data;
  }
}

