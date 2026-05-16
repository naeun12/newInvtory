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
          <h1>Items Management</h1>
          <p class="text-muted">
            Real-time system operations and asset tracking
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
            <i class="bi bi-plus-circle me-2"></i> Add Items
          </button>
        </div>
      </div>
      <div class="table">
        <Table :ColumnsData="TableDataColumns" :FetchDatas="fetchItems.data" />
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
import Table from "../Partials/Table.vue";
import TableColumnsData from "@/views/Data/TableColumnsData.js";
import AddModal from "../Partials/ActionsHandle/Items/AddItems.vue";
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
      TableDataColumns: TableColumnsData.TableColumnsData.ItemsTableColumsData,
      Loading: true,
      LoadingMessage: "Loading Items....",
      fetchItems: {
        data: [],
        currentPage: 1,
        pageSize: 20,
        totalCount: 0,
        totalPages: 1,
      },
      isAddModal: false,
      Items: [],
    };
  },
  methods: {
    async fetchItem(page = 1) {
      const response = await axios.get(
        "https://localhost:5001/api/Item/listItems",
        {
          params: {
            pageNumber: page,
            pageSize: this.fetchItems.pageSize,
            search: this.search,
            sortBy: this.sortBy,
            filter: this.filterStatus,
            sortOrder: this.sortOrder,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const res = response.data.data;
      this.fetchItems.data = res.items;
      this.fetchItems.currentPage = res.currentPage;
      this.fetchItems.totalPages = res.totalPages;
      this.fetchItems.totalCount = res.totalCount;
      this.Loading = false;
    },
  },
  mounted() {
    this.fetchItem();
  },
};
</script>
<style src="../../assets/stylesheets/Items.css"></style>
<style src="../../assets/stylesheets/AppLayout.css"></style>
