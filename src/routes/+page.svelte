<script>
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { goto } from "$app/navigation";

  const handleLogin = () => goto("/login");
  const handleRegister = () => goto("/register");
</script>



 <!-- bg-gradient-to-br from-purple-600 to-indigo-800 text-white -->
<div class="flex flex-col items-center justify-center h-screen text-center">
  <img src="/pp.png" alt="icon" class="w-24 h-24 mb-4 animate-bounce">
<!--   <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="w-24 h-24 mb-4 animate-bounce"
  >
    <path d="M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2zm0 18a8 8 0 1 0-8-8 8 8 0 0 0 8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
  </svg> -->

  <h1 transition:fade={{ duration: 800, easing: cubicOut }} class="text-5xl font-bold mb-4">Welcome to the Pantrypoints Demo App</h1>
  <p transition:fly={{ y: 20, duration: 800, easing: cubicOut }} class="text-lg mb-6">Please send us feedback at pantrypoints@gmail.com</p>
  <div class="space-x-4">
    <button on:click={handleLogin} class="px-6 py-2 bg-white text-indigo-600 rounded-lg shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105">Login</button>
    <button on:click={handleRegister} class="px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105">Register</button>
  </div>
</div>



<!-- <script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h1 class="text-2xl font-bold mb-6 text-center">Welcome to Auth App</h1>
  
  {#if $page.data.user}
    <div class="text-center">
      <p class="mb-4">Logged in as <span class="font-medium">{$page.data.user.username}</span></p>
      <form action="/logout" method="POST">
        <button type="submit" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </form>
    </div>
  {:else}
    <div class="flex flex-col gap-4 items-center">
      <a 
        href="/login" 
        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded w-full text-center"
      >
        Login
      </a>
      <a 
        href="/register" 
        class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded w-full text-center"
      >
        Register
      </a>
    </div>
  {/if}
</div>


 -->