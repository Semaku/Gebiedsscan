<template>
  <div class="hello">
     <!-- <BaseMap style="height: 300px;"
      :params="params"
      @managerSetup="managerSetup"
    ></BaseMap> -->        
  </div>
</template>

<script>
  export default {
    data () {
      return {
        params: {
          query: {},
          layers: {
          },
          filterOptions: {},
          options: {
            flyToBoundsAnimated: false
          }
        }
      }
    },
    methods: {
      managerSetup(managerReference)
      {
        this.manager = managerReference;
        // this.manager.add(['Bestemmingsplangebied']);  
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
