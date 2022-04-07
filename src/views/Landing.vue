<template>
  <v-app>
    <div id="background" class="background"/>
    <div id="background-overlay" class="background"/>
    <v-app-bar class="transparent" elevation="0">
      <v-spacer/>
      <v-toolbar-items>
        <v-btn v-for="(item, index) in items" v-bind:key="index" :to="item.to" plain>
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main class="fill-height flex">
      <transition @enter="enterBottomAnim" @leave="leaveBottomAnim" v-on:after-enter="afterEnterBottomAnim">
        <router-view/>
      </transition>
    </v-main>
  </v-app>
</template>

<style scoped>
#background {
  background-image: url("../assets/background.jpg");
  background-size: cover;
  background-position: center;
}

#background-overlay {
  background-color: rgba(0, 0, 0, 60%);
  position: fixed;
}

.background {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>

<script lang="ts">
import Vue from "vue";
import gsap from "gsap";
import {Power4} from "gsap/gsap-core";

export default class Landing extends Vue {
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

  leaveBottomAnim(el, done) {
    //overflow fix
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";

    gsap.to(el, {
      ease: Power4.easeOut,
      scale: 0,
      yPercent: 50,
      duration: .3,
      onComplete: done,
    })

  }

  enterBottomAnim(el, done) {
    gsap.to(el, {
      duration: .3,
      yPercent: 50,
      onComplete: done,
      ease: Power4.easeIn,
      scale: 0,
    })
  }

  afterEnterBottomAnim(el) {
    gsap.to(el, {
      duration: .4,
      yPercent: 0,
      onComplete: () => {
        //overflow fix
        document.getElementsByTagName("body")[0].style.overflowY = "auto";
      },
      ease: Power4.easeIn,
      scale: 1
    })
  }
}
</script>
