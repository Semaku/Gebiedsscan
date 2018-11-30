<template>
  <div v-if="active">
     <div class="uk-margin-left uk-margin-top">
      <a @click="selectAll">Alle</a>
      <a @click="selectNone">Geen</a>
      <template v-for="option in renderableOptions">
        <div v-bind:key="option.id">
          <input :id="`filter${property}${option.name}`"
            type="checkbox"
            class="uk-checkbox"
            :checked="activeFilters.indexOf(option.value) !== -1"
            @click="toggle(option.value)"> {{option.name || option.value}}
          <label :for="`filter${property}${option.name}`"></label>
        </div>
      </template>
      <template v-if="total > 6">
        <a @click="toggleShowAll" v-if="showAll">Verberg</a>
        <a @click="toggleShowAll" v-else>Alle tonen ({{total}})</a>
      </template>
     </div>
    <br>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        query: '',
        total: 0,
        activeFilters: [],
        defaultsSet: false,
        showAll: false
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
        let options = this.query ? this.options.filter(option => {
          return option.name.toLowerCase().indexOf(
              this.query.toLowerCase()
            ) !== -1;
        }) : this.options;
        this.total = options.length;
        return this.showAll ? options : options.slice(0, 6);
      },
      options(){
        let options = this.params.filterOptions[this.property];

        if (options) {
          if (!_.isObject(options[0])) {
            options = options.map(name => {
              return {name: name, value: name}
            });
          }
          if (!this.defaultsSet) {

            this.defaultsSet = true;

            let defaults = options.filter(option => option.standard).map(option => option.value);
            if (defaults.length) {
              Vue.set(this.params.query, this.property, defaults);
            } else {
              Vue.set(this.params.query, this.property, options.map(option => option.value));
            }
            this.activeFilters = this.params.query[this.property];
          }
          return options;
        }
        return [];
      },
      active()
      {
        return this.options.length !== 0;
      }
    },
    methods: {
      toggle(value)
      {
        let index = this.activeFilters.indexOf(value);
        if (index !== -1) {
          this.activeFilters.splice(index, 1);
        } else {
          this.activeFilters.push(value);
        }
        return false;
      },
      toggleShowAll()
      {
        this.showAll = !this.showAll;
      },
      selectAll(){
        Vue.set(this.params.query, this.property, this.options.map(option => option.value));
        this.activeFilters = this.params.query[this.property];
      },
      selectNone()
      {
        Vue.set(this.params.query, this.property, []);
        this.activeFilters = this.params.query[this.property];
      }
    }
  }
</script>