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
            <h4 class="modal-title fw-bold premium-title">Add New Printer</h4>
            <p class="text-muted small mb-0">
              Fill in the information below to add a new asset to the printers.
            </p>
          </div>
          <button
            type="button"
            class="btn-close premium-close-btn"
            @click="handleClose"
            aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <form @submit.prevent="SavePrinter">
            <div class="row g-4">
              <div class="col-md-6">
                <label class="form-label premium-label">LOCATIONS</label>
                <div class="dropdown">
                  <button
                    class="form-control premium-input dropdown-toggle d-flex justify-content-between align-items-center"
                    type="button"
                    id="printerDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{
                      getLocations.find(
                        (l) => l.locationID === AddPrinter.fkLocationID,
                      )?.locationName || "e.g. MISO"
                    }}
                  </button>
                  <ul
                    class="dropdown-menu w-100"
                    aria-labelledby="printerDropdown">
                    <li
                      v-for="location in getLocations"
                      :key="location.locationID">
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="
                          AddPrinter.fkLocationID = location.locationID
                        "
                        >{{ location.locationName }}</a
                      >
                    </li>
                  </ul>
                </div>
                <input type="hidden" v-model="AddPrinter.type" required />
              </div>
              <div class="col-md-6">
                <label class="form-label premium-label">OFFICE NAME</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  placeholder="e.g. PANTUM CM1100ADN"
                  v-model="AddPrinter.officeName"
                  required />
              </div>
              <div class="col-md-6">
                <label class="form-label premium-label">PRINTER NAME</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  placeholder="e.g. PANTUM CM1100ADN"
                  v-model="AddPrinter.printerName"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">QUANTITY</label>
                <input
                  type="number"
                  class="form-control premium-input"
                  v-model.number="AddPrinter.quantity"
                  placeholder="e.g. 1"
                  min="1"
                  step="1"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">OWNERSHIP STATUS</label>
                <div class="dropdown">
                  <!-- Dropdown Trigger Button -->
                  <button
                    class="form-control premium-input dropdown-toggle d-flex justify-content-between align-items-center"
                    type="button"
                    id="ownershipDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <!-- Displays the selected status, or a default placeholder if empty -->
                    {{ AddPrinter.ownershipStatus || "Select Status" }}
                  </button>

                  <!-- Dropdown Options -->
                  <ul
                    class="dropdown-menu w-100"
                    aria-labelledby="ownershipDropdown">
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="
                          AddPrinter.ownershipStatus = 'Free Use'
                        ">
                        Free Use
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="
                          AddPrinter.ownershipStatus = 'Self Procured'
                        ">
                        Self Procured
                      </a>
                    </li>
                  </ul>
                </div>

                <!-- Hidden input for HTML5 form validation -->
                <input
                  type="hidden"
                  v-model="AddPrinter.ownershipStatus"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">INK USE</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  v-model="AddPrinter.inkUse"
                  placeholder="Optional" />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">SUPPLIER</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  v-model="AddPrinter.supplier"
                  placeholder="eg.. COPIER SOURCE"
                  required />
              </div>

              <div class="col-md-6">
                <label class="form-label premium-label">Remarks</label>
                <input
                  type="text"
                  class="form-control premium-input"
                  v-model="AddPrinter.remarks"
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
      AddPrinter: {
        fkLocationID: 0,
        officeName: "",
        printerName: "",
        quantity: 0,
        ownershipStatus: "",
        inkUse: "",
        supplier: "",
        remarks: "",
      },
      location: "",
      getLocations: [],
      ShowToast: false,
      Message: "",
      Loading: false,
    };
  },
  emits: ["close"],
  mounted() {
    this.fetchLocations();
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleToastClose() {
      this.ShowToast = false;
    },
    async fetchLocations() {
      const response = await axios.get(
        "https://localhost:5001/api/Printer/getLocations",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      this.getLocations = response.data;
    },

    async SavePrinter() {
      try {
        this.Loading = true;
        const formData = new FormData();
        formData.append("FKLocationID", this.AddPrinter.fkLocationID);
        formData.append("OfficeName", this.AddPrinter.officeName);
        formData.append("PrinterName", this.AddPrinter.printerName);
        formData.append("Quantity", this.AddPrinter.quantity);
        formData.append("OwnershipStatus", this.AddPrinter.ownershipStatus);
        formData.append("InkUse", this.AddPrinter.inkUse);
        formData.append("Supplier", this.AddPrinter.supplier);
        formData.append("Remarks", this.AddPrinter.remarks);
        const response = await axios.post(
          "https://localhost:5001/api/Printer/addPrinters",
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
