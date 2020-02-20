import Vue from 'vue'
import App from './App.vue'

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";


const clientStopPlace = new ApolloClient({
  uri: "https://api.entur.io/stop-places/v1/graphql"
});

export const clientJourneyPlanner = new ApolloClient({
  uri: "https://api.entur.io/journey-planner/v2/graphql"
});


import VueRouter from 'vue-router'
Vue.use(VueRouter)


const apolloProvider = new VueApollo({
  clients: {
    clientStopPlace,
    clientJourneyPlanner
  },
  defaultClient: clientStopPlace
});

Vue.use(VueApollo);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
 apolloProvider,
}).$mount('#app')
