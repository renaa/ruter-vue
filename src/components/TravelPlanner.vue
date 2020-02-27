<template>
  <div class="TravelPlanner">
    <div class="label">Reiseplanlegger</div>
    <div class="stopPlaceContainer">
      <stop-place
        msg="Fra"
        :inputQuery="fromInput"
        v-on:select-place="fromId = $event"
        v-on:map-place="fromId = $event"
      />
      <stop-place
        msg="Til"
        :inputQuery="toInput"
        v-on:select-place="toId = $event"
        v-on:map-place="toId = $event"
      />
    </div>
    <div v-if="fromId && toId">
      <trips :fid="fromId" :tid="toId" :now="getNowDate()" />
    </div>
  </div>
</template>

<script>
import StopPlace from "./StopPlace";
import Trips from "./Trips";

export default {
  name: "getToAndFrom",
  components: {
    StopPlace,
    Trips
  },
  data() {
    return {
      fromInput: "teisen",
      toInput: "frogner",
      fromId: null,
      toId: null
    };
  },
  methods: {
    getNowDate() {
      let x = new Date();
      return x.toISOString();
    },
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 5px;
}
li {
  margin: 5px auto;
  display: block;
}
input {
  padding: 5px;
  margin: 5px 0;
}
.place {
  background-color: #42b983;
  color: white;
  padding: 5px;
  border-radius: 5px;
}
.label {
  width: 100%;
}
.stopPlaceContainer {
  display: flex;
  flex-direction: row;
}
</style>
