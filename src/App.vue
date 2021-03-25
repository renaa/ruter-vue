<template>
  <div id="app">
    <travel-planner />
  </div>
</template>

<script>
import TravelPlanner from "./components/TravelPlanner";

export default {
  name: "App",
  components: {
    TravelPlanner
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

body {
   overflow: hidden;
 }
 
</style>
