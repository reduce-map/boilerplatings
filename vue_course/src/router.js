import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"
import About from "./views/About.vue"
import Main from "./views/Main.vue"
import Users from "./views/Users.vue"
import HomeTask1 from "./views/HomeTask1.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/homeTask1",
      name: "ht1",
      component: HomeTask1
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
