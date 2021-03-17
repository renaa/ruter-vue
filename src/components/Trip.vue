<script language="ts">
import TripStage from "./TripStage.vue"
export default {
  props: ["tripPattern", "icon"],
  name: "TripPattern",
  components: {
    TripStage,
  },
  methods: {
    getTime(iso) {
      return iso.substring(11, 19)
    },
  },
}
</script>

<template>
  <div class="TripPattern">
    <div class="leg">
      <div v-for="(leg, i) in tripPattern.legs" :key="i">
        <trip-stage :leg="leg" :icon="'👣'" v-if="leg.mode == 'foot'" />
        <trip-stage :leg="leg" :icon="'🚌'" v-else-if="leg.mode == 'bus'" />
        <trip-stage :leg="leg" :icon="'🚅'" v-else-if="leg.mode == 'rail'" />
        <trip-stage :leg="leg" :icon="'🚋'" v-else-if="leg.mode == 'tram'" />
        <trip-stage :leg="leg" :icon="'🚇'" v-else-if="leg.mode == 'metro'" />
        <trip-stage :leg="leg" :icon="'🚐'" v-else-if="leg.mode == 'coach'" />
        <trip-stage :leg="leg" :icon="'🚢'" v-else-if="leg.mode == 'water'" />
        <trip-stage :leg="leg" :icon="'✈️'" v-else-if="leg.mode == 'air'" />
        <trip-stage :leg="leg" :icon="'❓'" v-else />
      </div>
      <div class="summary">
        {{ getTime(tripPattern.endTime) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.TripPattern {
  border: 1px solid blue;
}
abbr {
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

.summary {
  text-align: left;
}
</style>
