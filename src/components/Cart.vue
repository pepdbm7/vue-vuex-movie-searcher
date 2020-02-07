<template>
  <div class="cart">
    <h2 class="cart__title">Find here the movies you are interested about</h2>
    <clear-button v-if="cartmovies.length" :whatToClear="'cart'" />
    <div class="movies__container">
      <p class="error__message" v-if="!isloading && error">{{ error }}</p>
      <spinner v-if="isloading" />
      <div class="movie" v-for="movie in cartmovies" :key="movie.id">
        <img
          class="movie__image"
          :src="
            movie.poster_path
              ? 'http://image.tmdb.org/t/p/w185' + movie.poster_path
              : 'https://i.picsum.photos/id/103/300/400.jpg'
          "
          alt="movie"
        />
        <h3 class="movie__title">{{ movie.title }}</h3>
        <p>{{ movie.popularity }} views</p>
        <p class="movie__more" @click="showDetails(movie)">Read more...</p>

        <i
          class="lni-cart movie_icon"
          @click="removeFromCart(movie.id)"
          v-bind:class="isInCart(movie.id)"
        />
      </div>
    </div>
    <!-- details dialog: -->
    <details-movie />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "cart",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      error: "getError",
      isloading: "getLoading",
      cartmovies: "getCartMovies"
    })
  },
  methods: {
    showDetails(movie) {
      this.$store.dispatch("setMovieDetails", movie);
    },
    removeFromCart(id) {
      this.$store.dispatch("removeFromCart", id);
    },
    isInCart(id) {
      const inCart = this.cartmovies.findIndex(movie => movie.id === id) > -1;
      return inCart ? "in__cart" : "not__in__cart ";
    }
  }
};
</script>
