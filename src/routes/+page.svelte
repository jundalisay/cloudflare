<script lang="ts">
  // import { fade, fly } from 'svelte/transition';
  // import { scale } from 'svelte/animate';
  // import { enhance } from '$app/forms';
  // import { state } from 'svelte';

  const { data } = $props(); 

  function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
</script>



<svelte:head>
  <title>Welcome to Pantrypoints!</title>
</svelte:head>


<div class="max-w-2xl mx-auto p-4 py-6">
  <h1 class="text-2xl font-bold mb-4">Latest Posts</h1>

  {#each data.items as post}

    <div class="bg-white shadow rounded-xl p-4 my-4 border border-gray-200">
      <img
        src={post.photo}
        alt={post.name}
        class="w-10 h-10 rounded-full"
      />
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-semibold text-gray-800">{post.name}</h3>
          <span class="text-sm text-gray-500">{formatDate(post.date_created)}</span>
        </div>
        <p class="text-gray-700">{post.content}</p>
      </div>
    </div>

  {/each}
</div>
