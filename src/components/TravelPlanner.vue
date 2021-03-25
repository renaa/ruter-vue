<template>
  <div class="TravelPlanner">
    <div class="label">Reiseplanlegger</div>
    <div class="stopPlaceContainer">
      <stop-place-selector
        msg="Fra"
        :inputQuery="fromInput"
        v-on:select-place="fromId = $event"
        v-on:map-place="fromId = $event"
      />
      <stop-place-selector
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
import StopPlaceSelector from "./StopPlaceSelector"
import Trips from "./Trips"

export default {
  name: "getToAndFrom",
  components: {
    StopPlaceSelector,
    Trips,
  },
  data() {
    return {
      fromInput: "teisen",
      toInput: "frogner",
      fromId: null,
      toId: null,
    }
  },
  methods: {
    getNowDate() {
      let x = new Date()
      return x.toISOString()
    },
  },
}
</script>



<style lang="scss" scoped>
@import "../scss/main.scss";

.label {
  font-size: 2rem;
  margin-bottom: 1em;;
}
.label {
  width: 100%;
}
.stopPlaceContainer {

  //todo not enforced styles ;( ;( ;(
  display: flex;
  flex-direction: column;

  @media screen and (min-width: $breakpoint) {
    flex-direction: row;
  .stopPlaceSelector:nth-child(1){
    margin-right: 10px;
  }
  }
  .stopPlaceSelector:nth-child(1){
    margin-bottom: 10px;
  }

}
</style>
