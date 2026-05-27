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
          <h1>Printer Inventory Dashboard</h1>
          <p class="text-muted">
            Live analytical overview of peripheral allocation and structural
            procurement metrics.
          </p>
        </div>

        <button class="btn-premium">
          <i class="bi bi-download me-2"></i> Export Report
        </button>
      </div>
    </main>
  </div>
</template>
<script>
import Navigation from "../Components/Navigation.vue";
import Sidebar from "../Components/Sidebar.vue";
import ScreenLoading from "../Components/Loaders/ScreenLoading.vue";
export default {
  components: {
    Navigation,
    Sidebar,
    ScreenLoading,
  },
};
</script>
