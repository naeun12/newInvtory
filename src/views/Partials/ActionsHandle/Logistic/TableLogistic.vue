<!-- @format -->

<template>
  <div
    class="table-responsive custom-table-container border-0 rounded-4 shadow-sm bg-white p-2">
    <table class="table table-hover align-middle custom-table mb-0">
      <!-- Header -->
      <thead>
        <tr
          class="border-bottom-2 text-uppercase fs-7 tracking-wider text-secondary">
          <th
            v-for="(col, index) in ColumnsData"
            :key="index"
            :class="[col.class, 'py-3 border-0 fw-semibold text-muted']"
            style="font-size: 0.8rem; letter-spacing: 0.05em">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="border-0">
        <tr
          v-for="(row, index) in FetchDatas"
          :key="index"
          class="position-relative transition-all">
          <td class="ps-4 py-3.5">
            <div class="d-flex flex-column">
              <span class="fw-semibold text-dark mb-0.5">
                {{ row.itemCode }}
                <span class="text-secondary fw-normal fs-7"
                  >#{{ row.itemID }}</span
                >
              </span>
              <span class="text-muted small fw-normal">{{ row.type }}</span>
            </div>
          </td>
          <td class="text-secondary py-3.5 fs-7">
            {{ row.description || "—" }}
          </td>
          <td class="font-monospace text-muted py-3.5 fs-7">
            {{ row.serialNumber || "—" }}
          </td>

          <td class="text-end fw-semibold text-dark py-3.5 pe-4">
            {{ row.availableStocks }}
          </td>
          <td class="text-center py-3.5">
            <span
              class="badge px-2.5 py-1.5 rounded-pill fw-semibold border-0 d-inline-flex align-items-center gap-1"
              :class="
                row.stockStatus
                  ? 'bg-success-subtle text-success'
                  : 'bg-danger-subtle text-danger'
              ">
              <span
                class="badge rounded-pill px-2 py-1"
                :class="
                  row.stockStatus
                    ? 'bg-success-subtle text-success'
                    : 'bg-danger-subtle text-danger'
                ">
                {{ row.stockStatus ? "In Stock" : "Out of Stock" }}
              </span>
            </span>
          </td>
          <td class="text-end pe-4 py-3.5">
            <div class="d-flex justify-content-end gap-1">
              <button
                class="btn btn-sm btn-icon-flat text-secondary hover-primary"
                title="Checkout"
                @click="GetItemId(row.itemID)">
                <i class="bi bi-bag-check"></i> Checkout
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
    ColumnsData: {
      type: Object,
      default: () => [],
    },
    FetchDatas: {
      type: Object,
      default: () => [],
    },
  },
  components: {
    CheckOutItem,
  },
  data() {
    return {
      isCheckoutModal: false,
      ItemID: 0,
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
<style src="../../../../assets/stylesheets/Table.css"></style>
