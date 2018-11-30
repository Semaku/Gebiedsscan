<template>
  <div>
    <slot></slot>

    <template v-for="option in renderableOptions">
      <div v-bind:key="option.id">
        <input :id="`filter${property}${option.name}`"
             type="checkbox"
             class="uk-checkbox"
             :checked="activeFilters.indexOf(option.value) !== -1"
             @click="toggle(option.value)"> {{option.name}}
        <label :for="`filter${property}${option.name}`"></label>
      </div>
    </template>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        activeFilters: [],
        defaultsSet: false
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
      renderableOptions(){
        if (!_.isObject(this.options[0])) {
          return this.options.map(name => {
            return {name: name, value: name}
          });
        }
        return this.options
      },
      options(){
        let options = this.params.filterOptions[this.property];

        if (options && !this.defaultsSet) {
          this.defaultsSet = true;

          let defaults = options.filter(option => option.standard).map(option => option.value);
          Vue.set(this.params.query, this.property, defaults || options.map(option => option.value));
          this.activeFilters = this.params.query[this.property];
        }
        return options || [];
      }
    },
    methods: {
      toggle(value){
        let index = this.activeFilters.indexOf(value);
        if (index !== -1) {
          this.activeFilters.splice(index, 1);
        } else {
          this.activeFilters.push(value);
        }
        return false;
      }
    }
  }
</script>