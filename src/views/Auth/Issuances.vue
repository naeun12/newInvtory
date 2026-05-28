<!-- @format -->

<template>
  <div class="app-layout">
    <ScreenLoading :Loading="Loading" :LoadingMessage="LoadingMessage" />

    <header class="top-navigation">
      <Navigation />
    </header>

    <div class="app-workspace">
      <Sidebar />
    </div>

    <main class="main-content">
      <div class="dashboard-header mb-3 mt-5">
        <div class="header-title-area">
          <h1>Resource Distribution</h1>
          <p class="text-muted">
            Live analytical overview of peripheral allocation and structural
            procurement metrics.
          </p>
        </div>
        <button class="btn-premium">
          <i class="bi bi-download me-2"></i> Export Report
        </button>
      </div>
      <div class="table">
        <Table :ColumnsData="TableDataColumns" :FetchDatas="fetchItems.data" />
      </div>
    </main>
  </div>
</template>
<script>
import axios from "axios";
import Navigation from "../Components/Navigation.vue";
import Sidebar from "../Components/Sidebar.vue";
import ScreenLoading from "../Components/Loaders/ScreenLoading.vue";
import Table from "../Partials/ActionsHandle/Issuances/TableIssuance.vue";
import TableColumnsData from "@/views/Data/TableColumnsData.js";

export default {
  components: {
    Navigation,
    Sidebar,
    ScreenLoading,
    Table,
  },
  data() {
    return {
      TableDataColumns:
        TableColumnsData.TableColumnsData.IssuancesTableColumnsData,
      fetchItems: {
        data: [],
        currentPage: 1,
        pageSize: 20,
        totalCount: 0,
        totalPages: 1,
      },
      Loading: false,
      LoadingMessage: "Issuances Loading....",
    };
  },
  methods: {
    async fetchIssuances() {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/Inssuance/ListIssuances",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              pageNumber: this.fetchItems.currentPage,
              pageSize: this.fetchItems.pageSize,
              search: this.search,
              sortBy: this.sortBy,
              filter: this.filterStatus,
              sortOrder: this.sortOrder,
            },
          },
        );

        this.fetchItems.data = response.data.data.items;

        // optional pagination update
        this.fetchItems.totalCount = response.data.data.totalCount;
        this.fetchItems.totalPages = response.data.data.totalPages;

        console.log(this.fetchItems.data);
      } catch (error) {
        console.error("Error fetching issuances:", error);
      }
    },
  },
  mounted() {
    this.fetchIssuances();
  },
};
</script>
