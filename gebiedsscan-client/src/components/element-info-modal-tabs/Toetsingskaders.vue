<template>
  <div class="uk-section uk-section-xsmall">
        <div class="uk-container">
            <h5 class="sk-color-red uk-text-bold sk-preview-card-title">Toetsingskaders</h5>
            <ul uk-accordion="" class="uk-accordion">
                <li>
                    <a @mouseenter="highlightItem(mapData.Bestemmingsplangebied)" 
                        @click="unhighlightItem(mapData.Bestemmingsplangebied)" 
                        class="uk-accordion-title" 
                        href="#">Bestemmingsplangebied
                    <span v-if="mapData.Bestemmingsplangebied" class="uk-badge uk-label-success">informatie beschikbaar</span> 
                    <span v-else class="uk-badge uk-label-danger">Geen resultaat</span> 
                    </a>
                    <div class="uk-accordion-content uk-margin-top" >
                        <div v-if="mapData.Bestemmingsplangebied">
                            <ul class="uk-list  uk-margin-remove-bottom">
                                <li v-if="bpg.title === 'verwijzingnaarteksturl' || 
                                bpg.title === 'naam' || 
                                bpg.title === 'plangebied' || 
                                bpg.title === 'planstatus' || 
                                bpg.title === 'dossierstatus' || 
                                bpg.title === 'typeplan' || 
                                bpg.title === 'naamoverheid'" 
                                v-for="(bpg, index) in mapData.Bestemmingsplangebied.data[0].formattedProps" v-bind:key="index">
                                    <strong class="uk-text-capitalize">{{bpg.title}}: </strong>
                                    <span v-if="bpg.type === 'text'" >{{bpg.value}}</span>
                                    <span v-if="bpg.type === 'link'" v-for="value in bpg.value" :key="value.id"> <br /><a :href="value"  target="_blank" > {{value}} </a> </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                        <a @mouseenter="highlightItem(mapData.Archeologie)" 
                        @click="unhighlightItem(mapData.Archeologie)" 
                        class="uk-accordion-title" 
                        href="#">Archeologie
                    <span v-if="mapData.Archeologie" class="uk-badge uk-label-success uk-text-small">Informatie beschikbaar</span> 
                    <span v-else class="uk-badge uk-label-danger uk-text-small">Geen resultaat</span> 
                    </a>
                    <div class="uk-accordion-content uk-margin-top" hidden="" aria-hidden="true">
                        <div v-if="mapData.Archeologie">
                            <ul class="uk-list  uk-margin-remove-bottom">
                                <li class="uk-text-capitalize " v-for="(value, key) in mapData.Archeologie.data[0]" :key="key">
                                    <strong class="uk-text-lowercase ">{{key}}: </strong>
                                    <span >{{value}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                        <a @mouseenter="highlightItem(mapData.Rwsgeluidskaarten)" 
                        @click="unhighlightItem(mapData.Rwsgeluidskaarten)" 
                        class="uk-accordion-title" 
                        href="#">RWS Geluidskaarten
                    <span v-if="mapData.Rwsgeluidskaarten" class="uk-badge uk-label-success uk-text-small">Informatie beschikbaar</span> 
                    <span v-else class="uk-badge uk-label-danger uk-text-small">Geen resultaat</span> 
                    </a>
                    <div class="uk-accordion-content uk-margin-top" hidden="" aria-hidden="true">
                        <div v-if="mapData.Rwsgeluidskaarten">
                            <ul class="uk-list  uk-margin-remove-bottom">
                                <li class="uk-text-capitalize " v-for="(value, key) in mapData.Rwsgeluidskaarten.data[0]" :key="key">
                                    <strong class="uk-text-lowercase ">{{key}}: </strong>
                                    <span >{{value}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                        <a @mouseenter="highlightItem(mapData.GemeentelijkeMonumenten)" 
                        @click="unhighlightItem(mapData.GemeentelijkeMonumenten)" 
                        class="uk-accordion-title" 
                        href="#">GemeentelijkeMonumenten
                    <span v-if="mapData.GemeentelijkeMonumenten" class="uk-badge uk-label-success uk-text-small">Informatie beschikbaar</span> 
                    <span v-else class="uk-badge uk-label-danger uk-text-small">Geen resultaat</span> 
                    </a>
                    <div class="uk-accordion-content uk-margin-top" hidden="" aria-hidden="true">
                        <div v-if="mapData.GemeentelijkeMonumenten">
                            <ul class="uk-list  uk-margin-remove-bottom">
                                <li v-if="value && mappings.GemeentelijkeMonumenten[key]" class="uk-text-capitalize " v-for="(value, key) in mapData.GemeentelijkeMonumenten.data[0]" :key="key">
                                    <strong class="uk-text-lowercase ">{{mappings.GemeentelijkeMonumenten[key]}}: </strong>
                                    <span >{{value}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li>
                        <a @mouseenter="highlightItem(mapData.RijksMonumenten)" 
                        @click="unhighlightItem(mapData.RijksMonumenten)" 
                        class="uk-accordion-title" 
                        href="#">RijksMonumenten
                    <span v-if="mapData.RijksMonumenten" class="uk-badge uk-label-success uk-text-small">Informatie beschikbaar</span> 
                    <span v-else class="uk-badge uk-label-danger uk-text-small">Geen resultaat</span> 
                    </a>
                    <div class="uk-accordion-content uk-margin-top" hidden="" aria-hidden="true">
                        <div v-if="mapData.RijksMonumenten">
                            <ul class="uk-list  uk-margin-remove-bottom">
                                <li class="uk-text-capitalize " v-for="(value, key) in mapData.RijksMonumenten.data[0]" :key="key">
                                    <strong class="uk-text-lowercase ">{{key}}: </strong>
                                    <span >{{value}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: null
            },
            mapData: {
                type: Object
            },
            manager: {
                type: Object
            },
            tabloaded: {
                type: Boolean
            }
        },
        data() {
            return {
                highLightedItemLayer: null,
                mappings: {
                    GemeentelijkeMonumenten: {
                        "CATEGORIE": "Categorie" ,
                        "ADRES": "Adres" ,
                        "AANDUIDIN": "Aanduiding" ,
                        "NAAM": "Naam" ,
                        "COMPLEX": "Complex" ,
                        "BOUWJAAR": "Bouwjaar" ,
                        "ARCHITECT": "Architect" ,
                        "AANWIJSDATUM": "Aanwijsdatum" ,
                        "OBJECT_NUMMER": "Object nummer" ,
                        "LINK_PDF": "Link",
                        "MONID": "MONID", 
                        "F2kolum_AD": "F2kolum_AD", 
                        "ADRESSEN": "ADRESSEN", 
                        "MONKODE1": "MONKODE1", 
                        "MONKODE1_O": "MONKODE1_O", 
                        "MONKODE2": "MONKODE2", 
                        "MONKODE2_O": "MONKODE2_O", 
                        "GemMon_ADR": "GemMon_ADR", 
                        "BOUWTKWA": "BOUWTKWA", 
                        "RIJKS_MONN": "RIJKS_MONN", 
                        "GEM_MONNR": "GEM_MONNR", 
                        "WIJK": "WIJK", 
                        "BUURT": "BUURT", 
                        "LOKATIE1": "LOKATIE1", 
                        "LOKATIE2": "LOKATIE2", 
                        "LOKATIE3": "LOKATIE3", 
                        "LOKATIE4": "LOKATIE4", 
                        "VOLUME": "VOLUME", 
                        "CBS_CATEGO": "CBS_CATEGO", 
                        "BOUWJR_VAN": "BOUWJR_VAN", 
                        "BOUWJR_TOT": "BOUWJR_TOT", 
                        "MONWACHT": "MONWACHT", 
                        "DDPLAATSIN": "DDPLAATSIN", 
                        "DDWIJZIGIN": "DDWIJZIGIN", 
                        "BESLUITJR": "BESLUITJR", 
                        "BESLUITNR": "BESLUITNR", 
                        "AANTEKENIN": "AANTEKENIN", 
                        "REDENG_OMS": "REDENG_OMS", 
                        "Monnr": "Monnr", 
                        "gemnr": "gemnr"
                    }
                }
            }
        },
        computed: {
        },
        methods: {
            unhighlightItem(item) {
                if (!item) return;
                if (this.highLightedItemLayer.source === item.source) return;

                this.manager.map.flyToBounds(L.geoJson(this.item.geometry).getBounds(), {
                    maxZoom: 13,
                    easeLinearity: 0.1
                });
            },
            highlightItem(item) {
                if (this.highLightedItemLayer) this.highLightedItemLayer.layer.remove();
                
                if (item) {
                    this.highLightedItemLayer = item;
                    this.manager.map.flyToBounds(
                    L.geoJson(item.layer.toGeoJSON()).getBounds(),{ maxZoom: 13, easeLinearity: 0.1 });
                    item.layer.addTo(this.manager.map);
                }
            },
        },
        watch: {
            tabloaded (loaded) {
                if (loaded) {
                    this.manager.add([
                        "Bestemmingsplangebied",
                        "Archeologie",
                        "Rwsgeluidskaarten",
                        "GemeentelijkeMonumenten",
                        "RijksMonumenten"
                    ]);
                    
                    this.manager.getUnderPolygon(this.item.geometry).then(results => {
                        _.each(results, result => {
                            Vue.set(this.mapData, result.source, result);
                        });
                        this.manager._hideLayer("Bestemmingsplangebied");
                        this.manager._hideLayer("Archeologie");
                        this.manager._hideLayer("Rwsgeluidskaarten");
                        this.manager._hideLayer("GemeentelijkeMonumenten");
                        this.manager._hideLayer("RijksMonumenten");
                        this.manager.filter({ searchQuery: this.item.properties.name });
                    });
                } else {
                    if (this.highLightedItemLayer) this.highLightedItemLayer.layer.remove();
                }
            }
        }

    }

</script>