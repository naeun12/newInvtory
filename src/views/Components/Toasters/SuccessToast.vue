<!-- @format -->

<template>
  <div
    v-if="ShowToast"
    class="toast-custom border-0 position-fixed bottom-0 end-0 m-4 p-3 d-flex align-items-center"
    role="alert"
    aria-live="assertive"
    aria-atomic="true">
    <!-- Optional: Aesthetic Success Icon -->
    <div
      class="toast-icon-wrapper me-3 d-flex align-items-center justify-content-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        class="bi bi-check-circle-fill"
        viewBox="0 0 16 16">
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
      </svg>
    </div>

    <!-- Content -->
    <div class="toast-content flex-grow-1">
      <span class="toast-title d-block fw-semibold mb-0.5">Success</span>
      <span class="toast-body-text">{{ Message }}</span>
    </div>

    <!-- Close Button -->
    <button
      @click="handleClose"
      type="button"
      class="btn-close btn-close-custom ms-3"
      aria-label="Close"></button>
  </div>
</template>
<script>
export default {
  props: {
    ShowToast: Boolean,
    Message: String,
  },
  emits: ["close"],
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>
<style src="../../../assets/stylesheets/SuccessToast.css"></style>
