import Vue from "vue";
import App from "./App.vue";

// vue-apollo //
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
const clientStopPlace = new ApolloClient({
  uri: "https://api.entur.io/stop-places/v1/graphql"
});
const clientJourneyPlanner = new ApolloClient({
  uri: "https://api.entur.io/journey-planner/v2/graphql"
});
const apolloProvider = new VueApollo({
  clients: { clientStopPlace, clientJourneyPlanner },
  defaultClient: clientStopPlace
});
Vue.use(VueApollo);

//vue-leaflet //
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  apolloProvider
}).$mount("#app");

