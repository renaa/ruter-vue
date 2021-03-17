<script language="ts">
export default {
  props: ["icon", "leg"],
  name: "TripStage",
  methods: {
    getTime(iso) {
      return iso.substring(11, 19)
    },
  },
  data(){
    return {
      platform: this.leg.fromPlace.quay?.publicCode ?? '_',
    };
  },
  computed: {
    legInfo: function(){
      if (this.leg.line?.publicCode)
      {
        return this.leg.line.publicCode
      }
      if (this.leg.distance < 1000)
      {
        return Math.round(this.leg.distance) + 'm'
      }
      return Math.round(this.leg.distance / 1000) + 'km'
    }
  }
}
</script>

<template>
  <div class="TripStage">
    <div class="leg">
      <div>
        <div class="grid-container">
          <div class="grid-item">{{ getTime(leg.expectedStartTime) }}</div>
          <div class="grid-item">
            <abbr title="Platform">{{ platform }} </abbr>
          </div>
          <div class="grid-item">{{ icon }}</div>
          <div class="grid-item">{{ legInfo}}</div>
          <div class="grid-item">➡️</div>
          <div class="grid-item">{{ leg.toPlace.name }}</div>
        </div>
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
.grid-container {
  display: grid;
  grid-template-columns: 55px 20px 25px 50px 22px auto;
  grid-gap: 3px;
}
.grid-item {
  text-align: left;
}

</style>
