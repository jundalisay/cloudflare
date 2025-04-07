<script lang="ts">
  import '../app.css';
  let { children } = $props();
  // import { enhance } from '$app/forms';
  // import type { PageServerData } from './$types';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import { fade, fly } from 'svelte/transition';
  // import { onMount, tick, state } from 'svelte';
  // import MenuButton from '$lib/components/MenuButton.svelte';

  const menuHref = derived(page, ($page) => 
    $page.url.pathname === '/menu' ? '/' : '/menu'
  );  
  // let { data }: { data: PageServerData } = $props();

  const menuIcon = derived(page, ($page) => 
    $page.url.pathname === '/menu' ? '/home.png' : '/pp.png'
  );

  // const showBubble = state(false);

  // onMount(async () => {
  //   if (page.url.pathname === '/') {
  //     showBubble.set(true);
  //     await tick();
  //     setTimeout(() => showBubble.set(false), 4000);
  //   }
  // });
</script>



<div class="flex min-h-screen w-full flex-col bg-sky-50">
  <div class="fixed bottom-4 right-4 z-10">
    {#if $page.url.pathname !== '/login' && $page.url.pathname !== '/register'}
      <a href={$menuHref} class="group flex h-9 w-9 shrink-0 items-center justify-center">
        <img src={$menuIcon} alt="Menu Icon">
      </a>
    {/if}    
  </div>
  <div class="flex flex-col sm:gap-4 sm:py-2 sm:pl-14">
    <main>    
      {@render children()}
    </main>
  </div>
</div>

<!-- src/routes/+layout.svelte -->
<!-- <script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import { authStore } from '$lib/stores/authStore';
  import { page } from '$app/stores';
  
  $: if ($page.data.user && !$authStore) {
    authStore.init($page.data.user);
  }
</script>

<div class="min-h-screen bg-gray-50">
  <Header />
  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <div class="px-4 py-6 sm:px-0">
      <slot />
    </div>
  </main>
</div> -->



<!-- <script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
</script>

<div class="min-h-screen">
  <header class="bg-blue-600 text-white shadow-md">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <a href="/" class="text-xl font-bold">My Auth App</a>
      <nav>
        {#if $page.data.session}
          <div class="flex items-center gap-4">
            <span>Welcome, {$page.data.session.user?.username || 'User'}</span>
            <form method="POST" action="/logout">
              <button type="submit" class="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100">
                Logout
              </button>
            </form>
          </div>
        {:else}
          <div class="flex gap-4">
            <a href="/login" class="hover:underline">Login</a>
            <a href="/register" class="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100">Register</a>
          </div>
        {/if}
      </nav>
    </div>
  </header>
  
  <main class="container mx-auto px-4 py-8">
    <slot />
  </main>
</div>

 -->