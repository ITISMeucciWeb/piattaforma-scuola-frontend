import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Landing from "@/views/Landing.vue";
import Home from "@/views/landing/Home.vue";
import AuthComplete from "@/views/authComplete.vue";

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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
