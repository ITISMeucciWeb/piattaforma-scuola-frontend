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

export default Vue.extend({
  name: "Piattaforma-"+ "import.meta.env.VUE_APP_SCHOOL_NAME".toLowerCase().replace(" ", "-"),
  setup() {
    const cookies = useCookies()
    return {
      cookies,
    }
  },
  components: {},
});
</script>

<style lang="scss">
html {
  overflow-y: auto !important;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
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

