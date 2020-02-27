<template>
  <div class="stopPlaces">
    <span>{{ msg }} </span>
    <input v-on:keyup="loadPlaces()" v-model="input" />
    <button @click="getLocation()">📍</button>
    <button @click="hidemap = !hidemap">toggleMap</button>
    <div v-if="!hidemap" style="height: 500px;">
      <l-map
        :zoom="zoom"
        :center="center"
        @click="setMarker"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="markerLatLng" :icon="icon"></l-marker>
      </l-map>
    </div>

    <section> 
      <ul v-if="stopData && stopData.stopPlace.length">
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
      <div v-else>no result from stop place query</div>
    </section>
  </div>
</template>

<script>
import { StopPlace } from "../queries/StopPlace.gql";
import { LMap, LTileLayer } from "vue2-leaflet";
import L from "leaflet";
export default {
  props: ["msg", "inputQuery"],
  name: "getToAndFrom",
  data() {
    return {
      //leaf
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 7,
      center: [59.87, 10.66],
      bounds: null,

      input: "",
      current: null,
      stopData: null,
      geo: "",
      markerLatLng: [59.87, 10.66],
      hidemap: true,

      icon: L.icon({
        iconUrl:
          "http://www.newdesignfile.com/postpic/2013/01/transparent-map-marker-clip-art_281326.png",
        iconSize: [18, 30],
        iconAnchor: [9, 30]
      })
    };
  },
  components: {
    LMap,
    LTileLayer
  },
  methods: {
    setMarker(event) {
      this.markerLatLng = event.latlng;
      this.$emit("map-place", this.markerLatLng);
    },
    haveResults() {
      return this.stopData && this.stopData.stopPlace;
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
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.geo = position.coords.latitude + "|" + position.coords.longitude;
        });
      }
    },
    showPosition(position) {
      console.log(position);
    },

    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    }
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
  /* position: relative; */
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
.lmap {
  height: 1000vh;
  display: block;
}
.stopPlaces {
  width: 50%;
}
</style>
