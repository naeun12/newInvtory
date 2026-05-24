<!-- @format -->
<template>
  <div
    v-if="isEditModal"
    class="modal fade show d-block premium-modal-wrapper"
    tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 premium-modal-card">
        <div
          class="modal-header border-bottom-0 pb-0 pt-4 px-4 d-flex align-items-center justify-content-between">
          <div>
            <h4 class="modal-title fw-bold premium-title">Edit Printer</h4>
            <p class="text-muted small mb-0">
              Fill in the information below to Edit a Printer to the stock.
            </p>
          </div>
          <button
            type="button"
            class="btn-close premium-close-btn"
            @click="handleClose"
            aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <div class="row g-4">
            <div class="col-md-6">
              <label class="form-label premium-label">OFFICE NAME</label>
              <input
                type="text"
                class="form-control premium-input"
                v-model="currentPrinter.officeName"
                required />
            </div>
            <div class="col-md-6">
              <label class="form-label premium-label">PRINTER NAME</label>
              <input
                type="text"
                class="form-control premium-input"
                placeholder="e.g. Electronics"
                v-model="currentPrinter.printerName"
                required />
            </div>
            <div class="col-md-6">
              <label class="form-label premium-label">QUANTITY</label>
              <input
                type="text"
                class="form-control premium-input"
                placeholder="e.g. pcs, kg"
                v-model="currentPrinter.quantity"
                required />
            </div>

            <div class="col-md-6">
              <label class="form-label premium-label">OWNERSHIP STATUS</label>
              <div class="dropdown">
                <button
                  class="form-control premium-input dropdown-toggle d-flex justify-content-between align-items-center"
                  type="button"
                  id="ownershipDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  {{ currentPrinter.ownershipStatus || "Select Status" }}
                </button>
                <ul
                  class="dropdown-menu w-100"
                  aria-labelledby="ownershipDropdown">
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="
                        currentPrinter.ownershipStatus = 'Free Use'
                      ">
                      Free Use
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="
                        currentPrinter.ownershipStatus = 'Self Procured'
                      ">
                      Self Procured
                    </a>
                  </li>
                </ul>
              </div>
              <input
                type="hidden"
                v-model="currentPrinter.ownershipStatus"
                required />
            </div>

            <div class="col-md-6">
              <label class="form-label premium-label">INK USE</label>
              <input
                type="text"
                class="form-control premium-input"
                v-model="currentPrinter.inkUse"
                placeholder="Optional" />
            </div>

            <div class="col-md-6">
              <label class="form-label premium-label">SUPPLIER</label>
              <input
                type="text"
                class="form-control premium-input"
                placeholder="Any specific handling details..."
                v-model="currentPrinter.supplier"
                required />
            </div>
            <div class="col-12">
              <label class="form-label premium-label">Remarks</label>
              <input
                type="text"
                class="form-control premium-input"
                placeholder="Any specific handling details..."
                v-model="currentPrinter.remarks"
                required />
            </div>
          </div>

          <!-- Modal Footer Actions -->
          <div
            class="modal-footer border-top-0 px-0 pb-0 mt-4 pt-3 d-flex justify-content-end gap-2">
            <button
              type="button"
              class="btn premium-btn-secondary"
              @click="handleClose">
              Cancel
            </button>
            <button
              type="submit"
              class="btn premium-btn-primary px-4"
              @click="updatePrinter">
              <ButtonLoading :Loading="Loading" />
              <span>{{ Loading ? "Saving..." : "Save Printer" }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    isEditModal: Boolean,
    currentPrinter: Object,
    PrinterID: Number,
  },
  components: {
    ButtonLoading,
    SuccessToast,
  },
  data() {
    return {
      Loading: false,
      ShowToast: false,
      Message: "",
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
    async updatePrinter() {
      try {
        this.Loading = true;
        const formData = new FormData();
        formData.append("PrinterID", this.PrinterID);
        formData.append("OfficeName", this.currentPrinter.officeName || "");
        formData.append("PrinterName", this.currentPrinter.printerName || "");
        formData.append("Quantity", this.currentPrinter.quantity || 0);
        formData.append(
          "OwnershipStatus",
          this.currentPrinter.ownershipStatus || "",
        );
        formData.append("InkUse", this.currentPrinter.inkUse || "");
        formData.append("Supplier", this.currentPrinter.supplier || "");
        formData.append("Remarks", this.currentPrinter.remarks || "");
        const response = await axios.put(
          "https://localhost:5001/api/Printer/editPrinter",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        this.ShowToast = true;
        this.Message = response.data.message;
        this.Loading = false;
        this.handleClose();
      } catch (error) {
        console.log("FULL ERROR:", error.response?.data);

        console.log("VALIDATION ERRORS:", error.response?.data?.errors);

        alert(JSON.stringify(error.response?.data?.errors));
      } finally {
      }
    },
  },
};
</script>
