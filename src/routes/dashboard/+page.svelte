<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { authStore } from '$lib/stores/authStore';
</script>

<div class="bg-white p-8 rounded-lg shadow">
  <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
  
<!--   {#if $authStore}
    <div class="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
      <p class="text-blue-800">
        Welcome, <span class="font-medium">{$authStore.username}</span>! You are successfully logged in.
      </p>
    </div>
    
    <div class="border-t pt-6">
      <h2 class="text-xl font-semibold mb-4">Your Account</h2>
      <p class="text-gray-600 mb-2">Username: {$authStore.username}</p>
      <p class="text-gray-600">User ID: {$authStore.id}</p>
    </div>
  {:else}
    <p>Loading...</p>
  {/if} -->
</div>