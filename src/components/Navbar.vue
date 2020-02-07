<template>
  <nav class="navbar">
    <div class="navbar__content">
      <router-link to="/" tag="h1" class="title">Movies Vue</router-link>

      <router-link to="/cart" tag="span" class="navbar__cart">
        <i class="lni-cart"
      /></router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  methods: {
    goToCart() {
      //onclick on carousel image:
      this.$router.push("/cart");
    }
  }
};
</script>
