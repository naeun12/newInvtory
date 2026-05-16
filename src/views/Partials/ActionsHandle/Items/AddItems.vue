<!-- @format -->

<template>
  <div
    v-if="isAddModal"
    class="modal fade show d-block premium-modal-wrapper"
    tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 premium-modal-card">
        <!-- Modal Header -->
        <div
          class="modal-header border-bottom-0 pb-0 pt-4 px-4 d-flex align-items-center justify-content-between">
          <div>
            <h4 class="modal-title fw-bold premium-title">Add New Item</h4>
            <p class="text-muted small mb-0">
              Fill in the information below to add a new asset to the stock.
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
          <form @submit.prevent="SaveItem">
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
                  v-model="AddItem.itemCode"
                  placeholder="e.g. ITEM-2026"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Type</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  placeholder="e.g. Electronics"
                  v-model="AddItem.type"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Unit of Measure</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  v-model="AddItem.unitOfMeasure"
                  placeholder="e.g. pcs, kg"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Storage Location</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  v-model="AddItem.storage"
                  placeholder="e.g. Warehouse A"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Serial Number</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  v-model="AddItem.serialNumber"
                  placeholder="Optional" />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Available Stocks</label>
                <input
                  type="number"
                  class="form-control premium-input"
                  v-model="AddItem.availableStocks"
                  min="0"
                  placeholder="0" />
              </div>

              <div class="col-12">
                <label class="form-label premium-label">Description</label>
                <textarea
                  class="form-control premium-input"
                  rows="3"
                  v-model="AddItem.description"
                  placeholder="Provide a detailed description of the item..."
                  required></textarea>
              </div>

              <div class="col-12">
                <label class="form-label premium-label">Remarks</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  v-model="AddItem.remarks"
                  placeholder="Any specific handling details..."
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
                :disabled="Loading">
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
    isAddModal: Boolean,
  },
  components: {
    SuccessToast,
    ErrorToast,
    ButtonLoading,
  },
  data() {
    return {
      AddItem: {
        itemCode: "",
        type: "",
        description: "",
        unitOfMeasure: "",
        storage: "",
        serialNumber: "",
        availableStocks: 0,
        remarks: "",
      },
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
    async SaveItem() {
      try {
        this.Loading = true;
        const formData = new FormData();
        formData.append("ItemCode", this.AddItem.itemCode || "");
        formData.append("Type", this.AddItem.type || "");
        formData.append("Description", this.AddItem.description || "");
        formData.append("SerialNumber", this.AddItem.serialNumber || "");
        formData.append("UnitOfMeasure", this.AddItem.unitOfMeasure || "");
        formData.append("Storage", this.AddItem.storage || "");
        formData.append(
          "AvailableStocks",
          Number(this.AddItem.availableStocks) || 0,
        );
        formData.append("Remarks", this.AddItem.remarks || "");
        formData.append("StockStatus", true);
        const response = await axios.post(
          "https://localhost:5001/api/Item/addItems",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        this.ShowToast = true;
        this.Message = response.data.message;
        this.$emit("close");
      } catch (error) {
        console.log("ERROR:", error.response.data.errors);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style src="../../../../assets/stylesheets/AddModal.css"></style>
