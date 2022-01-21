import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaPlugin } from "pinia";
import VueCompositionAPI from "@vue/composition-api";
import { createProvider } from "./vue-apollo";

Vue.use(VueCompositionAPI);


Vue.use(PiniaPlugin);
const pinia = createPinia();

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  pinia,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount("#app");
