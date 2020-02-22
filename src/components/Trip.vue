<template>
  <div class="hello">
    <!-- @mouseenter="$log" -->

    Fra: {{ fid }} Til: {{ tid }} Kl: {{ getTime(now) }}
    <button @click="Search()">Finn tur</button>
    <section v-if="resultData">
      <ul v-if="resultData.trip">
        <li
          v-for="(tripPattern, i) in resultData.trip.tripPatterns"
          class="trip"
          :key="i"
        >
          <trip-pattern :tripPattern="tripPattern" />
        </li>
      </ul>
      <div v-else>no results</div>
    </section>
    <section v-else-if="querying">
      loading
    </section>
  </div>
</template>

<script language="ts">
import { trip } from "../queries/Trip.gql";
import TripPattern from "./TripPattern";

export default {
  props: ["fid", "tid", "now"],
  name: "Trip",
  components: {
    TripPattern
  },
  data() {
    return {
      resultData: null,
      querying: false
    };
  },
  apollo: {
    $client: "clientJourneyPlanner"
  },
  methods: {
    getTime(iso) {
      return iso.substring(11, 19);
    },
    Search() {
      console.log(this.now);
      this.querying = true;
      this.resulData = null;
      this.$apollo
        .query({
          query: trip,
          variables: {
            from: { place: this.fid },
            to: { place: this.tid },
            nowDate: this.now.toString()
          }
        })
        .then(response => {
          this.resultData = response.data;
          this.querying = false;
        });
    }
  },
  created: function() {
    this.Search();
  }
};
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
.leg {
  text-align: left;
}
</style>
