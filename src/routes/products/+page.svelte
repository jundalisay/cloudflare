<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';
  import { CATEGORIES, getCategoryName } from '$lib/constants';

  export let data: PageData;
  
  // Local state
  let searchInput = $page.url.searchParams.get('search') || '';
  let selectedCategory = $page.url.searchParams.get('category') || '';
  let minPrice = Number($page.url.searchParams.get('minPrice') || 0);
  let maxPrice = Number($page.url.searchParams.get('maxPrice') || 1000);
  let showFilters = false;
  
  // Handle search input
  // function handleSearch() {
  //   const url = new URL(window.location.href);
  //   url.searchParams.set('search', searchInput);
  //   goto(url.toString());
  // }
  function handleSearch() {
    const url = new URL(window.location.href);
    if (searchInput) {
      url.searchParams.set('search', searchInput);
    } else {
      url.searchParams.delete('search');
    }
    goto(url.toString());
  }


  
  // Handle filter change
  function applyFilters() {
    const url = new URL(window.location.href);
    
    if (selectedCategory) {
      url.searchParams.set('category', selectedCategory);
    } else {
      url.searchParams.delete('category');
    }
    
    url.searchParams.set('minPrice', minPrice.toString());
    url.searchParams.set('maxPrice', maxPrice.toString());
    
    goto(url.toString());
    showFilters = false;
  }
  
  // Clear all filters
  function clearFilters() {
    const url = new URL(window.location.href);
    url.searchParams.delete('category');
    url.searchParams.delete('minPrice');
    url.searchParams.delete('maxPrice');
    goto(url.toString());
    
    selectedCategory = '';
    minPrice = 0;
    maxPrice = 1000;
    showFilters = false;
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-8">Products</h1>
  
  <div class="flex flex-col md:flex-row gap-4 mb-8">
    <!-- Search Bar -->
    <div class="flex-1">
      <div class="relative">
        <input
          type="text"
          bind:value={searchInput}
          placeholder="Search products..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          on:keydown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          class="absolute right-2 top-2 text-gray-500 hover:text-blue-500"
          on:click={handleSearch}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Filter Button -->
    <div>
      <button
        class="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition-colors duration-200"
        on:click={() => showFilters = !showFilters}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </button>
    </div>
  </div>
  
  <!-- Filter Panel -->
  {#if showFilters}
    <div 
      class="bg-white rounded-lg shadow-lg p-6 mb-8" 
      transition:fade={{ duration: 200 }}
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Category Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            bind:value={selectedCategory}
            class="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Categories</option>
           {#each data.categories as categoryId}
              <option value={categoryId}>{getCategoryName(categoryId)}</option>
            {/each}
          </select>
        </div>
        
        <!-- Price Range Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Min Points</label>
          <input
            type="number"
            bind:value={minPrice}
            min="0"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Max Points</label>
          <input
            type="number"
            bind:value={maxPrice}
            min={minPrice}
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      
      <div class="flex justify-end gap-2 mt-6">
        <button
          class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          on:click={clearFilters}
        >
          Clear Filters
        </button>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          on:click={applyFilters}
        >
          Apply Filters
        </button>
      </div>
    </div>
  {/if}
  
  <!-- Active Filters -->
  {#if selectedCategory || minPrice > 0 || maxPrice < 1000}
    <div class="flex flex-wrap gap-2 mb-6">
      <div class="text-sm text-gray-500">Active filters:</div>
      
<!--       {#if selectedCategory}
        <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          Category: {selectedCategory}
          <button on:click={() => { selectedCategory = ''; applyFilters(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {/if} -->
      
      
      {#if selectedCategory}
        <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          Category: {getCategoryName(Number(selectedCategory))}
          <button on:click={() => { selectedCategory = ''; applyFilters(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {/if}



      {#if minPrice > 0 || maxPrice < 1000}
        <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
          Points: {minPrice} - {maxPrice}
          <button on:click={() => { minPrice = 0; maxPrice = 1000; applyFilters(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {/if}
    </div>
  {/if}
  
  <!-- Product Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {#each data.products as product (product.id)}
      <a 
        href={`/products/${product.id}`}
        class="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        animate:flip={{ duration: 300 }}
        in:fly={{ y: 20, duration: 300, delay: 300 }}
        out:fade={{ duration: 200 }}
      >
        <div class="relative h-48 overflow-hidden">
          <img 
            src={product.photo} 
            alt={product.name}
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-200">{product.name}</h3>
          <p class="text-xl font-bold text-blue-600">{product.points}</p>
          <div class="text-sm text-gray-500 mt-1">{getCategoryName(product.categoryId)}</div>
          <!-- <div class="text-sm text-gray-500 mt-1">{product.category}</div> -->
        </div>
      </a>
    {/each}
  </div>
  
  {#if data.products.length === 0}
    <div class="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
      <p class="text-gray-500">Try adjusting your search or filter criteria</p>
    </div>
  {/if}
</div>


<!-- <script>
  import { enhance } from '$app/forms';

  const { data } = $props(); 

  console.log('pages: ', data.items);
</script>



<svelte:head>
  <title>Products | Pantrypoints</title>
</svelte:head>



<div class="p-6 max-w-4xl mx-auto">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Products</h1>
    <a href="/products/new" class="bg-blue-500 text-white px-4 py-2 rounded">Add Product</a>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.items as i}

      <div class="shadow max-w-sm rounded-lg shadow-lg bg-white hover:bg-yellow-50">
        <img class="rounded-t-lg" src={i.photo} alt={i.name} />
        <div class="p-5">
            <h5 class="mb-2 text-2xl font-bold tracking-tight">{ i.name }</h5>
            
            <p class="mb-3 font-normal text-gray-700">{ i.short_description }</p>
        </div>
      </div>

    {/each}
  </div>
</div>
 -->