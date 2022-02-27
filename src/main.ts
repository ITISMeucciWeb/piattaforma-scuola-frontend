import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaPlugin } from "pinia";
import VueCompositionAPI from "@vue/composition-api";
import VuePageTransition from 'vue-page-transition'
import {apolloProvider} from "@/vue-apollo";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueCompositionAPI);

Vue.use(VueSweetalert2);

Vue.use(VuePageTransition)

Vue.use(PiniaPlugin);
const pinia = createPinia();

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  pinia,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
