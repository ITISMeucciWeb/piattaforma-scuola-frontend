<template>
  <v-app>
    <div id="background"  class="background"/>
    <div id="background-overlay" class="background"/>
    <v-app-bar elevation="0" class="transparent">
      <v-spacer/>
      <v-toolbar-items>
        <v-btn v-for="item in items" v-bind:key="item.text" :to="item.to" plain>
          <v-icon>{{item.icon}}</v-icon>
          {{item.text}}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main class="fill-height flex">
      <router-view/>
    </v-main>
  </v-app>
</template>

<style scoped>
#background{
  background-image: url('~@/assets/background.jpg');
  background-size: cover;
  background-position: center;
}
#background-overlay{
  background-color: rgba(0,0,0,0.6);
}
.background{
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  data: ()=>{
    return {
      items: [
        {
          text: 'Home',
          icon: 'mdi-home',
          to: '/landing/home'
        },
        {
          text: 'Autori',
          icon: 'mdi-account-group',
          to: '/landing/authors'
        },
        {
          text: 'Privacy policy',
          icon: 'mdi-cookie',
          to: '/landing/privacy'
        }
      ]
    }
  }
});
</script>
