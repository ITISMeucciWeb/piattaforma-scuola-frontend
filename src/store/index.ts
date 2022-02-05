import { defineStore } from "pinia";

export const useUserStore = defineStore( {
  id: "user",
  state: () => ({ authState: "NotLogged", user: null}),
  actions:{
    logout(){
      localStorage.clear();
      this.authState = "NotLogged";
      this.user = null;
    }
  }
});
