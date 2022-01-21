<template>
  <v-container class="fill-height" fluid>
    <v-row class="text-center" align="center" justify="center">

      <v-col class="mb-4">
        <h1 class="display-4 font-weight-bold mb-15 ">{{schoolName}}</h1>
        <v-btn
            id="login-button"
            min-width="15rem"
            @click="login"
            :color=loginColor
            :class="{'disable-events': loginDisabled}"
            tabindex="-1"
            elevation="9"
            :loading=isLoading
            raised
            x-large
        ><v-icon>{{loginIcon}}</v-icon>{{authText}}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    async login() {
      this.loginDisabled = true;
      this.isLoading = true;
      const authWindow = window.open("https://api.localhost/google", "gAuth", "width=300,height=200");
      await new Promise((resolve)=>{
        const interval = setInterval(()=>{
          if(authWindow.closed){
            clearInterval(interval)
            resolve();
          }
        }, 100);
      })
      this.loginColor = "success";
      this.loginIcon = "mdi-check";
      this.isLoading = false;
      this.authText = "AUTENTICATO";
    }
  },
  data: ()=>{
    return {
      schoolName: process.env.VUE_APP_SCHOOL_NAME,
      loginIcon: "mdi-lock",
      loginColor: "accent",
      loginDisabled: false,
      isLoading: false,
      authText: "AUTENTICAZIONE"
    }
  }
}
</script>

<style scoped>
.disable-events {
  pointer-events: none;
}
#login-button{
  transition: background-color .7s;
}
</style>
