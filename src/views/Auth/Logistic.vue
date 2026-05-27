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
          <h1>Logistics Data</h1>
          <p class="text-muted">
            View, analyze, and manage your incoming and outgoing shipments in
            real-time.
          </p>
        </div>

        <div class="premium-toggle-group">
          <!-- Card View Option -->
          <button
            class="toggle-btn"
            :class="{ active: currentView === 'card' }"
            @click="currentView = 'card'">
            <i class="bi bi-grid-3x3-gap-fill me-2"></i> Card View
          </button>

          <!-- Table View Option -->
          <button
            class="toggle-btn"
            :class="{ active: currentView === 'table' }"
            @click="currentView = 'table'">
            <i class="bi bi-table me-2"></i> Table View
          </button>
        </div>
      </div>
      <div v-if="currentView === 'card'" class="card-view-layout">
        <Card :FetchDatas="fetchData.data" />
      </div>
      <div v-if="currentView === 'table'" class="table-view-layout">
        <div class="table-responsive-wrapper">
          <Table :ColumnsData="TableDataColumns" :FetchDatas="fetchData.data" />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import axios from "axios";
import Navigation from "../Components/Navigation.vue";
import Sidebar from "../Components/Sidebar.vue";
import Table from "../Partials/ActionsHandle/Logistic/TableLogistic.vue";
import Card from "../Partials/ActionsHandle/Logistic/CardLogistic.vue";
import ScreenLoading from "../Components/Loaders/ScreenLoading.vue";
import TableColumnsData from "@/views/Data/TableColumnsData.js";

export default {
  components: {
    Navigation,
    Sidebar,
    Table,
    ScreenLoading,
    Card,
  },
  data() {
    return {
      TableDataColumns:
        TableColumnsData.TableColumnsData.LogisticTableColumsData,
      Loading: true,
      LoadingMessage: "Loading Items....",
      fetchData: {
        data: [],
        currentPage: 1,
        pageSize: 20,
        totalCount: 0,
        totalPages: 1,
      },
      currentView: "card",
      Items: [],
    };
  },
  methods: {
    async fetchItems(page = 1) {
      const response = await axios.get(
        "https://localhost:5001/api/Item/listItems",
        {
          params: {
            pageNumber: page,
            pageSize: this.fetchData.pageSize,
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
      this.fetchData.data = res.items;
      this.fetchData.currentPage = res.currentPage;
      this.fetchData.totalPages = res.totalPages;
      this.fetchData.totalCount = res.totalCount;
      this.Loading = false;
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>
<style src="../../assets/stylesheets/Logistic.css"></style>
