<template>
  <div class="trip-pattern">
    <!-- @mouseenter="$log" -->

    <!-- todo lat long to use in foot legs! 🤣 -->
    <div class="leg">
      <div v-for="(leg, i) in tripPattern.legs" :key="i" class="grid-container">
        <div v-if="leg.mode == 'foot'" class="grid-item">
          {{ getTime(leg.expectedStartTime) }}
          🐾
          {{ Math.round(leg.distance) }}m ➡
          {{ leg.toPlace.name }}
        </div>
        <div v-else-if="leg.mode == 'bus'">
          {{ getTime(leg.expectedStartTime) }}
          {{ leg.fromPlace.quay.publicCode }}
          🚌
          {{ leg.line.publicCode }}
          ➡
          {{ leg.toPlace.name }}
        </div>
        <div v-else-if="leg.mode == 'rail'">
          {{ getTime(leg.expectedStartTime) }}
          {{ leg.fromPlace.quay.publicCode }}
          🚅 {{ leg.line.publicCode }}
          ➡
          {{ leg.toPlace.name }}
        </div>
        <div v-else-if="leg.mode == 'tram'">
          {{ getTime(leg.expectedStartTime) }}
          {{ leg.fromPlace.quay.publicCode }}
          🚋
          {{ leg.line.publicCode }}
          ➡
          {{ leg.toPlace.name }}
        </div>

        <div v-else-if="leg.mode == 'metro'">
          {{ getTime(leg.expectedStartTime) }}
          {{ leg.fromPlace.quay.publicCode }}
          🚇
          {{ leg.line.publicCode }}
          ➡
          {{ leg.toPlace.name }}
        </div>

        <div v-else>
          {{ getTime(leg.expectedStartTime) }}
          {{ leg.fromPlace.quay.publicCode }}
          {{ leg.mode }}
          {{ leg.line.publicCode }}
          ➡
          {{ leg.toPlace.name }}
        </div>
      </div>
      <div>
        ------------
      </div>
      <div>
        {{ getTime(tripPattern.endTime) }}
      </div>
    </div>
    <!-- <ul v-if="tripPattern.legs.length">
      <li v-for="(leg, i) in tripPattern.legs" :key="i" ></li>
    
    </ul> -->
  </div>
</template>

<script language="ts">
export default {
  props: ["tripPattern"],
  name: "TripPattern",

  data() {
    return {};
  },
  methods: {
    getTime(iso) {
      return iso.substring(11, 19);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.leg {
  background-color: #42b983;
  color: white;
  padding: 5px;
  border-radius: 5px;
  text-align: left;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;

}
.grid-item {
  border:1px solid black;
}

</style>
