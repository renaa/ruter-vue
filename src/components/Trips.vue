<template>
  <div class="hello">
    <input type="text" v-model="input">
    <ApolloQuery :query="query" :variables="{ query: input}" >
    <template slot-scope="{ result: { loading, error, data } }">
        <span v-if="loading">Loading...</span>
      <span v-else-if="error">An error occured</span>
      <section v-if="data">
          <ul v-if="data.stopPlace.length">
            <li v-on:click="button_handler" class="place" :key="place.id" v-for="place in data.stopPlace" >
              {{place.name.value}}
              <br>
            </li>
          </ul>
          <div v-else>no results</div>
      </section>
    </template>
  </ApolloQuery>
    
  </div>
</template>

<script>
import {  getTrips } from "../queries.js";

export default {
  name: 'x',
  data() {
    return {
      query: getTrips,
      input: "frø"
    }
  },
  methods: {
    button_handler(){
      console.log('button pressed')
    }
  }
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
