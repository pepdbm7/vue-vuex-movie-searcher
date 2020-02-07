<template>
  <div id="home" class="home">
    <search />
    <movies v-if="query && movies.length" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "home",
  computed: {
    ...mapGetters({
      query: "getCurrentSearch",
      movies: "getMovies"
    })
  }
};
</script>
