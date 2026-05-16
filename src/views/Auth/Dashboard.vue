<!-- @format -->

<template>
  <div class="app-layout">
    <header class="top-navigation">
      <Navigation />
    </header>
    <div class="app-workspace">
      <Sidebar />
    </div>
    <main class="main-content">
      <header class="dashboard-header">
        <div class="header-title-area">
          <h1>Overview Dashboard</h1>
          <p class="text-muted">
            Real-time system operations and asset tracking
          </p>
        </div>
        <div class="header-actions">
          <button class="btn-premium">
            <i class="bi bi-download me-2"></i> Export Report
          </button>
        </div>
      </header>
      <section class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon-wrapper primary-bg">
            <i class="bi bi-box-seam"></i>
          </div>
          <div class="metric-details">
            <span class="metric-label">Total Inventory Items</span>
            <h3 class="metric-value">1,248</h3>
            <span class="metric-trend trend-up">
              <i class="bi bi-arrow-up-short"></i> +12% this week
            </span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon-wrapper accent-bg">
            <i class="bi bi-receipt"></i>
          </div>
          <div class="metric-details">
            <span class="metric-label">Active Issuances</span>
            <h3 class="metric-value">84</h3>
            <span class="metric-trend trend-down">
              <i class="bi bi-arrow-down-short"></i> -3% vs yesterday
            </span>
          </div>
        </div>
        <div class="metric-card">
          <div class="metric-icon-wrapper secondary-bg">
            <i class="bi bi-printer"></i>
          </div>
          <div class="metric-details">
            <span class="metric-label">Online Devices</span>
            <h3 class="metric-value">42 / 45</h3>
            <span class="metric-trend trend-neutral">
              <i class="bi bi-dash"></i> Stable operations
            </span>
          </div>
        </div>
      </section>
      <section class="visualization-container">
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h2 class="chart-title">System Activity & Metrics</h2>
              <p class="text-muted">
                Weekly performance distribution across departments
              </p>
            </div>
            <div class="chart-legends">
              <span class="legend-item"
                ><span class="legend-dot primary"></span> Issuances</span
              >
              <span class="legend-item"
                ><span class="legend-dot secondary"></span> Logistics</span
              >
            </div>
          </div>
          <div class="chart-body">
            <canvas id="premiumDashboardChart"></canvas>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import Navigation from "../Components/Navigation.vue";
import Sidebar from "../Components/Sidebar.vue";
export default {
  components: {
    Navigation,
    Sidebar,
  },
};
</script>
<style src="../../assets/stylesheets/Dashboard.css"></style>
<style src="../../assets/stylesheets/AppLayout.css"></style>
