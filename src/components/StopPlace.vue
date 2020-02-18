<template>
  <div class="stopPlace">
    <span>{{ msg }}</span>
    <input type="text" v-model="input" />
    <ApolloQuery :query="query" :variables="{ query: input }">
      <template slot-scope="{ result: { loading, error, data } }">
        <span v-if="loading">Loading...</span>
        <span v-else-if="error">An error occured</span>
        <section v-if="data">
          <ul v-if="data.stopPlace.length">
            <li
              v-on:click="$emit('select-place', place.id)"
              class="place"
              :key="place.id"
              v-for="place in data.stopPlace"
            >
              {{ place.name.value }}
              <br />
            </li>
          </ul>
          <div v-else>no results</div>
        </section>
      </template>
    </ApolloQuery>
  </div>
</template>


<script>
import { getStopPlace } from "../queries.js";

export default {
  props: ["msg"],
  name: "getToAndFrom",
  data() {
    return {
      query: getStopPlace,
      input: "frogn"
    };
  },
};
</script>

<style scoped>
.stopPlace {
  margin: 50px 0;
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
span {
  margin-right: 10px;
}
</style>
