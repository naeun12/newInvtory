<!-- @format -->

<template>
  <aside class="sidebar">
    <!-- Top: Logo Section -->

    <!-- Middle: Navigation Links -->
    <nav class="sidebar-nav">
      <!-- Section Title -->
      <div class="nav-section-title">Core</div>
      <ul>
        <li>
          <a href="#" class="nav-item active">
            <i class="bi bi-columns-gap"></i>
            <span>Overview</span>
          </a>
        </li>
        <li>
          <a href="/Items" class="nav-item">
            <i class="bi bi-box-seam"></i>
            <span>Inventory</span>
          </a>
        </li>
      </ul>
      <ul>
        <div class="nav-section-title">PRINTERS</div>

        <li>
          <a href="/Printers" class="nav-item">
            <i class="bi bi-printer"></i>
            <span>Printers</span>
          </a>
        </li>
      </ul>

      <!-- Section Title & Dropdown -->
      <div class="nav-section-title">Management</div>
      <ul>
        <li class="nav-dropdown">
          <a href="#" class="nav-item dropdown-toggle">
            <i class="bi bi-gear"></i>
            <span>Operations</span>
          </a>

          <!-- Dropdown Menu Items -->
          <ul class="dropdown-menu-list">
            <li>
              <a href="#" class="nav-item sub-item">
                <i class="bi bi-truck"></i>
                <span>Logistics</span>
              </a>
            </li>
            <li>
              <a href="#" class="nav-item sub-item">
                <i class="bi bi-receipt"></i>
                <span>Issuances</span>
              </a>
            </li>
            <li>
              <a href="#" class="nav-item sub-item">
                <i class="bi bi-person-gear"></i>
                <span>User Control</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script></script>
<style src="../../assets/stylesheets/Sidebar.css"></style>
