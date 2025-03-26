<script>
  import { enhance } from '$app/forms';

  const { data } = $props(); 

  console.log('feed: ', data.items);
</script>


<svelte:head>
  <title>Social App</title>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>


<div class="max-w-2xl mx-auto p-4 py-6">

    <h5 class="mb-3 font-semibold md:text-xl">
    Posts
    </h5>

    <form></form>
    

    <div class="grid grid-cols-1 gap-6">
      {#each data.items as i}
        <div class="rounded-lg flex flex-col p-6 w-full p-4 border bg-white border-gray-200 rounded-lg shadow">
            <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{i.content}</h3>
                <p class="my-4">{i.id}</p>
            </blockquote>
            <figcaption class="flex items-center justify-center ">
                <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture">
                <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                    <div>dfghj</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 ">{i.date_created}</div>
                </div>
            </figcaption>    
        </div>


      {/each}
    </div>

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