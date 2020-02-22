<template>
  <div class="trip-pattern">
    <!-- @mouseenter="$log" -->

<!-- todo lat long to use in foot legs! 🤣 -->
    <div class="leg">
      <div v-for="(leg, i) in tripPattern.legs" :key="i" class="leg-container">
        <span v-if="leg.mode == 'foot'">
          <!-- {{leg.fromPlace.name}} >  -->
          <!-- {{getTime(leg.aimedStartTime)}} -->
          {{ getTime(leg.expectedStartTime) }}

          🐾{{ Math.round(leg.distance) }}m > {{ leg.toPlace.name }}
        </span>
        <span v-else-if="leg.mode == 'bus'">
          <!-- {{leg.fromPlace.name}} >  -->
          <!-- {{getTime(leg.aimedStartTime)}} -->
          {{ getTime(leg.expectedStartTime) }}
          {{leg.fromPlace.quay.publicCode}}
          🚌 {{ leg.line.publicCode }} > {{ leg.toPlace.name }}
        </span>
        <span v-else-if="leg.mode == 'rail'">
          <!-- {{leg.fromPlace.name}} -->
          <!-- {{getTime(leg.aimedStartTime)}} -->
          {{ getTime(leg.expectedStartTime) }}
        {{leg.fromPlace.quay.publicCode}}
          🚅
          {{ leg.line.publicCode }} > {{ leg.toPlace.name }}
        </span>
        <span v-else-if="leg.mode == 'tram'">
          <!-- {{leg.fromPlace.name}} -->
          <!-- {{getTime(leg.aimedStartTime)}} -->
          {{ getTime(leg.expectedStartTime) }}
        {{leg.fromPlace.quay.publicCode}}

          🚋{{ leg.line.publicCode }} > {{ leg.toPlace.name }}
        </span>

        <span v-else-if="leg.mode == 'metro'">
          <!-- {{leg.fromPlace.name}} >  -->
          <!-- {{getTime(leg.aimedStartTime)}} -->
          {{ getTime(leg.expectedStartTime) }}
        {{leg.fromPlace.quay.publicCode}}

          🚇 {{ leg.line.publicCode }} > {{ leg.toPlace.name }}
        </span>

        <span v-else>
          <!-- {{leg.fromPlace.name}} -->
          <!-- {{getTime(leg.aimedStartTime)}} -->
          {{ getTime(leg.expectedStartTime) }}
        {{leg.fromPlace.quay.publicCode}}

          {{ leg.mode }} {{leg.line.publicCode}}
          > {{ leg.toPlace.name }}
        </span>
        <br />
      </div>
      <span>

------------   
</span>
<br>
      <span>
        {{ getTime(tripPattern.endTime) }}
      </span>
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
h3 {
  margin: 40px 0 0;
}
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
a {
  color: #42b983;
}
input {
  padding: 5px;
  margin: 5px 0;
  /* border-radius: 5px; */
}
.trip-pattern {
  background-color: #42b983;
  color: white;
  padding: 5px;
  border-radius: 5px;
}
.leg {
  text-align: left;
}
</style>
