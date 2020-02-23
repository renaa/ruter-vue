<template>
  <div id="app">
    <to-and-from />
  </div>
</template>

<script>
import ToAndFrom from "./components/ToAndFrom.vue";

export default {
  name: "App",
  components: {
    ToAndFrom
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');


#app {
  font-family: 'Roboto Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
