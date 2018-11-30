<template>
   <div class="sk-preview-box-control uk-position-small uk-position-bottom-center ">
     
     <button class="uk-modal-close-default" type="button" uk-close @click="$emit('dismiss')"></button>
    <div v-if="contentIsArray" class="uk-card uk-card-default uk-card-small uk-card-body sk-preview-card uk-box-shadow-large">
      <h5 class="uk-heading-divider">Informatie</h5>
      <ul  v-if="content.length" class="uk-flex uk-flex-wrap sk-preview-list">
        <li @mouseenter="highlightItem(item)" @mouseleave="unhighlightItem(item)" class="uk-flex-auto sk-preview-item" v-for="item in content" :key="item.id" @click="openItem(item, '#object-info-modal')">{{item.label}}</li>
      </ul>
      <div v-else class="uk-text-center">
        <h5 style="padding-top:20px;" class="uk-text-muted"> Selecteer dataset voor resultaat </h5>
      </div>
      <button class="uk-modal-close-default" type="button" uk-close @click="$emit('dismiss')"></button>
    </div>
     <div id="object-info-modal" uk-modal class="uk-modal-container sk-modal-container">
        <ObjectInfoModal :item="selectedItem"></ObjectInfoModal>
    </div>
    
    <div v-if="!contentIsArray" class="uk-card uk-card-default uk-card-small uk-card-body sk-preview-card sk-preview-card-title">
      <h5 class="sk-color-red uk-text-bold sk-preview-card-title">{{content.properties.name}}</h5>
      <div class="uk-grid uk-visible@m" uk-grid style="margin-top: -8px;">
        <div class="uk-width-2-3@m">
          <p v-if="content.properties.address" class="sk-preview-card-text sk-preview-card-description"><span class="uk-text-capitalize">{{content.properties.category}}</span> in {{content.properties.address.city}}</p>
        </div>
        <div class="uk-width-1-3@m">
          <button @click="openItem(content, '#element-info-modal')" class="uk-button sk-button uk-padding-remove-horizontal sk-button-red uk-float-right uk-text-bold">
            MEER INFO
          </button>
        </div>
      </div>
      <hr class="sk-preview-card-divider uk-visible@m">
      <div class="uk-margin-top uk-hidden@m">

      </div>
      <div class="uk-grid-small uk-grid" uk-grid="">
        <div class="uk-width-1-4@m">
          <img style="height:75px; float:left;padding-right:12px;" id="image" :src="content.properties.hero_image" alt="">
          <p class="uk-hidden@m" style="font-size:12px;margin-top:0;">{{content.properties.short_description}}
            <br>
            <button @click="openItem(content, '#element-info-modal')" class="uk-button sk-button uk-padding-remove-horizontal uk-float-right  sk-button-red uk-text-bold">
              MEER INFO
            </button>
          </p>    
        </div>
        <div class="uk-width-3-4@m uk-visible@m">
          <div v-if="content.properties.start || content.properties.status || content.properties.development_theme || content.properties.short_description">
            <ul class="sk-preview-card-description-list">
              <li v-if="content.properties.start"><span class="uk-text-bold">Initiatief gestart op: </span> {{content.properties.start}}</li>
              <li v-if="content.properties.status"><span class="uk-text-bold">Status: </span> {{content.properties.status}}</li>
              <li v-if="content.properties.development_theme && content.properties.development_theme[0]"><span class="uk-text-bold">Ontwikkelingsthemas: </span> {{content.properties.development_theme.join(', ')}}</li>
              <li v-if="content.properties.short_description">{{content.properties.short_description}}</li>
            </ul>
          </div>
          <div v-else class="uk-text-center">
            <h5 style="padding-top:20px;" class="uk-text-muted uk-text-center"> Geen projectdetails beschikbaar </h5>
          </div>
        </div>
      </div>
      <!-- <hr class="uk-margin-top sk-preview-card-divider uk-visible@m"> -->
       <ul  v-if="infoObjects.length" class="uk-margin-top uk-flex uk-flex-wrap sk-preview-list">
        <li v-if="item.source !== 'ElementsLayer'" @mouseenter="highlightItem(item)" @mouseleave="unhighlightItem(item)" class="uk-flex-auto sk-preview-item" v-for="item in infoObjects" :key="item.id" @click="openItem(item, '#object-info-modal')">{{item.label}}</li>
      </ul>
      <div id="element-info-modal" uk-modal class="uk-modal-container sk-modal-container">
        <ElementInfoModal v-if="content && !modalClosed" :item="content"></ElementInfoModal>
      </div>
    </div>
    </div>
</template>

<script>
  import UIkit from 'uikit';
  export default {
    props: {
      content: [Array, Object],
      manager: Object,
      infoObjects: Array
    },
    data() {
      return {
        selectedItem: null,
        modalClosed: true
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
      },
      openItem(content, modalId) {
        Vue.set(this, 'selectedItem', content);
        this.modalClosed = false;
        UIkit.modal(modalId).show();
      }
    },
    mounted() {
       UIkit.util.on('#element-info-modal', 'hide', () => {
          let element = document.querySelector('html');
          if (!element.classList.contains('uk-modal-page')) {
            this.modalClosed = true;
          } 
        });
    },
    watch: {
      manager(manager) {
        this.manager = manager;
      },
      'content': {
        handler(item) {
          this.modalClosed = true;
        },
        deep: true
      }
    }

  }

</script>