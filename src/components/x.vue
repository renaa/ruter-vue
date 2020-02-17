<template>
  <div class="hello">
    <input type="text" v-model="input">
    <button v-on:click="button_handler">search</button>
    <ApolloQuery :query="query">
    <template slot-scope="{ result: { loading, error, data } }">
        <span v-if="loading">Loading...</span>
      <span v-else-if="error">An error occured</span>
      <section v-if="data">
          <ul v-if="data.topographicPlace.length">
            <li :key="place.id" v-for="place in data.topographicPlace" >
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
import { GET_FROGNS } from "../queries.js";

export default {
  name: 'x',
  data() {
    return {
      query: GET_FROGNS,
      input: "dfd"
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
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
