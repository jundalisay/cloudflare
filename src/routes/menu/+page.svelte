<!-- src/routes/menu/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
  import type { PageServerData } from './$types';

  const menuItems = [
    { name: 'Posts', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-newspaper-icon lucide-newspaper"><path d="M15 18h-5"/><path d="M18 14h-8"/><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="10" y="6" rx="1"/></svg>', href: '/posts' },
    { name: 'Products', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-apple-icon lucide-apple"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>', href: '/products' },
    { name: 'Services', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-platter-icon lucide-hand-platter"><path d="M12 3V2"/><path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5"/><path d="M2 14h12a2 2 0 0 1 0 4h-2"/><path d="M4 10h16"/><path d="M5 10a7 7 0 0 1 14 0"/><path d="M5 14v6a1 1 0 0 1-1 1H2"/></svg>', href: '/services' },
    { name: 'Profile', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', href: '/profile' },
    { name: 'Balance', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coins-icon lucide-coins"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>', href: '/balance' },
    { name: 'Help!', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-siren-icon lucide-siren"><path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"/><path d="M21 12h1"/><path d="M18.5 4.5 18 5"/><path d="M2 12h1"/><path d="M12 2v1"/><path d="m4.929 4.929.707.707"/><path d="M12 12v6"/></svg>', href: 'https://forms.gle/KrZ5Vbz3nyu9MZwC7' }
  ];

  function navigate(href: string) {
    goto(href);
  }

  let { data }: { data: PageServerData } = $props();

  const userId = '3f98612a-08d2-4686-8d73-0d20e4957ef0';
</script>



<div class="max-w-2xl mx-auto p-4 py-6">

    <h5 class="font-semibold md:text-xl px-5">
      Hi, {data.user.username}!
    </h5>

    <p class="pb-4 px-5 text-sm font-normal text-gray-500 dark:text-gray-400">
      Your user ID is {data.user.id}.
    </p>


    <div class="grid grid-cols-2 gap-4 p-4">
       {#each menuItems as card, i (card.name)}
        <a href={card.href} class="group block rounded-xl bg-white shadow-md hover:shadow-lg transition duration-200 p-6 text-center">
          <div class="flex flex-col items-center justify-center h-full">
            {@html card.icon}
            <!-- <img src={card.icon} alt={card.name} class="w-12 h-12 mb-3" /> -->
            <h2 class="text-xl font-bold text-gray-800 group-hover:text-blue-500">{card.name}</h2>
          </div>
        </a>
      {/each}
    </div>



<a href={`/users/${userId}`}>
  View User Profile
</a>

    <form method="POST" action="/logout">
      <button type="submit" class="bg-red-500 w-full text-white px-4 py-2 rounded-lg">
        Sign Out
      </button>
    </form>

</div>



<!-- <button onclick={logout} class="bg-red-500 text-white px-4 py-2 rounded">
    Logout
</button> -->

<!-- <li>
  <form method="post" action="?/logout" use:enhance>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Out</button>    
  </form>
</li> -->

