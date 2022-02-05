import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Landing from "@/views/Landing.vue";
import Home from "@/views/landing/Home.vue";
import Board from "@/views/Board.vue";
import AuthComplete from "@/views/authComplete.vue";
import {updateUserStatus} from "@/utils";
import {useUserStore} from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: ()=>{
      //TODO: check if user is logged in
      return '/landing'
    }
  },
  {
    path: "/authComplete",
    name: "AuthComplete",
    component: AuthComplete
  },
  {
    path: "/landing",
    name: "Home",
    redirect: "/landing/home",
    component: Landing,
    children: [
      {
        path: "home",
        component: Home,
        async beforeEnter(to, from, next){
          const userStore = useUserStore();
          await updateUserStatus();
          userStore.authState == "Logged" ? next("/board") : next();
        }
      },
      {
        path: "authors",
        component: () => import(/* webpackChunkName: "chunk-authors" */ "../views/landing/Authors.vue")
      },
      {
        path: "privacy",
        component: () => import(/* webpackChunkName: "chunk-privacy" */ "../views/landing/Privacy.vue")
      }
    ]
  },
  {
    path: "/board",
    name: "Board",
    redirect: "/board/dashboard",
    component: Board,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import(/* webpackChunkName: "chunk-dashboard" */ "../views/board/Dashboard.vue")
      },
      {
        path: "models",
        name: "Models",
        component: () => import(/* webpackChunkName: "chunk-modelli" */ "../views/board/Models.vue")
      }
    ],
    async beforeEnter(to, from ,next){
      const userStore = useUserStore();
      await updateUserStatus();
      userStore.authState == "Logged" ? next() : next("/");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
