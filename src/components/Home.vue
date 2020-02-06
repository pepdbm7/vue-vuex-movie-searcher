<template>
  <div id="home" class="home">
    <search />
    <div class="movies__container">
      <p class="error__message" v-if="!isloading && error">{{ error }}</p>
      <spinner v-if="isloading" />
      <div class="movie" v-for="movie in movies" :key="movie.id" @click="showDetails(movie)">
        <img
          class="movie__image"
          :src="movie.poster_path ? 'http://image.tmdb.org/t/p/w185' + movie.poster_path : null"
          alt="movie"
        />
        <h3 class="movie__title">{{ movie.title }}</h3>
        <p>{{movie.popularity}} views</p>
      </div>

      <!-- details dialog: -->
      <div class="background__movie__detail" v-if="movieDetails.id">
        <div class="dialog__movie__detail">
          <button class="close__button" @click="closeDetails()">X</button>
          <img
            class="movie__details__image"
            :src="movieDetails.poster_path ? 'http://image.tmdb.org/t/p/w185' + movieDetails.poster_path : null"
            alt="movie"
          />
          <h3 class="movie__title">{{ movieDetails.title }}</h3>
          <p>{{movieDetails.popularity}} views</p>
          <p>{{movieDetails.overview}}</p>
          <p>User Score: {{movieDetails.vote_average}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    showDetails(movie) {
      this.$store.dispatch("setMovieDetails", movie);
    },
    closeDetails() {
      this.$store.dispatch("clearDetails");
    }
  },
  computed: {
    ...mapGetters({
      movies: "getMovies",
      error: "getError",
      isloading: "getLoading",
      movieDetails: "getDetailsMovie"
    })
  }
};
</script>
