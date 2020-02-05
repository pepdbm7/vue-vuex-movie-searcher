<template>
  <form class="search">
    <label>Search movie: </label>
    <input type="text" v-model="search" autofocus placeholder="Write here..." />

    <button v-if="search" @click="clearSearch">Clear</button>
  </form>
</template>

<script>
export default {
  name: "search",
  data() {
    return {};
  },
  methods: {
    clearSearch() {
      this.search = "";
      this.$store.commit("clearSearch");
    }
  },
  computed: {
    //setting and getting input directly to/from global state:
    search: {
      get: function() {
        return this.$store.state.search;
      },
      set: function(newSearch) {
        this.$store.commit("setSearch", newSearch);
        if (newSearch.trim().length > 1)
          this.$store.dispatch("searchMovies", newSearch);
      }
    }
  }
};
</script>
