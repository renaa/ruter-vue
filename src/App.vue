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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
