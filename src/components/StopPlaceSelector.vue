<script>
import { StopPlace } from "../queries/StopPlace.gql";
import { LMap, LTileLayer } from "vue2-leaflet";
import L from "leaflet";

export default {
  props: ["msg", "inputQuery"],
  name: "getToAndFrom",
  created() {
    this.input = this.inputQuery;
    this.loadPlaces();
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
    };
  },
  components: {
    LMap,
    LTileLayer,
  },
  methods: {
    setInputFocus(event) {
      if (event.composedPath()[0].localName !== "button") {
        this.$refs.input.focus();
        // this.$nextTick(()=> {this.$refs.input.focus()})
      }
    },
    clickOnStopPlace(i, id, place) {
      console.log(place);
      this.current = i;
      this.$emit("select-place", id);
      this.markerLatLng = [0, 0];
      this.input = place.name.value;
    },
    inputBlurHandler() {
      setTimeout(() => {
        this.inputFocused = false;
      }, 200);
    },
    getLocation() {
      if (navigator.geolocation) {
        this.current = null;
        navigator.geolocation.getCurrentPosition((position) => {
          let geo = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.$emit("select-place", geo);
          this.markerLatLng = geo;
        });
      }
    },

    // query
    loadPlaces() {
      this.current = null;
      this.loadStopPlaces();
    },
    loadStopPlaces() {
      this.$apollo
        .query({
          query: StopPlace,
          variables: {
            query: this.input,
          },
        })
        .then((response) => {
          this.stopData = response.data;
        });
    },

    // map
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
    setMarker(event) {
      this.current = null;
      this.markerLatLng = event.latlng;
      this.$emit("map-place", this.markerLatLng);
    },
  },
};
</script>

<template>
  <div class="stopPlaceSelector">
    <div class="input-with-dropdown" @mouseup="setInputFocus">
      <div class="input-box" :class="{ 'input-area-focused': inputFocused }">
        <label>{{ msg }} </label>
        <input
          ref="input"
          v-on:keyup="loadPlaces()"
          v-model="input"
          @focus="inputFocused = true"
          @blur="inputBlurHandler()"
        />
        <button title="bruk geolokasjon" @click="getLocation()">🎯</button>
        <button @click="hidemap = !hidemap">🌍</button>
      </div>
      <div class="suggestions" :class="{ 'suggestions-focused': inputFocused }">
        <ul v-if="stopData && stopData.stopPlace.length">
          <li
            v-for="(place, i) in stopData.stopPlace"
            @click="clickOnStopPlace(i, place.id, place)"
            :key="place.id"
            :class="{ current: i == current }"
            class="place"
          >
            <p class="placeName">{{ place.name.value }}</p>
            <p class="topologicalPlace">
              {{ place.topographicPlace.name.value }}
            </p>
          </li>
        </ul>
        <div v-else>no result from stop place query</div>
      </div>
    </div>

    <div v-if="!hidemap" class="map" style="height: 500px">
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
</template>

<style lang="scss" scoped>
@import "../scss/main.scss";
$border-color: #c8c8c8;
.stopPlaceSelector {
  width: 100%;
}

.input-with-dropdown {
  .input-box {
    border: 1px solid $border-color;

    box-sizing: border-box;
    cursor: text;
    &.input-area-focused {
      box-shadow: inset 0 0 0 2px #59c5fc;
      border-color: $border-color;
    }
    // box-shadow: inset 0 0 0 1px gray;
    padding: 20px;
    display: flex;
    justify-content: space-between;

    label {
      align-self: center;
      font-weight: 200;
    }
    input {
      font-size: 18px;
      flex-grow: 1;
      margin-left: 50px;
      border: none;
      outline: none;
      background: transparent;
    }
    button {
      font-size: 2em;
      padding: 5px;
      margin: 5px;
    }
  }

  .suggestions {
    box-sizing: border-box;

    width: 100%;
    display: none;
    z-index: 99;
    &.suggestions-focused {
      display: block;
    }
    ul {
      border-bottom: 1px solid $border-color;
      display: flex;
      flex-direction: column;
      padding: 10px 0 0;
      margin: 0;
    }
    li,
    .place {
      box-sizing: border-box;
      list-style: none;
      text-align: start;
      margin: 0;
      width: 100%;
      background: white;
      padding: 5px 5px 3px;
      border-top: 1px solid $border-color;
      border-left: 1px solid $border-color;
      border-right: 1px solid $border-color;
    }
    p {
      margin: 0;
    }
    .topologicalPlace{
      font-size: 0.85rem;
      color: #767676;
    }
    .current {
      box-shadow: inset 0 0 0 2px #59c5fc;
    }
  }
}
.map {
  border: 1px solid $border-color;
  margin-top: 10px;
  box-shadow: inset 0 0 0 2px #59c5fc;
}
.lmap {
  height: 1000vh;
  display: block;

}
</style>
