<!-- @format -->
<template>
  <div class="search-filters-container">
    <div class="search-filters-layout">
      <!-- Search Component (Dynamic Width) -->
      <div class="search-box-wrapper">
        <div class="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for items, brands, or keywords..."
          class="search-input" />
      </div>

      <!-- Dropdowns Component (Pantay ug Symmetrical) -->
      <div class="dropdowns-group">
        <!-- Date Sort -->
        <div class="select-wrapper">
          <select class="custom-select" aria-label="Sort by Date">
            <option selected disabled>Sort by Date</option>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
          </select>
          <div class="select-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <!-- Name Sort -->
        <div class="select-wrapper">
          <select class="custom-select" aria-label="Sort by Name">
            <option selected disabled>Sort by Name</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
          <div class="select-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style src="../../assets/stylesheets/SearchAndFilters.css"></style>
