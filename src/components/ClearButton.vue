<template>
  <button class="clear__button" @click="clear">{{ message }}</button>
</template>

<script>
export default {
  name: "search",
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
