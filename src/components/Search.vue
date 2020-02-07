<template>
  <form class="search">
    <label>Search movie:</label>
    <input type="text" v-model="search" autofocus placeholder="Write here..." />

    <clear-button :whatToClear="'search'" />
  </form>
</template>

<script>
export default {
  name: "search",
  data() {
    return {};
  },
  computed: {
    //setting and getting on input change:
    search: {
      get: function() {
        return this.$store.state.search;
      },
      set: function(newSearch) {
        const searchParams = { query: newSearch, requestPage: 1 };
        this.$store.dispatch("setSearch", newSearch);
        if (newSearch.trim().length)
          this.$store.dispatch("searchMovies", searchParams);
      }
    }
  }
};
</script>
