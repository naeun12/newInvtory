<!-- @format -->

<template>
  <Transition name="premium-fade">
    <div
      v-if="isDeleteData"
      class="premium-modal-overlay"
      @click.self="handleClose">
      <div class="premium-modal-dialog">
        <div class="premium-modal-content">
          <!-- Glow Effect Behind Modal -->
          <div class="premium-glow"></div>

          <!-- Header -->
          <div class="premium-modal-header">
            <div class="header-title-wrapper">
              <div class="warning-icon-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <path
                    d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h5 class="premium-modal-title">Delete Permanent Data</h5>
            </div>
            <button
              type="button"
              class="premium-btn-close"
              @click="handleClose"
              aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="premium-modal-body">
            <p class="main-text">
              Are you absolutely sure you want to delete this data?
            </p>
            <p class="sub-text">
              This action is irreversible and will permanently remove all
              associated records from our servers.
            </p>
          </div>

          <!-- Footer -->
          <div class="premium-modal-footer">
            <button
              type="button"
              class="btn-premium-secondary"
              @click="handleClose">
              Cancel
            </button>
            <button
              class="btn-premium-danger"
              @click="btnDeleteData()"
              :disabled="Loading">
              <ButtonLoading :Loading="Loading" />
              <span>{{
                Loading ? "Confirm Delete..." : "Confirm Delete"
              }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <SuccessToast
    :ShowToast="ShowToast"
    :Message="Message"
    @close="handleToastClose" />
</template>

<script>
import axios from "axios";
import SuccessToast from "@/views/Components/Toasters/SuccessToast.vue";
import ErrorToast from "@/views/Components/Toasters/ErrorToast.vue";
import ButtonLoading from "@/views/Components/Loaders/ButtonLoading.vue";
export default {
  props: {
    DataID: Number,
    isDeleteData: Boolean,
    url: String,
  },
  components: {
    SuccessToast,
    ErrorToast,
    ButtonLoading,
  },
  data() {
    return {
      ShowToast: false,
      Message: "",
      Loading: false,
    };
  },
  emits: ["close"],
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleToastClose() {
      this.ShowToast = false;
    },
    async btnDeleteData() {
      this.Loading = true;

      const response = await axios.delete(`${this.url}/${this.DataID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      this.ShowToast = true;
      this.Message = response.data.message;
      this.$emit("close");
      this.Loading = false;
    },
  },
};
</script>
<style src="../../assets/stylesheets/DeleteModal.css"></style>
