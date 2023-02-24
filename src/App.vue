<template>
  <div class="app">
    <nav-bar/>
    <RouterView></RouterView>
  </div>
</template>



<script lang="ts">
  import NavBar from "@/components/NavBar.vue";
  export default ({
    components: {
      NavBar
    }
  })
</script>


<style lang="scss">
  .app {
    padding: 15px;
  }
</style>