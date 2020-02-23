<template>
  <div class="stopPlaces">
    <span>{{ msg }}</span>
    <input v-on:keyup="loadPlaces()" v-model="input" />
    <section >
      <ul id="11" v-if="stopData.stopPlace.length">
        <li
          v-for="(place, i) in stopData.stopPlace"
          :key="place.id"
          @click="
            $emit('select-place', place.id);
            current = i;
          "
          class="place"
          :class="{ current: i == current }"
        >
          <abbr :title="place.topographicPlace.name.value">{{
            place.name.value
          }}</abbr>
          <br />
        </li>
      </ul>
      <div v-else>no result :(</div>
    </section>

    
    
  </div>
</template>

<script>
import { StopPlace } from "../queries/StopPlace.gql";

export default {
  props: ["msg", "inputQuery"],
  name: "getToAndFrom",
  data() {
    return {
      input: "",
      current: null,
      stopData: null,
    };
  },
  methods: {
    haveResults() {
      return (
        (this.stopData && this.stopData.stopPlace) 
        
      );
    },
    loadPlaces() {
      this.current = null;
      this.loadStopPlaces();
    },
    loadStopPlaces() {
      this.$apollo
        .query({
          query: StopPlace,
          variables: {
            query: this.input
          }
        })
        .then(response => {
          this.stopData = response.data;
        });
    },
    
  },
  created() {
    this.input = this.inputQuery;
    this.loadPlaces();
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
abbr {
  text-decoration: none;
}

.stopPlaces {
  margin: 50px 0;
}
.place {
  background-color: #42b983;
  color: white;
  padding: 5px;
  border-radius: 5px;
}

.current {
  background-color: #35495e;
}
</style>
