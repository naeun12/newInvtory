<!-- @format -->

<template>
  <div
    class="table-responsive custom-table-container border-0 rounded-4 shadow-sm bg-white p-2">
    <table class="table table-hover align-middle custom-table mb-0">
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
          v-for="row in FetchDatas"
          :key="row.issuancesID"
          class="border-bottom text-dark">
          <td class="ps-4 py-3">
            <div class="fw-bold text-dark">
              {{ row.item?.itemName || `Item ID: ${row.fkItemID}` }}
            </div>
            <div class="small text-muted d-flex gap-2 mt-1">
              <span class="badge bg-light text-secondary border fw-normal">
                {{ row.uom }}
              </span>
              <span v-if="row.rsNo" class="text-secondary">
                RS: {{ row.rsNo }}
              </span>
            </div>
          </td>

          <td class="py-3">
            <span class="text-secondary fw-medium">
              {{ row.location?.locationName || `Loc ID: ${row.fkLocationID}` }}
            </span>
          </td>

          <td class="py-3 text-end fw-semibold text-dark">
            {{ row.quantity?.toLocaleString() || "0" }}
          </td>

          <td class="py-3">
            <div class="small">
              <span class="text-muted">To:</span>
              <strong class="text-dark">{{ row.issuedTo }}</strong>
            </div>
            <div class="small text-muted">
              <span class="text-muted">From:</span> {{ row.issuedFrom }}
            </div>
            <div class="text-muted mt-1" style="font-size: 0.75rem">
              Req by: {{ row.requestedBy }}
            </div>
          </td>

          <td class="py-3 small text-secondary">
            <div>{{ formatDate(row.issuedFromDate) }}</div>
            <div class="text-muted small">
              to {{ formatDate(row.issuedToDate) }}
            </div>
          </td>

          <td class="py-3 text-center">
            <span
              class="badge rounded-pill px-2.5 py-1 fs-8 fw-semibold"
              :class="
                row.status === 'Active'
                  ? 'bg-success-subtle text-success border border-success-subtle'
                  : 'bg-secondary-subtle text-secondary'
              ">
              {{ row.status || "Active" }}
            </span>
          </td>

          <td class="pe-4 py-3 text-end">
            <button
              class="btn btn-sm btn-link text-primary p-0 me-2"
              @click="$emit('view', row)">
              View
            </button>
            <button
              class="btn btn-sm btn-link text-secondary p-0"
              @click="$emit('edit', row)">
              Edit
            </button>
          </td>
        </tr>

        <tr v-if="!FetchDatas || FetchDatas.length === 0">
          <td :colspan="ColumnsData.length" class="text-center py-5 text-muted">
            No allocation history records found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "IssuancesTable",
  props: {
    ColumnsData: {
      type: Array, // FIXED: Changed from Object to Array
      default: () => [],
    },
    FetchDatas: {
      type: Array, // FIXED: Changed from Object to Array
      default: () => [],
    },
  },
  emits: ["view", "edit"],
  methods: {
    formatDate(dateString) {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
  },
};
</script>
