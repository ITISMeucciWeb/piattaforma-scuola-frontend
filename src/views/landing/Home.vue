<template>
  <v-container class="fill-height" fluid>
    <v-row class="text-center" align="center" justify="center">

      <v-col class="mb-4">
        <h1 class="display-4 font-weight-bold mb-15 ">{{schoolName}}</h1>
        <v-btn
            @click="login"
            color="accent"
            elevation="9"
            raised
            x-large
        ><v-icon>mdi-lock</v-icon>AUTENTICAZIONE</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    async login() {
      const authCode = await this.$gAuth.getAuthCode();
      console.log(authCode)
      //TODO: pass the token to the server to get the user data and auth the user
    }
  },
  data: ()=>{
    return {
      schoolName: process.env.VUE_APP_SCHOOL_NAME
    }
  }
}
</script>

<style scoped>

</style>
