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
                <span class="text-dark fw-normal fs-7">{{
                  row.printerID
                }}</span>
              </span>
            </div>
          </td>
          <td class="text-dark py-3.5 fs-7">
            {{ row.officeName }}
          </td>
          <td class="text-dark py-3.5 fs-7">
            {{ row.printerName }}
          </td>
          <td class="font-monospace text-muted py-3.5 fs-7">
            {{ row.quantity }}
          </td>
          <td class="text-center py-3.5">
            <span
              class="badge bg-light text-dark border-0 px-2.5 py-1.5 rounded-2 fw-medium">
              {{ row.ownershipStatus }}
            </span>
          </td>
          <td class="text-dark py-3.5 fs-7">
            {{ row.inkUse }}
          </td>
          <td class="text-end fw-semibold text-dark py-3.5 pe-4">
            {{ row.supplier }}
          </td>
          <td class="text-end fw-semibold text-dark py-3.5 pe-4">
            {{ row.remarks }}
          </td>

          <td class="text-end pe-4 py-3.5">
            <div class="d-flex justify-content-end gap-1">
              <button
                class="btn btn-sm btn-icon-flat text-dark hover-primary"
                title="Edit"
                @click="OpenEditModal(row.printerID)">
                <i class="bi bi-pencil"></i> Edit
              </button>
              <button
                class="btn btn-sm btn-icon-flat text-danger hover-danger-bg"
                title="Delete"
                @click="GetPrinterId(row.printerID)">
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <EditPrinter
    :currentPrinter="currentPrinter"
    :isEditModal="isEditModal"
    :PrinterID="PrinterID"
    @close="isEditModal = false" />
</template>
<script>
import axios from "axios";
import EditPrinter from "../Printers/EditPrinter.vue";
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
    EditPrinter,
  },
  data() {
    return {
      isEditModal: false,
      currentPrinter: {
        fkLocationID: 0,
        officeName: "",
        printerName: "",
        quantity: 0,
        ownershipStatus: "",
        inkUse: "",
        supplier: "",
        remarks: "",
      },

      PrinterID: 0,
    };
  },
  methods: {
    async GetPrinterId(printerID) {
      const response = await axios.get(
        `https://localhost:5001/api/Printer/getPrinter`,
        {
          params: { printerID: printerID },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        const currentPrinter = response.data.data;
        this.currentPrinter = currentPrinter;
        this.PrinterID = printerID;
      }
    },
    OpenEditModal(printerID) {
      this.GetPrinterId(printerID);
      this.isEditModal = true;
    },
  },
};
</script>
<style src="../../../../assets/stylesheets/Table.css"></style>
