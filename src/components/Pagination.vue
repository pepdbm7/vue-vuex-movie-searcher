<template>
  <div class="pagination">
    <button :class="disabledPrev" @click="prevPage">
      &laquo; Previous
    </button>
    <div>{{ pagination.currentPage }} / {{ pagination.totalPages }}</div>
    <button :class="disabledNext" @click="nextPage">
      Next &raquo;
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "pagination",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      query: "getCurrentSearch",
      pagination: "getPagination"
    }),
    disabledPrev() {
      return this.pagination && this.pagination.currentPage === 1
        ? "btn disabled__button"
        : "btn";
    },
    disabledNext() {
      return this.pagination &&
        this.pagination.currentPage === this.pagination.totalPages
        ? "btn disabled__button"
        : "btn";
    }
  },
  methods: {
    prevPage() {
      const prevPage = this.pagination.currentPage - 1;
      const searchParams = { query: this.query, requestPage: prevPage };
      this.$store.dispatch("searchMovies", searchParams);
    },
    nextPage() {
      const nexPage = this.pagination.currentPage + 1;
      const searchParams = {
        query: this.query,
        requestPage: nexPage
      };
      this.$store.dispatch("searchMovies", searchParams);
    }
  }
};
</script>
