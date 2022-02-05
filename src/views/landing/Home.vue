<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" class="text-center" justify="center">

      <v-col class="mb-4">
        <h1 class="display-4 font-weight-bold mb-15 ">{{ schoolName }}</h1>
        <v-btn
            id="login-button"
            :class="{'disable-events': this.userStore.$state.authState !== 'NotLogged'}"
            :color="this.userStore.$state.authState === 'Logged' ? 'success' : 'accent'"
            :loading="this.userStore.$state.authState === 'Logging'"
            elevation="9"
            min-width="15rem"
            raised
            tabindex="-1"
            x-large
            @click="login"
        >
          <v-icon>{{ this.userStore.$state.authState === "Logged" ? "mdi-check" : "mdi-lock" }}</v-icon>
          {{ this.userStore.$state.authState === "Logged" ? "AUTENTICATO" : "AUTENTICAZIONE" }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {useUserStore} from "@/store";
import {parseJWT} from "@/utils";

export default {
  name: "Home - Landing",
  setup() {
    const userStore = useUserStore();

    return {
      userStore
    }
  },
  methods: {
    async login() {
      this.userStore.$state.authState = "Logging";
      const authWindow = window.open("https://api.localhost/google", "gAuth", "width=568,height=560");
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (authWindow.closed) {
            clearInterval(interval)
            resolve(0);
          }
        }, 100);
      })
      this.userStore.$state.user = parseJWT(localStorage.getItem("token"));
      this.userStore.$state.authState = "Logged";
      this.$router.push("/board");
    }
  },
  data: () => {
    return {
      schoolName: process.env.VUE_APP_SCHOOL_NAME,
      loginColor: "accent",
      loginDisabled: false,
      isLoading: false,
    }
  }
}
</script>

<style scoped>
.disable-events {
  pointer-events: none;
}

#login-button {
  transition: background-color .7s;
}
</style>
