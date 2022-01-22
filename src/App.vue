<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import {useCookies} from "@vueuse/integrations/useCookies";
import axios from "axios";
import {useUserStore} from "@/store";

export default Vue.extend({
  name: "App",
  setup() {
    const cookies = useCookies()
    return {
      cookies,
    }
  },
  async mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get("https://api.localhost/google/isAuthenticated", {
        validateStatus(status) {
          const userStore = useUserStore();

          if(status === 200){
            userStore.$patch({authState: "Logged"});
            return true;
          }
          localStorage.removeItem('token');
          userStore.$patch({authState: "NotLogged"});
          return true;
        }
      })
    }
  },
  components: {},
});
</script>

<style lang="scss">
html {;
  overflow-y: auto !important;
}

::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--v-other-base);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--v-accent2-base);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: var(--v-accent2-base);
}
</style>

