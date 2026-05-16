<!-- @format -->

<template>
  <div class="container-xl py-3">
    <div
      class="d-flex flex-column flex-md-row align-items-md-center justify-content-md-between gap-3">
      <!-- Search Bar Component -->
      <div class="w-50 max-w-md-xl position-relative">
        <div
          class="position-absolute top-50 start-0 translate-middle-y ps-3 pointer-events-none text-muted search-icon-wrapper">
          <!-- Bootstrap Icon fallback, or Lucide JS target -->
          <i data-lucide="search" class="bi bi-search fs-5"></i>
        </div>
        <input
          type="text"
          placeholder="Search for items, brands, or keywords..."
          class="form-control custom-search-input ps-5" />
        <!-- Added ps-5 to prevent text from overlapping the icon -->
      </div>

      <!-- Filters Component -->
      <div class="d-flex flex-row gap-2 w-100 w-md-auto">
        <!-- Date Sort -->
        <select
          class="form-select custom-filter-select w-50"
          aria-label="Sort by Date">
          <option selected disabled>Sort by Date</option>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
        </select>

        <!-- Name Sort -->
        <select
          class="form-select custom-filter-select w-50"
          aria-label="Sort by Name">
          <option selected disabled>Sort by Name</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
      </div>
    </div>
  </div>
</template>
<script></script>
<style src="../../assets/stylesheets/SearchAndFilters.css"></style>
