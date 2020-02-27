<template>
  <div class="hello">
    <!-- @mouseenter="$log" -->
    <!-- Fra: {{ fid }} Til: {{ tid }} Kl: {{ getTime(now) }} -->

    <section v-if="resultData">
      <ul v-if="resultData && resultData.trip">
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
    <section v-else>loading</section>
  </div>
</template>

<script language="ts">
import { trip } from "../queries/Trip.gql";
import TripPattern from "./TripPattern";

export default {
  name: "Trips",
  props: ["fid", "tid", "now"],
  components: {
    TripPattern
  },
  data() {
    return {
      resultData: null,
      querying: false,
      fromQuery: null,
      toQuery: null
    };
  },
  apollo: {
    $client: "clientJourneyPlanner"
  },
  methods: {
    Search() {
      this.querying = true;
      this.resultData = null;
      this.CreateQuery();
      this.SearchWithQuery();
      this.querying = false;
    },
    CreateQuery(){
      console.log(typeof this.fid)
      if (typeof this.fid == "string"){
        this.fromQuery = { place: this.fid }
      }
      else if(typeof this.fid == "object"){
        this.fromQuery = {
          "coordinates" : {
            "latitude": this.fid.lat,
            "longitude": this.fid.lng
          }
        }
      }
      if (typeof this.tid == "string"){
        this.toQuery = { place: this.tid }
      }
      else if(typeof this.tid == "object"){
        this.toQuery = {
          "coordinates" : {
            "latitude": this.tid.lat,
            "longitude": this.tid.lng
          }
        }
      }
    },
    SearchWithQuery() {
      this.$apollo
        .query({
          query: trip,
          variables: {
            from: this.fromQuery,
            to: this.toQuery,
            nowDate: this.now.toString()
          }
        })
        .then(response => {
          this.resultData = response.data;
        });
    },
    getTime(iso) {
      return iso.substring(11, 19); //HH:MM:SS
    }
  },
  created: function() {
    this.Search();
  },
  watch: {
    fid: function() {
      this.Search();
    },
    tid: function() {
      this.Search();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: #42b983;
  color: white;
  padding: 5px;
  border-radius: 5px;
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
</style>
