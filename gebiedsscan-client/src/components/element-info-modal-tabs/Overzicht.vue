<template>
   <div class="uk-section uk-section-xsmall">
        <div class="uk-container">
            <h5 class="sk-color-red uk-text-bold sk-preview-card-title">{{item.properties.name}}</h5>
            <p>{{item.properties.description}}</p>
            <h5 class="sk-color-red uk-text-bold sk-preview-card-title">Overige</h5>
            <ul class="sk-preview-modal-description-elements">
                <li v-if="item.properties.address && item.properties.address.street_name"><span class="uk-text-bold">Adres: </span><span v-if="item.properties.address.street_name">{{item.properties.address.street_name}}, </span>{{item.properties.address.city}}</li>
                <li v-if="item.properties.start"><span class="uk-text-bold">Initiatief gestart op: </span> {{item.properties.start}}</li>
                <li v-if="item.properties.oplevering"><span class="uk-text-bold">Oplevering: </span> {{item.properties.oplevering}}</li>
                <li v-if="item.properties.status"><span class="uk-text-bold">Status: </span> {{item.properties.status}}</li>
                <li v-if="item.properties.development_theme && item.properties.development_theme.length"><span class="uk-text-bold">Ontwikkelingsthemas:</span> {{item.properties.development_theme.join(', ')}}</li>
                <li v-if="item.properties.category"><span class="uk-text-bold">Categorie: </span> {{item.properties.category}}</li>
                <li v-if="item.properties.woningtypen && item.properties.woningtypen.length"><span class="uk-text-bold">Woningtypen: </span> {{item.properties.woningtypen.join(', ')}}</li>
            </ul>
            <h5 class="sk-color-red uk-text-bold sk-preview-card-title">Initiatieven</h5>
            <div v-if="mapData && mapData.ElementsLayer && mapData.ElementsLayer.data" class="uk-grid-small uk-grid-match uk-child-width-1-3@s uk-margin-top" uk-grid>
                <div v-for="element in elements" :key="element.id">
                    <div v-if="item.properties.name !== element.name" @click="goToElement(element.name)" class="uk-card uk-card-default uk-box-shadow-hover-large sk-pointer">
                        <div class="uk-card-media-top">
                            <img :src="element.hero_image" alt="">
                        </div>
                        <div class="uk-card-body">
                            <div class="uk-card-badge uk-label" v-bind:class="{'uk-label-warning': element.category === 'deelproject', 'uk-label-success': element.category === 'initiatief'}">{{element.category}}</div>
                            <h3 class="uk-card-title uk-margin-remove-bottom">{{element.name}}</h3>
                            <p class="sk-result-card-description">{{element.description || 'No description'}}</p>
                        </div>
                    </div>
                </div>
                <p v-if="!elements.length">Geen resultaat</p>
            </div>
            <p class="uk-margin-top" v-if="!mapData.ElementsLayer">Geen resultaat</p>
        </div>
    </div>
</template>

<script>
import UIkit from "uikit";
    export default {
        props: {
            item: {
                type: Object,
                default: null
            },
            mapData: {
                type: Object
            }
        },
        computed: {
            elements() {
                return this.mapData.ElementsLayer.data.filter(
                    element => element.name !== this.item.properties.name
                );
            }
        },
        methods: {
             goToElement(query) {
                UIkit.modal("#element-info-modal").hide();
                setTimeout(() => {
                    this.$router.push({
                    name: "explore",
                    params: {
                        searchtype: "element",
                        query: query
                    }
                    });
                }, 500);
            },
        },
        mounted() {
        },
        watch: {
        }

    }

</script>