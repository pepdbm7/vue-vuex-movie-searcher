<template>
  <form class="search">
    <label>Search movie:</label>
    <input type="text" v-model="search" autofocus placeholder="Write here..." />

    <clear-button v-if="search" :whatToClear="'search'" />
  </form>
</template>

<script>
export default {
  name: "search",
  data() {
    return {};
  },
  computed: {
    //setting and getting input directly to/from global state:
    search: {
      get: function() {
        return this.$store.state.search;
      },
      set: function(newSearch) {
        this.$store.dispatch("setSearch", newSearch);
        if (newSearch.trim().length)
          this.$store.dispatch("searchMovies", newSearch);
      }
    }
  }
};
</script>
