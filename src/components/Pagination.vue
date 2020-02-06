<template>
  <div class="pagination">
    <button :disabled="disabledPrev()" @click="prevPage()">
      &laquo; Previous
    </button>
    <div>{{ pagination.currentPage }} / {{ pagination.totalPages }}</div>
    <button :disabled="disabledNext()" @click="nextPage()">
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
      search: "getCurrentSearch",
      pagination: "getPagination"
    }),
    disabledPrev() {
      return this.pagination && this.pagination.currentPage === 1;
    },
    disabledNext() {
      return (
        this.pagination &&
        this.pagination.currentPage === this.pagination.totalPages
      );
    },
    prevPage() {
      const prevPage = this.pagination.currentPage - 1;
      const searchParams = { query: search, requestPage: prevPage };
      this.$store.dispatch("searchMovies", searchParams);
    },
    nexPage() {
      const nexPage = this.pagination.currentPage + 1;
      const searchParams = {
        query: search,
        requestPage: nexPage
      };
      this.$store.dispatch("searchMovies", searchParams);
    }
  }
};
</script>
