<!-- src/routes/menu/+page.svelte -->
<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
  import type { PageServerData } from './$types';

  const menuItems = [
    { name: 'Posts', icon: 'bullhorn.png', href: '/posts' },
    { name: 'Products', icon: 'code.png', href: '/products' },
    { name: 'Services', icon: 'wrench.png', href: '/services' },
    { name: 'Profile', icon: 'boy.png', href: '/profile' },
    { name: 'Balance', icon: '1.png', href: '/balance' },
    { name: 'Help!', icon: 'help.png', href: 'https://forms.gle/KrZ5Vbz3nyu9MZwC7' }
  ];

  function navigate(href: string) {
    goto(href);
  }

  let { data }: { data: PageServerData } = $props();
  // async function logout() {
  //     const response = await fetch('/logout', { method: 'POST' });
  //     if (response.ok) {
  //         window.location.href = '/'; // Redirect to root
  //     }
  // }
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
            <img src={card.icon} alt={card.name} class="w-12 h-12 mb-3" />
            <h2 class="text-xl font-bold text-gray-800 group-hover:text-orange-500">{card.name}</h2>
          </div>
        </a>
      {/each}
    </div>

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

