<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import LoginForm from '$lib/components/Auth/LoginForm.svelte';
  import { authStore } from '$lib/stores/authStore';
  import { goto } from '$app/navigation';
  
  function handleLoginSuccess(event) {
    const user = event.detail;
    authStore.login(user);
    goto('/');
  }
</script>

<div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
  <LoginForm on:success={handleLoginSuccess} />
</div>




<!-- <script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  export let form;
  
  // If user is already authenticated, redirect to home
  $: if ($page.data.session) {
    goto('/');
  }
</script>



<div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
  <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
  
  {#if form?.error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
      <span class="block sm:inline">{form.error}</span>
    </div>
  {/if}
  
  <form method="POST" use:enhance>
    <div class="mb-4">
      <label for="username" class="block text-gray-700 text-sm font-medium mb-2">Username</label>
      <input 
        type="text" 
        id="username" 
        name="username" 
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    
    <div class="mb-6">
      <label for="password" class="block text-gray-700 text-sm font-medium mb-2">Password</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    
    <button 
      type="submit" 
      class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Sign In
    </button>
  </form>
  
  <div class="mt-4 text-center">
    <p class="text-sm text-gray-600">
      Don't have an account? 
      <a href="/register" class="text-blue-600 hover:underline">Register</a>
    </p>
  </div>
</div>
 -->



<!-- <script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';
  
  export let form: ActionData;
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
  
  <form method="POST" use:enhance>
    <div class="mb-4">
      <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
      <input 
        type="text" 
        id="username" 
        name="username" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    
    <div class="mb-6">
      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    
    {#if form?.message}
      <p class="text-red-500 text-sm mb-4">{form.message}</p>
    {/if}
    
    <button 
      type="submit" 
      class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
    >
      Login
    </button>
  </form>
  
  <div class="mt-4 text-center">
    <a href="/register" class="text-sm text-blue-600 hover:underline">
      Don't have an account? Register
    </a>
  </div>
</div>

 -->