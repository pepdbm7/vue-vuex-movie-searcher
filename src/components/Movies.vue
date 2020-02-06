<template>
  <div class="home">
    <div class="movies__container">
      <p class="error__message" v-if="!isloading && error">{{ error }}</p>
      <spinner v-if="isloading" />
      <div class="movie" v-for="movie in movies" :key="movie.id">
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
        <p class="movie__text">{{ movie.popularity }} views</p>
        <p class="movie__more" @click="showDetails(movie)">Read more...</p>
        <i
          class="lni-cart"
          @click="addToCart(movie)"
          v-bind:class="isInCart(movie.id)"
        />
      </div>

      <!-- details dialog: -->
      <details-movie />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "cart",
  data() {
    return {};
  },
  methods: {
    showDetails(movie) {
      this.$store.dispatch("setMovieDetails", movie);
    },
    addToCart(movie) {
      this.$store.dispatch("addToCart", movie);
    },
    isInCart(id) {
      const inCart = this.cartmovies.findIndex(movie => movie.id === id) > -1;
      // console.log(inCart);
      return inCart ? "in__cart" : "not__in__cart ";
    }
  },
  computed: {
    ...mapGetters({
      movies: "getMovies",
      error: "getError",
      isloading: "getLoading",
      cartmovies: "getCartMovies"
    })
  }
};
</script>
