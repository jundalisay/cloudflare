
<script>
  import { goto } from '$app/navigation';
  export let data;

  // async function handleBarter(name, userId, points, measure) {
  //   const params = new URLSearchParams();
  //   params.set('name', name);
  //   params.set('userId', userId);
  //   params.set('points', points.toString());
  //   params.set('measure', measure);

  //   console.log('params:', params);
  //   await goto(`/transactions/new?${params.toString()}`);
  // }

  function handleBarter(name, userId, points, measure) {
    // Build query string from params
    const query = new URLSearchParams({
      name,
      userId,
      points,
      measure
    }).toString();

    // Navigate to the route with query params
    goto(`/transactions/new?${query}`);
  }

  function barter(id, name, measure, points) {
    goto(`/transactions/new?id=${id}&name=${name}&measure=${measure}&points=${points}`);
  }

  function edit(id) {
    goto(`/products/${id}/edit`);
  }
</script>



<div class="p-6 max-w-xl mx-auto">

  <div class="fixed bottom-4 left-4 z-10">
    <span class="uppercase font-bold text-sm text-gray-600">Back</span>
    <a href="/products" class="group flex h-9 w-9 shrink-0 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
    </a>
  </div>

  <div class="rounded-t-2xl overflow-hidden">
    <img
      src={data.product.photo}
      alt={data.product.name}
      class="w-full h-64 object-cover"
    />
  </div>

  <div class="bg-white p-6 rounded-b-xl shadow border border-gray-200">


    <h1 class="text-2xl font-bold text-gray-800 pb-6">{data.product.name}</h1>

      {#if data.isOwner}
        <button class="px-4 py-2 bg-green-600 w-full text-white rounded-lg hover:bg-green-700 transition" on:click={
          barter(data.product.id, data.product.name, data.product.measure, data.product.points)}>
          <!-- handleBarter(data.product.name, data.product.user_id. data.product.points, data.product.measure)}> -->
          Transact
        </button>

        <button class="my-4 px-4 py-2 bg-blue-600 w-full text-white rounded-lg hover:bg-blue-700 transition" on:click={() => edit(data.product.id)}>
          Edit
        </button>
      {/if}

    <p class="text-gray-600 mt-2">{data.product.description}</p>
  </div>
</div>





<!-- <script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import type { PageData } from './$types';
  import { getCategoryName } from '$lib/constants';

  export let data: PageData;
  const { product } = data;

  //console.log('data:', data);
</script>

<div class="container mx-auto p-4 max-w-4xl"
  in:fade={{ duration: 300, delay: 100 }}>
  <a 
    href="/products"
    class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200" 
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    Back to Products
  </a>
  

  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="md:flex">
      <div class="md:w-1/2">
        <div 
          class="h-96 relative overflow-hidden"
          in:fly={{ x: -20, duration: 300, delay: 200 }}
        >
          <img 
            src={product.photo} 
            alt={product.name}
            class="w-full h-full object-cover"
          />
          <div class="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {getCategoryName(product.category)}
          </div>
        </div>
      </div>
      
      <div class="md:w-1/2 p-6" in:fly={{ x: 20, duration: 300, delay: 300 }}>
        <div class="flex justify-between items-start">
          <h1 class="text-2xl font-bold mb-2">{product.name}</h1>
          <div class="text-2xl font-bold text-blue-600">{product.price}</div>
        </div>
        
        <div class="mt-6">
          <h2 class="text-lg font-semibold mb-2">Description</h2>
          <p class="text-gray-700">{product.description}</p>
        </div>
        
        <div class="mt-8">
          <button class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transform hover:-translate-y-1 transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
 -->



