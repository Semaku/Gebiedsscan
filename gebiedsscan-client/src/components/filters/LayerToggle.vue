<template>
  <div v-if="active">
    <label :for="`toggle${layer}`">
      <input class="uk-checkbox" :id="`toggle${layer}`"
           type="checkbox"
           v-model="params.layers[layer]">
      <slot></slot>
      <Legend v-if="shown" :layer="layer" :manager="manager"></Legend>
    </label>
  </div>
</template>
<script>
  export default{
    props: {
      manager: null,
      params: {
        type: Object,
        required: true
      },
      layer: {
        type: String,
        required: true
      },
    },
    computed: {
      active(){
        return this.params.layers && this.params.layers[this.layer] !== undefined;
      },
      shown(){
        return this.params.layers && this.params.layers[this.layer];
      }
    }
  }
</script>