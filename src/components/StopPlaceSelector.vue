<script>
import { StopPlace } from "../queries/StopPlace.gql"
import { LMap, LTileLayer } from "vue2-leaflet"
import L from "leaflet"

export default {
  props: ["msg", "inputQuery"],
  name: "getToAndFrom",
  created() {
    this.input = this.inputQuery
    this.loadPlaces()
  },
  data() {
    return {
      input: "",
      inputFocused: false,
      current: null,
      stopData: null,

      //leaf
      hidemap: true,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 10,
      bounds: null,
      center: [59.87, 10.66],

      // leaf marker
      markerLatLng: [59.87, 10.66],
      icon: L.icon({
        iconUrl:
          "http://www.newdesignfile.com/postpic/2013/01/transparent-map-marker-clip-art_281326.png",
        iconSize: [18, 30],
        iconAnchor: [9, 30],
      }),
    }
  },
  components: {
    LMap,
    LTileLayer,
  },
  methods: {
    setInputFocus(event) {
      console.log(event.composedPath())
      if (event.composedPath()[0].localName !== "button") {
        this.$refs.input.focus()
      }
    },
    clickOnStopPlace(i, id) {
      this.current = i
      this.$emit("select-place", id)
      this.markerLatLng = [0, 0]
    },
    getLocation() {
      if (navigator.geolocation) {
        this.current = null
        navigator.geolocation.getCurrentPosition(position => {
          let geo = { lat: position.coords.latitude, lng: position.coords.longitude }
          this.$emit("select-place", geo)
          this.markerLatLng = geo
        })
      }
    },

    // query
    loadPlaces() {
      this.current = null
      this.loadStopPlaces()
    },
    loadStopPlaces() {
      this.$apollo
        .query({
          query: StopPlace,
          variables: {
            query: this.input,
          },
        })
        .then(response => {
          this.stopData = response.data
        })
    },

    // map
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    },
    setMarker(event) {
      this.current = null
      this.markerLatLng = event.latlng
      this.$emit("map-place", this.markerLatLng)
    },
  },
}
</script>

<template>
  <div class="stopPlaceSelector">
    <div class="input-area" @click="setInputFocus" :class="{ 'input-area-focused': inputFocused }">
      <div class="input-box">
        <label>{{ msg }} </label>
        <input
          ref="input"
          v-on:keyup="loadPlaces()"
          v-model="input"
          @focus="inputFocused = true"
          @blur="inputFocused = false"
        />
        <button title="bruk geolokasjon" @click="getLocation()">🎯</button>
        <button @click="hidemap = !hidemap">select on map</button>
      </div>
      <div class="suggestions" :class="{ 'suggestions-focused': inputFocused }">
        <ul v-if="stopData && stopData.stopPlace.length">
          <li
            v-for="(place, i) in stopData.stopPlace"
            :key="place.id"
            @click="clickOnStopPlace(i, place.id)"
            class="place"
            :class="{ current: i == current }"
          >
            <abbr :title="place.topographicPlace.name.value">{{ place.name.value }}</abbr>
            <br />
          </li>
        </ul>
        <div v-else>no result from stop place query</div>
      </div>
    </div>

    <div class="map">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../scss/main.scss";

.stopPlaceSelector {
  border: 1px solid gray;
  margin: 50px 0;
  @media (min-width: $breakpoint) {
    width: 50%;
  }
}

.input-area {
  border: 1px solid rgb(180, 180, 180);
  &.input-area-focused {
    border-color: #3d9159;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    color: unset;
  }
  position: relative;
}

.suggestions {
  position: absolute;
  left: 0;
  width: 100%;
  display: none;
  &.suggestions-focused {
    display: unset;
  }
  ul {
    display: flex;
    flex-direction: column;
  }
  li, .place {
    list-style: none;
    text-align: start;
    left:100px;
    padding: 5px;
    width: 100%;
    border-radius: 5px;
  }
  .current {
    background-color: #35495e;
  }
}

.lmap {
  height: 1000vh;
  display: block;
}
</style>
