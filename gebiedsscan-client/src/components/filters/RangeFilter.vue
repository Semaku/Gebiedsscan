<template>
  <div v-if="range">
    <strong>
      <slot></slot>
    </strong>
    <p>Van
      <input type="number" v-model="editableRange.min">
    </p>
    <p>Tot
      <input type="number" v-model="editableRange.max">
    </p>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        defaultsSet: false,
        editableRange: {}
      }
    },
    props: {
      manager: null,
      params: {
        type: Object,
        required: true
      },
      property: {
        type: String,
        required: true
      }
    },
    computed: {
      range(){
        let range = this.params.filterOptions[this.property];

        if (range && !this.defaultsSet) {
          this.defaultsSet = true;

          Vue.set(this.params.query, this.property, range[0]);
          this.editableRange = this.params.query[this.property];
        }
        return range && range.length;
      }
    }
  }
</script>