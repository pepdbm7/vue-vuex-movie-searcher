<template>
  <button class="btn clear__button" v-on:click.stop.prevent="clear">
    {{ message }}
  </button>
</template>

<script>
export default {
  name: "clear-button",
  props: ["whatToClear"],
  data() {
    return {};
  },
  methods: {
    clear() {
      if (this.whatToClear === "search") {
        this.$store.dispatch("clearSearch");
      } else if (this.whatToClear === "cart") {
        this.$store.dispatch("clearCart");
      }
    }
  },
  computed: {
    message() {
      if (this.whatToClear === "search") {
        return "Clear";
      } else if (this.whatToClear === "cart") {
        return "Empty Cart";
      }
    }
  }
};
</script>
