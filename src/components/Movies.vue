<template>
  <div class="home">
    <!-- pagination: -->

    <button
      v-if="query.length && movies.length && !isSorted"
      class="btn sort__button"
      @click="sort"
    >
      Sort by Genre
    </button>
    <p class="error__message">{{ error }}</p>
    <div class="movies__container">
      <pagination />
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
        <p class="movie__text"><span>Genre: </span> {{ movie.genre_ids }}</p>
        <p class="movie__more" @click="showDetails(movie)">Read more...</p>
        <i
          class="lni-cart movie_icon"
          @click="addToCart(movie)"
          v-bind:class="isInCart(movie.id)"
        />
      </div>
      <pagination />

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
  computed: {
    ...mapGetters({
      movies: "getMovies",
      error: "getError",
      isloading: "getLoading",
      cartmovies: "getCartMovies",
      currentPage: "getPagination",
      query: "getCurrentSearch",
      isSorted: "getIsSorted"
    })
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

      return inCart ? "in__cart" : "not__in__cart ";
    },
    sort() {
      const searchParams = {
        query: this.query,
        requestPage: this.currentPage,
        sortedByGenre: true
      };
      this.$store.dispatch("searchMovies", searchParams);
    }
  }
};
</script>
