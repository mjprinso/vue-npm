
<template>
  <div class="container">
    <div class="row">  
      <div id="app">
        <router-view></router-view>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

