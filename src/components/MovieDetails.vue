<template>
  <div class="background__movie__detail" v-if="movieDetails.id">
    <div class="dialog__movie__detail">
      <button class="btn close__button" @click="closeDetails()">X</button>
      <img
        class="movie__details__image"
        :src="
          movieDetails.poster_path
            ? 'http://image.tmdb.org/t/p/w185' + movieDetails.poster_path
            : 'https://i.picsum.photos/id/103/300/400.jpg'
        "
        alt="movie"
      />
      <h3 class="movie__title">{{ movieDetails.title }}</h3>
      <p>{{ movieDetails.popularity }} views</p>
      <p>{{ movieDetails.overview }}</p>
      <p>User Score: {{ movieDetails.vote_average }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "details-movie",
  data() {
    return {};
  },
  methods: {
    closeDetails() {
      this.$store.dispatch("clearDetails");
    }
  },
  computed: {
    ...mapGetters({
      movieDetails: "getDetailsMovie"
    })
  }
};
</script>
