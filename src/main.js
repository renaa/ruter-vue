import Vue from 'vue'
import App from './App.vue'

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
const client = new ApolloClient({
  uri: "https://api.entur.io/stop-places/v1/graphql"
});

const apolloProvider = new VueApollo({
  defaultClient: client
});

Vue.use(VueApollo);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
 apolloProvider,
}).$mount('#app')
