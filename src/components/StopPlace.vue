<template>
  <div class="stopPlace">
    <span>{{ msg }}</span>
    <input type="text" v-model="input" />
        <button v-on:click="loadPlaces()">sok</button>
        <section v-if="resultData">
          <ul v-if="resultData.stopPlace.length">
            <li v-for="place in resultData.stopPlace"
              @click="$emit('select-place', place.id);"
              class="place"
              :key="place.id"
            >
              {{ place.name.value }}
              <br />
            </li>
          </ul>
          <div v-else>no results</div>
        </section>
      
    
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
      input: "frogn",
      current: null,
      resultData: null
    };
  },
  methods: {
    loadPlaces(){
      this.$apollo.query({
                    query: getStopPlace,
                    variables: {
                        query: this.input
                    }
                })
                .then(response => {
                    this.resultData = response.data;
                });
    }
  }
  
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
.current {
  background-color: red;
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
