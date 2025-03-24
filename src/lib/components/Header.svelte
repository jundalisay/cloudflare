<!-- src/lib/components/Header.svelte -->
<script lang="ts">
  import { authStore } from '$lib/stores/authStore';
  import Button from './UI/Button.svelte';
  import { enhance } from '$app/forms';
</script>

<header class="bg-white shadow">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-xl font-bold text-blue-600">AuthApp</a>
        </div>
      </div>
      <div class="flex items-center">
        {#if $authStore}
          <span class="mr-4">Welcome, {$authStore.username}</span>
          <form method="POST" action="/logout" use:enhance>
            <Button type="submit" variant="secondary">Logout</Button>
          </form>
        {:else}
          <a href="/login" class="text-blue-600 hover:text-blue-800 mr-4">Login</a>
          <a href="/register" class="text-blue-600 hover:text-blue-800">Register</a>
        {/if}
      </div>
    </div>
  </div>
</header>