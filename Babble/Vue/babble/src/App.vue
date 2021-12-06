<template>
  <div id="app">
    <div class="menu">
      <img class="menu" src="./assets/img/logo.png">
      <a href="#/index" class="menu"> CLASSIC </a>
      <a href="#/progressive" class="menu"> PROGRESSIVE </a>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

@import './assets/styles/menu.css';

</style>
