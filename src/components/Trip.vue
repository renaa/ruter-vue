<template>
  <div class="hello">
   {{fid}}
   🚌🚌🚌🚌
   {{tid}}
   {{now}}
  </div>
</template>

<script>
import {  getTrip } from "../queries.js";
import clientJourneyPlanner from "../main.js"

export default {
  props: [
    'fid',
    'tid',
    'now'
    ],
  name: 'Trip',
  apollo: {
    
  },
  data() {
    return {
      input: getTrip,
      resultData: null
    }
  },
  created: function() {
      console.log(this.$apollo)
      this.$apollo.query({
                    query: getTrip,
                    client: clientJourneyPlanner
                })
                .then(response => {
                    this.resultData = response.data;
                });
    
  },
}
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
.place {
  background-color: #42b983;
  color: white;
  padding: 5px;
  border-radius: 5px;
}
</style>
