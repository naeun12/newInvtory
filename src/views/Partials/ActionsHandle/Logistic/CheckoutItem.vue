<!-- @format -->

<template>
  <div
    v-if="isCheckoutModal"
    class="modal fade show d-block premium-modal-wrapper"
    tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content premium-modal-card">
        <!-- Modal Header -->
        <div class="modal-header premium-modal-header">
          <div>
            <h4 class="modal-title premium-title">
              Checkout Item / Create Issuance
            </h4>
            <p class="premium-subtitle">
              Complete the transaction fields below to register this stock
              issuance event.
            </p>
          </div>
          <button
            type="button"
            class="premium-close-btn"
            @click="handleClose"
            aria-label="Close">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body premium-modal-body">
          <!-- Item Identification Header Section -->
          <div class="modal-sector-header">
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="modal-item-type-badge">
                {{ currentItem.type || "N/A" }}
              </span>
              <span class="modal-item-id">#{{ currentItem.itemID }}</span>
            </div>
            <h2 class="modal-item-title">
              {{ currentItem.itemCode || "NO ITEM CODE" }}
            </h2>
          </div>

          <!-- Inventory Dashboard Section -->
          <div class="modal-stock-dashboard">
            <div class="modal-counter-box">
              <span class="modal-counter-label">Available Stocks</span>
              <span class="modal-counter-value primary">
                {{ currentItem.availableStocks }}
                <small class="modal-unit">{{
                  currentItem.unitOfMeasure || "pcs"
                }}</small>
              </span>
            </div>

            <div class="modal-counter-divider"></div>

            <div class="modal-counter-box">
              <span class="modal-counter-label">Released Stocks</span>
              <span class="modal-counter-value secondary-text">
                {{ currentItem.relatedReleaseStocks }}
                <small class="modal-unit">{{
                  currentItem.unitOfMeasure || "pcs"
                }}</small>
              </span>
            </div>

            <div class="modal-counter-divider"></div>

            <div class="modal-counter-box">
              <span class="modal-counter-label">Stock Status</span>
              <span
                :class="[
                  'modal-status-pill',
                  currentItem.stockStatus ? 'in-stock' : 'out-of-stock',
                ]">
                <i
                  :class="[
                    'bi',
                    currentItem.stockStatus
                      ? 'bi-check-circle-fill'
                      : 'bi-x-circle-fill',
                  ]"></i>
                {{ currentItem.stockStatus ? "Active" : "Depleted" }}
              </span>
            </div>
          </div>

          <!-- Form Workspace Section -->
          <div class="modal-form-workspace">
            <h5 class="form-section-title">Issuance Transaction Details</h5>

            <div class="modal-form-grid">
              <!-- Quantity to Issue -->
              <div class="form-field-group">
                <label class="modal-field-label">
                  Quantity to Issue <span class="req">*</span>
                </label>
                <div class="form-input-wrapper">
                  <i class="bi bi-box-seam input-icon"></i>
                  <input
                    type="number"
                    v-model.number="issuanceForm.Quantity"
                    min="1"
                    :max="currentItem.availableStocks"
                    placeholder="Enter output quantity"
                    class="premium-form-input" />
                </div>
              </div>

              <!-- Receipt / RS Number -->
              <div class="form-field-group">
                <label class="modal-field-label">Receipt / RS Number</label>
                <div class="form-input-wrapper">
                  <i class="bi bi-receipt input-icon"></i>
                  <input
                    type="text"
                    v-model="issuanceForm.RsNo"
                    placeholder="e.g. RS-2026-001"
                    class="premium-form-input"
                    disabled />
                </div>
              </div>

              <!-- Issued To -->
              <div class="form-field-group">
                <label class="modal-field-label">
                  Issued To (Recipient Name) <span class="req">*</span>
                </label>
                <div class="dropdown w-100">
                  <button
                    class="form-control d-flex justify-content-between align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ selectedName || "Select Person User" }}
                  </button>

                  <ul class="dropdown-menu w-100">
                    <li v-for="person in persons" :key="person.personID">
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="selectPerson(person)">
                        {{ person.firstName }} {{ person.lastName }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Requested By -->
              <div class="form-field-group">
                <label class="modal-field-label">
                  Requested By <span class="req">*</span>
                </label>
                <div class="form-input-wrapper">
                  <i class="bi bi-person-check input-icon"></i>
                  <input
                    type="text"
                    v-model="issuanceForm.RequestedBy"
                    placeholder="Authorized signatory"
                    class="premium-form-input" />
                </div>
              </div>

              <!-- Issued From (Handler) -->
              <div class="form-field-group">
                <label class="modal-field-label">
                  Issued From (Handler) <span class="req">*</span>
                </label>
                <div class="form-input-wrapper">
                  <i class="bi bi-person-gear input-icon"></i>
                  <input
                    type="text"
                    v-model="issuanceForm.IssuedFrom"
                    placeholder="Warehouse custodian"
                    class="premium-form-input" />
                </div>
              </div>

              <!-- Destination Location -->
              <div class="form-field-group">
                <label class="modal-field-label">
                  Destination Location <span class="req">*</span>
                </label>
                <div class="dropdown">
                  <button
                    class="form-control premium-input dropdown-toggle d-flex justify-content-between align-items-center"
                    type="button"
                    id="printerDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{
                      getLocations.find(
                        (l) => l.locationID === issuanceForm.FKLocationID,
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
                          issuanceForm.FKLocationID = location.locationID
                        "
                        >{{ location.locationName }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Issued From Date -->
              <div class="form-field-group">
                <label class="modal-field-label">
                  Issued From Date <span class="req">*</span>
                </label>
                <div class="form-input-wrapper">
                  <i class="bi bi-calendar-event input-icon"></i>
                  <input
                    type="datetime-local"
                    v-model="issuanceForm.IssuedFromDate"
                    class="premium-form-input" />
                </div>
              </div>

              <!-- Issued To Date -->
              <div class="form-field-group">
                <label class="modal-field-label">
                  Issued To Date <span class="req">*</span>
                </label>
                <div class="form-input-wrapper">
                  <i class="bi bi-calendar-check input-icon"></i>
                  <input
                    type="datetime-local"
                    v-model="issuanceForm.IssuedToDate"
                    class="premium-form-input" />
                </div>
              </div>
            </div>

            <!-- Full-width Purpose Statement -->
            <div class="form-field-group mt-4">
              <label class="modal-field-label">Unit of Measure (UOM)</label>
              <div class="form-input-wrapper">
                <i class="bi bi-rulers input-icon"></i>

                <select
                  v-model="issuanceForm.UOM"
                  class="premium-form-input premium-form-select">
                  <option value="" disabled>Select UOM</option>
                  <option
                    v-for="unit in unitOptions"
                    :key="unit.id"
                    :value="unit.value">
                    {{ unit.label }}
                  </option>
                </select>
              </div>
            </div>

            <div class="form-field-group mt-4">
              <label class="modal-field-label">
                Purpose of Issuance <span class="req">*</span>
              </label>
              <div class="form-input-wrapper alignment-top">
                <i class="bi bi-pencil-square input-icon text-area-icon"></i>
                <textarea
                  v-model="issuanceForm.Purpose"
                  rows="3"
                  placeholder="Provide brief justification for this transaction..."
                  class="premium-form-input premium-textarea"></textarea>
              </div>
            </div>
          </div>

          <!-- Form Actions Footer -->
          <div class="modal-action-footer">
            <button
              type="button"
              class="premium-btn-secondary"
              @click="handleClose">
              Cancel
            </button>
            <button
              type="button"
              class="premium-btn-primary"
              :disabled="Loading"
              @click="confirmCheckout(currentItem.itemID)">
              <i class="bi bi-check-lg"></i><ButtonLoading :Loading="Loading" />
              <span>{{ Loading ? "Saving..." : "Confirm Checkout" }}</span>
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
    isCheckoutModal: Boolean,
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
      location: "",
      getLocations: [],
      unitOptions: [
        { id: 1, value: "pcs", label: "Pieces (pcs)" },
        { id: 2, value: "box", label: "Boxes (box)" },
        { id: 3, value: "set", label: "Sets (set)" },
        { id: 4, value: "kg", label: "Kilograms (kg)" },
        { id: 5, value: "mtr", label: "Meters (mtr)" },
        { id: 6, value: "roll", label: "Rolls (roll)" },
      ],
      issuanceForm: {
        FKItemID: null,
        FKLocationID: "",
        Purpose: "",
        UOM: "",
        Quantity: 0,
        IssuedTo: "",
        IssuedFrom: "",
        IssuedFromDate: new Date().toISOString().slice(0, 16), // local format helper
        IssuedToDate: new Date().toISOString().slice(0, 16),
        RequestedBy: "",
        RsNo: "",
        Status: "Active",
      },
      persons: [],
      selectedPersonID: null,
      selectedName: "",
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
    async fetchPersons() {
      try {
        const res = await axios.get(
          "https://localhost:5001/api/Logistic/ListPerson",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        this.persons = res.data.data;
      } catch (error) {}
    },
    selectPerson(person) {
      this.selectedPersonID = person.personID;
      this.selectedName = person.firstName + " " + person.lastName;
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
    generateRsNo() {
      const random = Math.floor(1000 + Math.random() * 9000);
      return `RS-${random}`;
    },
    async confirmCheckout(itemID) {
      this.loading = true;
      const payload = {
        FKItemID: itemID,
        FKLocationID: this.issuanceForm.FKLocationID,
        IssuedTo: this.selectedName,
        IssuedFrom: this.issuanceForm.IssuedFrom,
        IssuedToDate: this.issuanceForm.IssuedToDate, // ISO string
        IssuedFromDate: this.issuanceForm.IssuedFromDate, // ISO string
        Purpose: this.issuanceForm.Purpose,
        UOM: this.issuanceForm.UOM,
        Quantity: this.issuanceForm.Quantity,
        RequestedBy: this.issuanceForm.RequestedBy,
      };
      const response = await axios.post(
        "https://localhost:5001/api/Logistic/AddIssuances",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        this.ShowToast = true;
        this.Message = response.data.message;
        this.$emit("close");
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchLocations();
    this.issuanceForm.RsNo = this.generateRsNo();
    this.fetchPersons();
  },
};
</script>
<style src="../../../../assets/stylesheets/CheckOut.css"></style>
