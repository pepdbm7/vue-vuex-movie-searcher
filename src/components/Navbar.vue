<template>
  <nav class="navbar">
    <div class="navbar__content">
      <router-link to="/" tag="h1" class="title">Movies Vue</router-link>

      <router-link to="/cart" tag="div" class="navbar__cart">
        <i class="lni-cart" />
        <span v-if="cartmovies.length">{{
          cartmovies.length
        }}</span></router-link
      >
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "navbar",
  computed: {
    ...mapGetters({
      cartmovies: "getCartMovies"
    })
  },
  methods: {
    goToCart() {
      this.$router.push("/cart");
    }
  }
};
</script>
