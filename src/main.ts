import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaPlugin } from "pinia";
import VueCompositionAPI from "@vue/composition-api";
import { createProvider } from "./vue-apollo";
import GAuth from "vue-google-oauth2";

Vue.use(VueCompositionAPI);

Vue.use(PiniaPlugin);
const pinia = createPinia();

Vue.use(GAuth, {
  clientId: '648352918255-9oogitha6t9nkm1ej375hl6hdl0aa66t.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
})

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  pinia,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
