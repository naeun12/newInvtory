<!-- @format -->

<template>
  <span
    v-if="Loading"
    class="spinner-border spinner-border-sm me-2"
    role="status"
    aria-hidden="true"></span>
</template>

<script>
export default {
  props: {
    Loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
