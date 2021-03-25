<template>
  <div class="Trips">
    <div v-if="resultData">
      <ul class="trips-list" v-if="resultData && resultData.trip && resultData.trip.tripPatterns.length">
        <li
          v-for="(tripPattern, i) in resultData.trip.tripPatterns"
          class="trip"
          :key="i"
        >
          <trip :tripPattern="tripPattern" />
        </li>
      </ul>
      <div v-else>entur returned nothing</div>
    </div>
    <div class="loader" v-else>loading...</div>
  </div>
</template>

<script language="ts">
import { trip } from "../queries/Trip.gql";
import Trip from "./Trip";

export default {
  name: "Trips",
  props: ["fid", "tid", "now"],
  components: {
    Trip
  },
  data() {
    return {
      resultData: null,
      fromQuery: null,
      toQuery: null
    };
  },
  apollo: {
    $client: "clientJourneyPlanner"
  },
  methods: {
    Search() {
      this.resultData = null;
      this.CreateQuery();
      this.SearchWithQuery();
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
<style lang="scss" scoped>

@import '../scss/main.scss';

.Trips{
  margin-top: 100px;;
}

.trips-list{
  flex-direction: row;
}
ul {
  list-style-type: none;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 5px;
  display: flex;
  align-items: center;
}
li {
  margin: 5px auto;
  display: block;
}




</style>
