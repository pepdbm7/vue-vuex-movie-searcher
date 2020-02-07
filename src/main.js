import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

//reusable components:
import Navbar from "./components/Navbar.vue";
import Search from "./components/Search.vue";
import MovieDetails from "./components/MovieDetails.vue";
import Movies from "./components/Movies.vue";
import Spinner from "./components/Spinner.vue";
import Footer from "./components/Footer.vue";
import ClearButton from "./components/ClearButton.vue";
import Pagination from "./components/Pagination.vue";

Vue.config.productionTip = false;

//making components accessible throughout the whole app:
Vue.component("navbar", Navbar);
Vue.component("search", Search);
Vue.component("movies", Movies);
Vue.component("details-movie", MovieDetails);
Vue.component("spinner", Spinner);
Vue.component("myfooter", Footer);
Vue.component("clear-button", ClearButton);
Vue.component("pagination", Pagination);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
