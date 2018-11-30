<template>
  <router-view/>
</template>

<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);

export default {
  name: 'App'
}
</script>

<style lang="scss" >
   @import '../../assets/sass/main.scss';
</style>