<!-- @format -->
<template>
  <div
    v-if="isEditModal"
    class="modal fade show d-block premium-modal-wrapper"
    tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 premium-modal-card">
        <!-- Modal Header -->
        <div
          class="modal-header border-bottom-0 pb-0 pt-4 px-4 d-flex align-items-center justify-content-between">
          <div>
            <h4 class="modal-title fw-bold premium-title">Edit Item</h4>
            <p class="text-muted small mb-0">
              Fill in the information below to Edit a Item to the stock.
            </p>
          </div>
          <button
            type="button"
            class="btn-close premium-close-btn"
            @click="handleClose"
            aria-label="Close"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body p-4">
          <form @submit.prevent="EditItem">
            <!-- Modern Image Upload Container -->
            <div class="mb-4">
              <label
                class="form-label small fw-bold text-uppercase tracking-wider text-muted mb-2">
                Item Image
              </label>
              <div
                class="upload-container d-flex flex-column align-items-center justify-content-center p-4 text-center"
                @click="$refs.fileAddInput.click()">
                <input
                  type="file"
                  ref="fileAddInput"
                  class="d-none"
                  accept="image/*"
                  @change="handleAddFileSelect" />

                <!-- Preview State -->
                <div v-if="previewAddUrl" class="text-center preview-active">
                  <img
                    :src="previewAddUrl"
                    class="img-preview mb-2 rounded-3 shadow-sm"
                    alt="Item Preview" />
                  <p class="small text-primary fw-medium mb-0">
                    <i class="bi bi-arrow-left-right me-1"></i>Click to replace
                    image
                  </p>
                </div>

                <!-- Default Empty State -->
                <div v-else class="text-center upload-placeholder">
                  <div class="upload-icon-box mb-2">
                    <i class="bi bi-cloud-arrow-up-fill fs-3 text-primary"></i>
                  </div>
                  <p class="mb-1 fw-semibold text-dark">
                    Click or drag image here
                  </p>
                  <p class="small text-muted mb-0">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>

            <!-- Form Grid -->
            <div class="row g-4">
              <div class="col-md-6">
                <label class="form-label premium-label">Item Code</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  placeholder="e.g. ITEM-2026"
                  v-model="currentItem.itemCode"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Type</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  placeholder="e.g. Electronics"
                  v-model="currentItem.type"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Unit of Measure</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  placeholder="e.g. pcs, kg"
                  v-model="currentItem.unitOfMeasure"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Storage Location</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  placeholder="e.g. Warehouse A"
                  v-model="currentItem.storage"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Serial Number</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  v-model="currentItem.serialNumber"
                  placeholder="Optional" />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Available Stocks</label>
                <input
                  type="number"
                  class="form-control premium-input"
                  v-model="currentItem.availableStocks"
                  min="0"
                  placeholder="0" />
              </div>

              <div class="col-12">
                <label class="form-label premium-label">Description</label>
                <textarea
                  class="form-control premium-input"
                  rows="3"
                  placeholder="Provide a detailed description of the item..."
                  v-model="currentItem.description"
                  required></textarea>
              </div>

              <div class="col-12">
                <label class="form-label premium-label">Remarks</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  placeholder="Any specific handling details..."
                  v-model="currentItem.remarks"
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
                @click="updateItem">
                <ButtonLoading :Loading="Loading" />
                <span>{{ Loading ? "Saving..." : "Save Item" }}</span>
              </button>
            </div>
          </form>
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
    currentItem: Object,
    ItemID: Number,
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
    async updateItem() {
      console.log(this.ItemID);
      try {
        const formData = new FormData();
        formData.append("ItemID", this.ItemID);
        formData.append("ItemCode", this.currentItem.itemCode || "");
        formData.append("Type", this.currentItem.type || "");
        formData.append("Description", this.currentItem.description || "");
        formData.append("SerialNumber", this.currentItem.serialNumber || "");
        formData.append("UnitOfMeasure", this.currentItem.unitOfMeasure || "");
        formData.append("Storage", this.currentItem.storage || "");
        formData.append(
          "AvailableStocks",
          Number(this.currentItem.availableStocks) || 0,
        );
        formData.append("Remarks", this.currentItem.remarks || "");
        const response = await axios.put(
          "https://localhost:5001/api/Item/editItem",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        this.ShowToast = true;
        this.Message = response.data.message;
      } catch (error) {
        console.error(error);
        alert("An error occurred while updating the item.");
      } finally {
      }
    },
  },
};
</script>
