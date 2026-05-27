<!-- @format -->

<template>
  <div class="row g-3">
    <div
      class="col-md-6 col-lg-4"
      v-for="(row, index) in FetchDatas"
      :key="index">
      <div class="premium-item-card h-100">
        <div class="card-header-group">
          <div class="title-area">
            <span class="item-type-badge">{{ row.type }}</span>
            <h3 class="item-code">
              {{ row.itemCode || "NO CODE" }}
            </h3>
          </div>

          <span
            :class="[
              'status-badge',
              row.stockStatus ? 'in-stock' : 'out-of-stock',
            ]">
            <i
              :class="[
                'bi',
                row.stockStatus ? 'bi-check-circle-fill' : 'bi-x-circle-fill',
              ]"></i>

            {{ row.stockStatus ? "In Stock" : "Out of Stock" }}
          </span>
        </div>

        <div class="card-body-group">
          <p class="item-desc">
            {{
              row.itemDescription ||
              row.description ||
              "No description provided."
            }}
          </p>

          <div class="sub-info-grid">
            <div class="info-pill" v-if="row.serialNumber">
              <i class="bi bi-hash"></i>
              SN:
              <span>{{ row.serialNumber }}</span>
            </div>

            <div class="info-pill" v-if="row.storage">
              <i class="bi bi-geo-alt"></i>
              <span>{{ row.storage }}</span>
            </div>
          </div>
        </div>

        <div class="stock-counter-panel">
          <div class="counter-box">
            <span class="counter-label"> Available </span>

            <span class="counter-value primary">
              {{ row.availableStocks }}

              <small>
                {{ row.unitOfMeasure || "pcs" }}
              </small>
            </span>
          </div>

          <div class="counter-box">
            <span class="counter-label"> Released </span>

            <span class="counter-value muted">
              {{ row.relatedReleaseStocks }}
            </span>
          </div>
        </div>

        <p v-if="row.remarks" class="item-remarks">
          <i class="bi bi-chat-left-text me-1"></i>
          {{ row.remarks }}
        </p>

        <div class="card-footer-group">
          <button class="btn-action-primary" @click="GetItemId(row.itemID)">
            <i class="bi bi-cart-plus me-2"></i>
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
  <CheckOutItem
    :isCheckoutModal="isCheckoutModal"
    :currentItem="currentItem"
    :ItemID="ItemID"
    @close="isCheckoutModal = false" />
</template>

<script>
import axios from "axios";
import CheckOutItem from "./CheckoutItem.vue";
export default {
  props: {
    FetchDatas: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CheckOutItem,
  },
  data() {
    return {
      ItemID: null,
      isCheckoutModal: false,
      currentItem: {},
    };
  },
  methods: {
    async GetItemId(itemID) {
      const response = await axios.get(
        `https://localhost:5001/api/Item/GetItem`,
        {
          params: { itemID: itemID },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        const currentItem = response.data.data;
        this.currentItem = currentItem;
        this.isCheckoutModal = true;
        this.ItemID = itemID;
      }
    },
  },
};
</script>
<style src="../../../../assets/stylesheets/Card.css" lang="css"></style>
