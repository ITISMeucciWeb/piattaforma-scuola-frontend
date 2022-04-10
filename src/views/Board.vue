<template>
  <v-app>
    <vue-matrix-raindrop v-if="mainStore.debug" :canvas-height="$refs.background.clientHeight"
                         :canvasWidth="$refs.background.clientWidth" :speed="10"
                         class="background"></vue-matrix-raindrop>
    <div v-else id="background" ref="background" class="background"/>
    <div id="background-overlay" class="background"/>
    <v-container fluid>
      <v-row class="mt-2" no-gutters>
        <v-col class="fill-height" cols="2">
          <v-card
              class="ml-4"
              elevation="12"
          >
            <v-navigation-drawer
                floating
                permanent
                width="100%"
            >

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h5 text-center">
                    {{ schoolName }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider/>

              <v-list
                  class="mb-1"
                  dense
              >
                <template v-for="item in items">
                  <v-list-item
                      v-if="item.to"
                      :key="item.text"
                      :to="item.to"
                      class="mx-3"
                      link
                  >
                    <v-list-item-icon>
                      <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-group v-if="item.items" :key="item.title" :prepend-icon="item.icon" class="mx-3">
                    <template v-slot:activator>
                      <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </template>
                    <v-list-item v-for="subItem in item.items" :key="subItem.text" :to="subItem.to" class="ml-3" link>
                      <v-list-item-icon>
                        <v-icon>{{ subItem.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{ subItem.text }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                  </v-list-group>
                </template>

              </v-list>
              <v-divider/>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img :src="userStore.user.avatar" class="rounded-circle" height="40" width="40"
                         @click="avatarClicked"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ userStore.user.name + ' ' + userStore.user.surname }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Ruolo {{ userStore.user.role }}
                  </v-list-item-subtitle>

                </v-list-item-content>
                <v-list-item-action @click="logout">
                  <v-icon>mdi-exit-to-app</v-icon>
                </v-list-item-action>
              </v-list-item>
            </v-navigation-drawer>
          </v-card>
        </v-col>
        <v-col class="fill-height" cols="10">
          <v-sheet class="fill-height flex mx-5">
            <v-toolbar class="mb-5" color="other" elevation="12" height="52">
              <v-toolbar-title>
                <v-icon class="mr-4">{{ currentRouteFromSelector.icon }}</v-icon>
                {{ currentRouteFromSelector.text }}
              </v-toolbar-title>
            </v-toolbar>
            <vue-page-transition name="fade-in-up">
              <router-view/>
            </vue-page-transition>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>


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
import {useMainStore, useUserStore} from "@/store";
// @ts-ignore
import VueMatrixRaindrop from 'vue-matrix-digit-rain'
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {
    VueMatrixRaindrop
  },
  computed: {
    currentRouteFromSelector() {
      const items = [];
      this.items.forEach((item) => {
        if (item.items) {
          item.items.forEach(subItem => items.push(subItem))
        } else {
          items.push(item);
        }
      })
      return items.find((item) => {
        return this.$route.path.startsWith(item.to)
      });
    }
  }
})
export default class Layout extends Vue {
  avatarClickedTimes = 0;
  clearAvatarClickedTimesTimeout = null;
  schoolName = import.meta.env.VUE_APP_SCHOOL_NAME;
  items = [
    {
      text: 'Dashboard',
      icon: 'mdi-view-dashboard',
      to: '/board/dashboard'
    },
    {
      text: 'Students',
      icon: 'mdi-google-classroom',
      to: '/board/students'
    },
    {
      text: 'Admin',
      icon: 'mdi-account-key',
      items: [
        {
          text: "Modelli",
          icon: 'mdi-file-document',
          to: '/board/models'
        },
        {
          text: "Utenti",
          icon: 'mdi-account-multiple',
          to: '/board/users'
        },
        {
          text: "Import",
          icon: 'mdi-file-import',
          to: '/board/import'
        }
      ]
    }
  ];

  userStore = useUserStore();
  mainStore = useMainStore();

  logout() {
    this.userStore.logout();
    this.$router.push('/')
  }

  avatarClicked() {
    this.avatarClickedTimes++;

    //Kill the actual timeout
    clearTimeout(this.clearAvatarClickedTimesTimeout)
    //Set avatarClickedTimes to 0 if not clicked again in 1000ms
    this.clearAvatarClickedTimesTimeout = setTimeout(() => {
      this.avatarClickedTimes = 0;
      this.clearAvatarClickedTimesTimeout = null;
    }, 1000)

    if (this.avatarClickedTimes > 5) {
      this.avatarClickedTimes = 0;
      this.mainStore.toggleDebug();
    }
  }
}
</script>
