<template>
  <div id="home" class="home">
    <search />
    <div class="movies__container">
      <p class="error__message" v-if="!isloading && error">{{ error }}</p>
      <spinner v-if="isloading" />
      <div
        class="movie"
        v-for="{ poster_path, title, popularity, vote_average, id } in movies"
        :key="{ id }"
        @click="showDetails"
      >
        <img class="movie__image" :src="'http://image.tmdb.org/t/p/w185'+poster_path" alt="movie" />
        <h3 class="movie__title">{{ title }}</h3>
        <p>{{popularity}} views</p>
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
  methods: {},
  computed: {
    ...mapGetters({
      movies: "getMovies",
      error: "getError",
      isloading: "getLoading"
    })
  }
};
</script>
