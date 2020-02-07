import Vue from "vue";
import Router from "vue-router";

//Components:
import Home from "@/components/Home";
import Cart from "@/components/Cart";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
