import { defineStore } from "pinia";

export const useUserStore = defineStore( {
  id: "user",
  state: () => ({ authState: "NotLogged", user: null}),
  actions:{
    logout(){
      localStorage.clear();
      this.authState = "NotLogged";
      useMainStore().debug = false;
      this.user = null;
    }
  }
});

export const useMainStore = defineStore({
  id: "main",
  state: () => ({
    debug: false
  }),
  actions: {
    toggleDebug() {
      this.debug = !this.debug;
    }
  }
})
