<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageServerData } from './$types';

  let { data }: { data: PageServerData } = $props();
  // async function logout() {
  //     const response = await fetch('/logout', { method: 'POST' });
  //     if (response.ok) {
  //         window.location.href = '/'; // Redirect to root
  //     }
  // }

</script>




<div class="max-w-2xl mx-auto p-4 py-6">

<div class="w-full p-4 border bg-white border-gray-200 rounded-lg shadow sm:p-6">

<h5 class="mb-3 font-semibold md:text-xl">
Hi, {data.user.username}!
</h5>

<p class="pb-4 text-sm font-normal text-gray-500 dark:text-gray-400">Your user ID is {data.user.id}.</p>

<ul class="my-4 space-y-3">


<li>
<a href="/" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-300 hover:bg-gray-100 group hover:shadow">
  <img src="/bullhorn.png" alt="Bullhorn" class="size-8">
<span class="flex-1 ms-3 whitespace-nowrap">Posts</span>
<span class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded-sm dark:bg-gray-700 dark:text-gray-400">100 New</span>
</a>
</li>



<li>
<a href="/products" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-300 hover:bg-gray-100 group hover:shadow">

  <img src="/candy.png" alt="Candy" class="size-8">

<span class="flex-1 ms-3 whitespace-nowrap">Products</span>
<span class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded-sm dark:bg-gray-700 dark:text-gray-400">Number of Items</span>
</a>
</li>


<li>
<a href="/services" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-300 hover:bg-gray-100 group hover:shadow">

<img src="/code.png" alt="Coding" class="size-8">


<span class="flex-1 ms-3 whitespace-nowrap">Services</span>
<span class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded-sm dark:bg-gray-700 dark:text-gray-400">Number of Items</span>
</a>
</li>


<li>
<a href="/pointss" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-300 hover:bg-gray-100 group hover:shadow">

  <img src="/1.png" alt="Bullhorn" class="size-8">


<span class="flex-1 ms-3 whitespace-nowrap">Points</span>
<span class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded-sm dark:bg-gray-700 dark:text-gray-400">100</span>
</a>
</li>


<li>
<a href="/settings" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-300 hover:bg-gray-100 group hover:shadow">

  <img src="/wrench.png" alt="Bullhorn" class="size-8">

<span class="flex-1 ms-3 whitespace-nowrap">Settings</span>
</a>
</li>



<form method="POST" action="/logout">
  <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded">
    Sign Out
  </button>
</form>


<!-- <button onclick={logout} class="bg-red-500 text-white px-4 py-2 rounded">
    Logout
</button> -->

<!-- <li>
  <form method="post" action="?/logout" use:enhance>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Out</button>    
  </form>
</li> -->

</ul>

</div>

</div>
