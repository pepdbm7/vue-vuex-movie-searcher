import Vue from "vue";
import App from "./App.vue";
import store from "./store";

//components
import Navbar from "./components/Navbar.vue";
import Home from "./components/Home.vue";
import Search from "./components/Search.vue";
import MovieDetails from "./components/MovieDetails.vue";

Vue.config.productionTip = false;

//making components accessible throughout the whole app:
Vue.component("navbar", Navbar);
Vue.component("home", Home);
Vue.component("search", Search);
Vue.component("details-movie", MovieDetails);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
