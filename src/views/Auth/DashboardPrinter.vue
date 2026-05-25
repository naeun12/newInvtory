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

      <div class="dashboard-viewport">
        <div>
          <!-- Cards -->
          <section class="cards-grid" v-if="dashboard">
            <div class="card bg-primary-gradient">
              <div class="icon-wrapper">
                <svg class="bi-icon"><use xlink:href="#icon-printer" /></svg>
              </div>
              <div class="card-info">
                <span class="card-label">Total Printers</span>
                <h2 class="card-value">{{ totalPrinters }}</h2>
              </div>
            </div>

            <div class="card glass-panel">
              <div class="icon-wrapper secondary-tint">
                <svg class="bi-icon"><use xlink:href="#icon-building" /></svg>
              </div>
              <div class="card-info">
                <span class="card-label">Offices</span>
                <h2 class="card-value">{{ totalOffices }}</h2>
              </div>
            </div>

            <div class="card glass-panel">
              <div class="icon-wrapper success-tint">
                <svg class="bi-icon"><use xlink:href="#icon-gift" /></svg>
              </div>
              <div class="card-info">
                <span class="card-label">Free Use</span>
                <h2 class="card-value">{{ freeUse }}</h2>
              </div>
            </div>

            <div class="card glass-panel">
              <div class="icon-wrapper accent-tint">
                <svg class="bi-icon"><use xlink:href="#icon-briefcase" /></svg>
              </div>
              <div class="card-info">
                <span class="card-label">Self Procured</span>
                <h2 class="card-value">{{ selfProcured }}</h2>
              </div>
            </div>
          </section>

          <!-- Charts -->
          <section class="charts-bento-grid" v-if="dashboard">
            <div class="chart-card glass-panel grid-span-main">
              <div class="chart-header">
                <h3>Printers per Office</h3>
                <span class="badge">Quantity Distribution</span>
              </div>
              <div class="canvas-container">
                <canvas id="officeChart"></canvas>
              </div>
            </div>

            <div class="chart-card glass-panel">
              <div class="chart-header">
                <h3>Ownership Split</h3>
                <span class="badge">Procurement Model</span>
              </div>
              <div class="canvas-container circular-chart">
                <canvas id="ownershipChart"></canvas>
              </div>
            </div>

            <div class="chart-card glass-panel">
              <div class="chart-header">
                <h3>Location Shares</h3>
                <span class="badge">Regional Split</span>
              </div>
              <div class="canvas-container circular-chart">
                <canvas id="locationChart"></canvas>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import axios from "axios";
import Navigation from "../Components/Navigation.vue";
import Sidebar from "../Components/Sidebar.vue";
import ScreenLoading from "../Components/Loaders/ScreenLoading.vue";

export default {
  components: { Navigation, Sidebar, ScreenLoading },

  data() {
    return {
      dashboard: null,
      charts: {},
      Loading: false,
      LoadingMessage: "Loading dashboard...",
    };
  },

  computed: {
    totalPrinters() {
      return (
        this.dashboard?.officeChart?.reduce((a, b) => a + (b.value || 0), 0) ||
        0
      );
    },

    totalOffices() {
      return this.dashboard?.officeChart?.length || 0;
    },

    freeUse() {
      return this.dashboard?.ownershipChart?.values?.[0] || 0;
    },

    selfProcured() {
      return this.dashboard?.ownershipChart?.values?.[1] || 0;
    },
  },

  async mounted() {
    await this.fetchDashboard();

    this.$nextTick(() => {
      this.renderCharts();
    });
  },

  methods: {
    async fetchDashboard() {
      try {
        this.Loading = true;

        const res = await axios.get(
          "https://localhost:5001/api/PrinterDashboard/TotalInventoryItems",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        this.dashboard = res.data || null;
      } catch (err) {
        console.error("Dashboard error:", err);
        this.dashboard = null;
      } finally {
        this.Loading = false;
      }
    },

    renderCharts() {
      if (!this.dashboard) return;

      // destroy old charts safely
      Object.values(this.charts || {}).forEach((c) => {
        if (c) c.destroy();
      });

      const officeData = this.dashboard.officeChart || [];
      const ownershipData = this.dashboard.ownershipChart || [];
      const locationData = this.dashboard.locationChart || [];

      // =========================
      // 📊 OFFICE BAR CHART
      // =========================
      this.charts.office = new Chart(document.getElementById("officeChart"), {
        type: "bar",
        data: {
          labels: officeData.map((x) => x.label || ""),
          datasets: [
            {
              label: "Printers",
              data: officeData.map((x) => x.value || 0),
              backgroundColor: "#0a6ed1",
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // =========================
      // 🥧 OWNERSHIP PIE CHART
      // =========================
      this.charts.ownership = new Chart(
        document.getElementById("ownershipChart"),
        {
          type: "pie",
          data: {
            labels: ownershipData.map((x) => x.label),
            datasets: [
              {
                data: ownershipData.map((x) => x.value),
                backgroundColor: ["#ffd100", "#e21b23"],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        },
      );
      console.log("ownershipChart raw:", this.dashboard.ownershipChart);

      // =========================
      // 🍩 LOCATION DOUGHNUT
      // =========================
      this.charts.location = new Chart(
        document.getElementById("locationChart"),
        {
          type: "doughnut",
          data: {
            labels: locationData.map((x) => x.label || ""),
            datasets: [
              {
                data: locationData.map((x) => x.value || 0),
                backgroundColor: [
                  "#0a6ed1",
                  "#ffd100",
                  "#e21b23",
                  "#10b981",
                  "#6366f1",
                  "#f59e0b",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
          },
        },
      );
    },
  },
};
</script>

<style scoped></style>
<style src="../../assets/stylesheets/AppLayout.css"></style>
<style src="../../assets/stylesheets/DashboardPrinter.css"></style>
