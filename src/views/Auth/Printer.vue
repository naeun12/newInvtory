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
          <h1>Printers Management</h1>
          <p class="text-muted">
            Real-time printers operations and asset tracking
          </p>
        </div>
        <button class="btn-premium">
          <i class="bi bi-download me-2"></i> Export Report
        </button>
      </div>
      <div class="dashboard-header">
        <SearchAndFilters />
        <div class="header-actions">
          <button class="btn-premium" @click="isAddModal = true">
            <i class="bi bi-plus-circle me-2"></i> Add Printers
          </button>
        </div>
      </div>
      <div class="table">
        <Table
          :ColumnsData="TableDataColumns"
          :FetchDatas="fetchPrinters.data" />
      </div>
      <AddModal :isAddModal="isAddModal" @close="isAddModal = false" />
    </main>
  </div>
</template>
<script>
import axios from "axios";
import Navigation from "../Components/Navigation.vue";
import Sidebar from "../Components/Sidebar.vue";
import SearchAndFilters from "../Partials/SearchAndFilters.vue";
import ScreenLoading from "../Components/Loaders/ScreenLoading.vue";
import Table from "../Partials/ActionsHandle/Printers/TablePrinter.vue";
import TableColumnsData from "@/views/Data/TableColumnsData.js";
import AddModal from "../Partials/ActionsHandle/Printers/AddPrinter.vue";
export default {
  components: {
    Navigation,
    Sidebar,
    Table,
    SearchAndFilters,
    AddModal,
    ScreenLoading,
  },
  data() {
    return {
      TableDataColumns:
        TableColumnsData.TableColumnsData.PrintersTableColumsData,
      Loading: true,
      LoadingMessage: "Loading Printers....",
      fetchPrinters: {
        data: [],
        currentPage: 1,
        pageSize: 20,
        totalCount: 0,
        totalPages: 1,
      },
      isAddModal: false,
      Printers: [],
    };
  },
  methods: {
    async fetchPrinter(page = 1) {
      const response = await axios.get(
        "https://localhost:5001/api/Printer/listPrinters",
        {
          params: {
            pageNumber: page,
            pageSize: this.fetchPrinters.pageSize,
            search: this.search,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const res = response.data.data;
      this.fetchPrinters.data = res.items;
      this.fetchPrinters.currentPage = res.currentPage;
      this.fetchPrinters.totalPages = res.totalPages;
      this.fetchPrinters.totalCount = res.totalCount;

      this.Loading = false;
    },
  },
  mounted() {
    this.fetchPrinter();
  },
};
</script>
<style src="../../assets/stylesheets/AppLayout.css"></style>
