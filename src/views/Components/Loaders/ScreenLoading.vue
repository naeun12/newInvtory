<!-- @format -->

<template>
  <div v-if="Loading" class="loader-container">
    <div class="spinner"></div>

    <p class="loader-text">
      {{ LoadingMessage || "Loading..." }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    Loading: {
      type: Boolean,
      default: false,
    },

    LoadingMessage: {
      type: String,
      default: "Loading...",
    },
  },
};
</script>

<style src="../../../assets/stylesheets/ScreenLoading.css"></style>
