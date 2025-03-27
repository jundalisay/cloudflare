<script>
  import { enhance } from '$app/forms';

  const { data } = $props(); 

  console.log('feed: ', data.items);


  function formatTimestamp(timestamp) {
    return new Date(timestamp * 1000).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }
</script>


<svelte:head>
  <title>Welcome to Pantrypoints!</title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>




<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Latest Posts</h1>

  {#each data.items as post}
    <div class="flex items-start bg-white shadow-md p-4 rounded-lg mb-4 border border-gray-200">
      <!-- User Avatar -->
      <!-- <img
        src={post.user.avatar_url || '/default-avatar.png'}
        alt="User Avatar"
        class="w-12 h-12 rounded-full object-cover mr-4"
      /> -->

      <div class="flex-1">
        <!-- User Info & Date -->
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-800"></span>
          <span class="text-sm text-gray-500">{post.created_at}</span>
          <p class="text-gray-600">{formatTimestamp(post.created_at)}</p>
        </div>



        <!-- Post Content -->
        <p class="text-gray-700 mt-2">{post.content}</p>
      </div>
    </div>
  {/each}
</div>




<!-- <div class="grid mb-8 border border-gray-200 rounded-lg shadow-xs dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800"> -->



<!-- <script>
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { goto } from "$app/navigation";

  const handleLogin = () => goto("/login");
  const handleRegister = () => goto("/register");
</script>
 -->

 <!-- bg-gradient-to-br from-purple-600 to-indigo-800 text-white -->
<!-- <div class="flex flex-col items-center justify-center h-screen text-center">
  <img src="/pp.png" alt="icon" class="w-24 h-24 mb-4 animate-bounce">
  <h1 transition:fade={{ duration: 800, easing: cubicOut }} class="text-5xl font-bold mb-4">Welcome to the Pantrypoints Demo App</h1>
  <p transition:fly={{ y: 20, duration: 800, easing: cubicOut }} class="text-lg mb-6">Please send us feedback at pantrypoints@gmail.com</p>
  <div class="space-x-4">
    <button on:click={handleLogin} class="px-6 py-2 bg-white text-indigo-600 rounded-lg shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105">Login</button>
    <button on:click={handleRegister} class="px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105">Register</button>
  </div>
</div> -->



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