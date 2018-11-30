<template>
   <div class="sk-preview-box-control uk-position-small uk-position-bottom-center uk-visible@m">
       <div v-if="contentIsArray">
        <div class="uk-card uk-card-default uk-card-small uk-card-body sk-preview-card">
          <h5 class="uk-heading-divider">Informatie</h5>
          <ul  v-if="content.length" class="uk-flex uk-flex-wrap sk-preview-list">
            <!-- <a class="uk-icon-button uk-icon" href="#"></a> -->
            <li @click="openItem(item)" @mouseenter="highlightItem(item)" @mouseleave="unhighlightItem(item)" class="uk-flex-auto sk-preview-item" v-for="item in content" :key="item.id">{{item.label}}</li>
          </ul>
          <div v-else class="uk-text-center">
            <h5 style="padding-top:20px;" class="uk-text-muted"> <span uk-tooltip="title: If no results are available, add layers to your map." uk-icon="icon: warning" class="uk-margin-small-right uk-icon"></span> No Preview Info... </h5>
          </div>
          <button class="uk-modal-close-default" type="button" uk-close @click="$emit('dismiss')"></button>
        </div>
         <ObjectInfoModal :item="selectedItem"></ObjectInfoModal>
       </div>
       <div v-else>
        <div class="uk-card uk-card-default uk-card-small uk-card-body sk-preview-card sk-preview-card-title">
          <h5 class="sk-color-red uk-text-bold sk-preview-card-title">{{content.properties.name}}</h5>
          <div class="uk-grid" uk-grid>
            <div class="uk-width-2-3@m"><p class="sk-preview-card-text sk-preview-card-description"><span class="uk-text-capitalize">{{content.properties.category}}</span> binnen <a href="">Parent</a> in {{content.properties.city}}</p></div>
            <div class="uk-width-1-3@m">
              <button uk-toggle="#element-info-modal" @click="openItem(content)" class="uk-button sk-button uk-padding-remove-horizontal sk-button-red uk-float-right uk-text-bold">
                MEER INFO
              </button>
            </div>
          </div>
          <hr class="sk-preview-card-divider">
          <div class="uk-grid-small uk-grid" uk-grid="">
            <div class="uk-width-1-4@m">
              <img style="height:75px;" id="image" :src="content.properties.image" alt="">
            </div>
            <div class="uk-width-3-4@m">
              <div v-if="content.properties.start || content.properties.status || content.properties.development_theme || content.properties.short_description">
                <ul class="sk-preview-card-description-list">
                  <li v-if="content.properties.start"><span class="uk-text-bold">Initiatief gestart op: </span> {{content.properties.start}}</li>
                  <li v-if="content.properties.status"><span class="uk-text-bold">Status: </span> {{content.properties.status}}</li>
                  <li v-if="content.properties.development_theme"><span class="uk-text-bold">Ontwikkelingsthemas</span> {{content.properties.development_theme}}</li>
                  <li v-if="content.properties.short_description">{{content.properties.short_description}}</li>
                </ul>
              </div>
              <div v-else class="uk-text-center">
                <h5 style="padding-top:20px;" class="uk-text-muted"> No Preview Info...</h5>
              </div>
            </div>
          </div>
          <button class="uk-modal-close-default" type="button" uk-close @click="$emit('dismiss')"></button>
        </div>
        <ElementInfoModal :item="selectedItem"></ElementInfoModal>
       </div>
    </div>
</template>

<script>
  import UIkit from 'uikit';
  export default {
    props: {
      content: [Object, Array],
      manager: Object
    },
    data() {
      return {
        selectedItem: null
      }
    },
    computed: {
      contentIsArray() {
        return Array.isArray(this.content);
      }
    },
    methods: {
      managerSetup(managerReference) {
        this.manager = managerReference;
      },
      unhighlightItem() {
        if (this.highLightedItemLayer)
          this.highLightedItemLayer.remove();
      },
      highlightItem(item) {
        this.highLightedItemLayer = item.layer;
        item.layer.addTo(this.manager.map);
        if (item.source !== 'bestemmingsplangebied') {
          this.manager.map.flyToBounds(L.geoJson(item.layer.toGeoJSON()).getBounds(), {maxZoom: 13, easeLinearity: 0.1});
        }
      },
      openItem(item) {
        this.selectedItem = item;
      }
    },
    mounted() {
    },
    watch: {
      manager(manager) {
        this.manager = manager;
      }
    }
  }

</script>