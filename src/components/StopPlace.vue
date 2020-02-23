<template>
  <div class="stopPlace">
    <span>{{ msg }}</span>
    <input v-on:keyup="loadPlaces()" v-model="input" />
    <section v-if="resultData">
      <ul v-if="resultData.stopPlace.length">
        <li
          v-for="(place, i) in resultData.stopPlace"
          @click="
            $emit('select-place', place.id);
            current = i;
          "
          class="place"
          :class="{ current: i == current }"
          :key="place.id"
        >
          <abbr :title="place.topographicPlace.name.value">{{
            place.name.value
          }}</abbr>
          <br />
        </li>
      </ul>
      <div v-else>no results</div>
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
      resultData: null
    };
  },
  methods: {
    loadPlaces() {
      this.current = null;
      this.$apollo
        .query({
          query: StopPlace,
          variables: {
            query: this.input
          }
        })
        .then(response => {
          this.resultData = response.data;
        });
    }
  },
  created() {
    this.input = this.inputQuery
    this.loadPlaces()
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

.stopPlace {
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
