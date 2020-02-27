<template>
  <div class="TripPattern">
    <!-- todo lat long to use in foot legs! 🤣 -->
    <div class="leg">
      <div v-for="(leg, i) in tripPattern.legs" :key="i" class=" ">
        <div v-if="leg.mode == 'foot'" class="grid-container">
          <div class="grid-item time">{{ getTime(leg.expectedStartTime) }}</div>
          <div class="grid-item">
            <abbr title="Platform"> </abbr></div>
          <div class="grid-item">🐾</div>
          <div class="grid-item">{{ Math.round(leg.distance) }}m</div>
          <div class="grid-item">➡️</div>
          <div class="grid-item">{{ leg.toPlace.name }}</div>
        </div>
        <div v-else-if="leg.mode == 'bus'" class="grid-container">
          <div class="grid-item">{{ getTime(leg.expectedStartTime) }}</div>
          <div class="grid-item">
            <abbr title="Platform">{{ leg.fromPlace.quay.publicCode }}</abbr></div>
          <div class="grid-item">🚌</div>
          <div class="grid-item">{{ leg.line.publicCode }}</div>
          <div class="grid-item">➡️</div>
          <div class="grid-item">{{ leg.toPlace.name }}</div>
        </div>
        <div v-else-if="leg.mode == 'rail'" class="grid-container">
          <div class="grid-item">{{ getTime(leg.expectedStartTime) }}</div>
          <div class="grid-item">
            <abbr title="Platform">{{ leg.fromPlace.quay.publicCode }}</abbr></div>
          <div class="grid-item">🚅</div>
          <div class="grid-item">{{ leg.line.publicCode }}</div>
          <div class="grid-item">➡️</div>
          <div class="grid-item">{{ leg.toPlace.name }}</div> 
        </div>
        <div v-else-if="leg.mode == 'tram'" class="grid-container">
          <div class="grid-item">{{ getTime(leg.expectedStartTime) }}</div>
          <div class="grid-item">
            <abbr title="Platform">{{ leg.fromPlace.quay.publicCode }}</abbr></div>
          <div class="grid-item">🚋</div>
          <div class="grid-item">{{ leg.line.publicCode }}</div>
          <div class="grid-item">➡️</div>
          <div class="grid-item">{{ leg.toPlace.name }}</div> 
        </div>
        <div v-else-if="leg.mode == 'metro'" class="grid-container">
          <div class="grid-item">{{ getTime(leg.expectedStartTime) }}</div>
          <div class="grid-item">
            <abbr title="Platform">{{ leg.fromPlace.quay.publicCode }}</abbr></div>
          <div class="grid-item">🚇</div>
          <div class="grid-item">{{ leg.line.publicCode }}</div>
          <div class="grid-item">➡️</div>
          <div class="grid-item">{{ leg.toPlace.name }}</div> 
        </div>
        <div v-else-if="leg.mode == 'coach'" class="grid-container">
          <div class="grid-item">{{ getTime(leg.expectedStartTime) }}</div>
          <div class="grid-item">
            <abbr title="Platform">{{ leg.fromPlace.quay.publicCode }}</abbr></div>
          <div class="grid-item">🚐</div>
          <div class="grid-item">{{ leg.line.publicCode }}</div>
          <div class="grid-item">➡️</div>
          <div class="grid-item">{{ leg.toPlace.name }}</div> 
        </div>
        <div v-else-if="leg.mode == 'water'" class="grid-container">
          <div class="grid-item">{{ getTime(leg.expectedStartTime) }}</div>
          <div class="grid-item">
            <abbr title="Platform">{{ leg.fromPlace.quay.publicCode }}</abbr></div>
          <div class="grid-item">🚢</div>
          <div class="grid-item">{{ leg.line.publicCode }}</div>
          <div class="grid-item">➡️</div>
          <div class="grid-item">{{ leg.toPlace.name }}</div> 
        </div>
        <div v-else-if="leg.mode == 'air'" class="grid-container">
          <div class="grid-item">{{ getTime(leg.expectedStartTime) }}</div>
          <div class="grid-item">
            <abbr title="Platform">{{ leg.fromPlace.quay.publicCode }}</abbr></div>
          <div class="grid-item">✈️</div>
          <div class="grid-item">{{ Math.round(leg.distance/1000) }}km</div>
          <div class="grid-item">➡️</div>
          <div class="grid-item">{{ leg.toPlace.name }}</div> 
        </div>

        <div v-else class="grid-container">
          <div class="grid-item">{{ getTime(leg.expectedStartTime) }}</div>
          <div class="grid-item">
            <abbr title="Platform">{{ leg.fromPlace.quay.publicCode }}</abbr></div>
          <div class="grid-item">{{ leg.mode }}</div>
          <div class="grid-item">{{ leg.line.publicCode }}</div>
          <div class="grid-item">➡️</div>
          <div class="grid-item">{{ leg.toPlace.name }}</div> 
        </div>
      </div>
      <div class="summary">
        {{ getTime(tripPattern.endTime) }}
      </div>
    </div>
    
  </div>
</template>

<script language="ts">
export default {
  props: ["tripPattern"],
  name: "TripPattern",
  methods: {
    getTime(iso) {
      return iso.substring(11, 19);
    }
  }
};
</script>

<style scoped>
abbr{
  text-decoration: none;
}
.leg {
  background-color: #35495e;
  color: white;
  padding: 5px;
  border-radius: 5px;
  text-align: left;
  margin: 3px;
}
.grid-container {
  display: grid;
  grid-template-columns: 55px 20px 25px 50px 22px auto;
  grid-gap: 3px;
}
.grid-item {
  text-align: left;
}
.summary{
  text-align: left;
}

</style>
