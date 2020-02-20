<template>
  <div class="toAndFrom">
    <stop-place msg="Fra" v-on:select-place="fromId =  $event"/>
    <stop-place msg="Til" v-on:select-place="toId = $event"/>
    <div v-if="fromId && toId">
      <trip :fid="fromId" :tid="toId" :now="getNowDate()"/>
    </div>
  </div>
</template>

<script>
import StopPlace from "./StopPlace";
import Trip from "./Trip";

export default {
  name: "getToAndFrom",
  components: {
    StopPlace,
    Trip
  },
  data() {
    return {
      fromId: null,
      toId: null,
    }
  },
  methods: {
    getNowDate(){
      let x = new Date();
      return x.toISOString();
    }
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
</style>
