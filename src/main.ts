import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaPlugin } from "pinia";
import VueCompositionAPI from "@vue/composition-api";
import { createProvider } from "./vue-apollo";
import VuePageTransition from 'vue-page-transition'


Vue.use(VueCompositionAPI);

Vue.use(VuePageTransition)

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
