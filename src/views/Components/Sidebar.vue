<!-- @format -->

<template>
  <aside class="sidebar">
    <div class="sidebar-logo"></div>

    <nav class="sidebar-nav">
      <div class="nav-section-title">Core</div>
      <ul>
        <li>
          <router-link to="/" class="nav-item" exact-active-class="active">
            <i class="bi bi-columns-gap"></i>
            <span>Overview</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Items" class="nav-item" active-class="active">
            <i class="bi bi-box-seam"></i>
            <span>Inventory</span>
          </router-link>
        </li>
      </ul>

      <div class="nav-section-title">Printers</div>
      <ul>
        <li>
          <router-link to="/Printers" class="nav-item" active-class="active">
            <i class="bi bi-printer"></i>
            <span>Printers</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/DashboardPrinter"
            class="nav-item"
            active-class="active">
            <i class="bi bi-pc-display"></i>
            <span>Printers Dashboard</span>
          </router-link>
        </li>
      </ul>

      <div class="nav-section-title">Management</div>
      <ul>
        <li class="nav-dropdown" :class="{ 'dropdown-open': isOperationsOpen }">
          <a
            href="#"
            class="nav-item dropdown-toggle"
            @click.prevent="toggleOperations">
            <i class="bi bi-gear"></i>
            <span>Operations</span>
            <i
              class="bi"
              :class="isOperationsOpen ? 'bi-chevron-up' : 'bi-chevron-down'"
              style="margin-left: auto"></i>
          </a>

          <ul v-show="isOperationsOpen" class="dropdown-menu-list">
            <li>
              <router-link
                to="/Logistic"
                class="nav-item sub-item"
                active-class="active">
                <i class="bi bi-truck"></i>
                <span>Logistics</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/Issuances"
                class="nav-item sub-item"
                active-class="active">
                <i class="bi bi-receipt"></i>
                <span>Issuances</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/UserControl"
                class="nav-item sub-item"
                active-class="active">
                <i class="bi bi-person-gear"></i>
                <span>User Control</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isOperationsOpen = ref(false);
const toggleOperations = () => {
  isOperationsOpen.value = !isOperationsOpen.value;
};
watch(
  () => route.path,
  (newPath) => {
    const dropdownRoutes = ["/Logistic", "/Issuances", "/UserControl"];
    if (dropdownRoutes.includes(newPath)) {
      isOperationsOpen.value = true;
    }
  },
  { immediate: true },
);
</script>

<style src="../../assets/stylesheets/Sidebar.css"></style>
