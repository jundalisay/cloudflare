# sv

23.10.0

npx drizzle-kit generate


Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

flutter pub add libsql_dart


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.



<script>
  let password = '';
  let showPassword = false;
  let errors = { password: '' }; // Replace with your actual error state
</script>

<div class="relative">
  <Input 
    type={showPassword ? 'text' : 'password'}
    name="password"
    label="Password"
    bind:value={password}
    error={errors.password}
    required
  />

  <!-- Toggle visibility button -->
  <button
    type="button"
    class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
    onclick={() => (showPassword = !showPassword)}
  >
    {showPassword ? 'Hide' : 'Show'}
  </button>
</div>



---

import { db } from '$lib/server/db'; // Adjust import based on your setup
import { users, posts } from '$lib/server/schema'; // Your Drizzle schema
import { eq } from 'drizzle-orm';

const today = new Date().toISOString();

// Get the first user from the users table
const [firstUser] = await db.select().from(users).limit(1);

if (!firstUser) {
  throw new Error('No users found — seed users before posts.');
}

// Use the first user's ID for post insertion
await db.insert(posts).values([
  {
    id: '1',
    content: 'Alice age: 28',
    date_created: today,
    user_id: firstUser.id // Use the actual user ID from the DB
  },
  // Add more post objects if needed
]).execute();

console.log('✅ Seeded posts with user ID:', firstUser.id);





<!-- 
<header class="fixed bottom-6 right-6 z-50">
  <MenuButton menuIcon="1.png" menuHref="/menu" />
</header> -->

<!-- <div class="flex min-h-screen w-full flex-col bg-gray-100">
  <div class="fixed bottom-4 left-4 z-10">
    {#if $page.url.pathname !== '/login' && $page.url.pathname !== '/register'}
      <div class="relative">
        <a href={menuHref} class="group flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110 active:scale-95 duration-200">
          <img src={menuIcon} alt="Menu Icon" class="h-6 w-6" />
        </a>

        {#if showBubble}
          <div
            in:fly={{ y: 8, duration: 300 }}
            out:fade={{ duration: 200 }}
            class="absolute -top-12 left-1/2 -translate-x-1/2 rounded-xl bg-black px-3 py-1 text-sm text-white shadow-md"
          >
            Tap here for menu
            <div class="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-black"></div>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <div class="flex flex-col sm:gap-4 sm:py-2 sm:pl-14">
    <main>
      {@render children()}
    </main>
  </div>
</div>
 -->



 
<!-- src/routes/products/[id]/+page.svelte -->
<script>
  import { page } from '$app/stores';
  // import Button from '$lib/components/Button.svelte';
  // import Avatar from '$lib/components/Avatar.svelte';

<script>
  import { props, state, derived } from 'svelte';

  // Accept props from the load function
  const { data } = props();

  // Component state
  const $state = state({
    showDeleteModal: false
  });

  // Derived values
  const $derived = derived(() => ({
    product: data.product,
    owner: data.owner,
    isOwner: data.currentUser?.id === data.owner?.id
  }));

  // Toggle modal
  function toggleDeleteModal() {
    $state.showDeleteModal = !$state.showDeleteModal;
  }

  // Delete logic
  async function deleteProduct() {
    // Actual deletion logic goes here
    $state.showDeleteModal = false;
  }
</script>

<!-- Example usage -->
{#if $state.showDeleteModal}
  <div class="modal">
    <p>Are you sure you want to delete {$derived.product.name}?</p>
    <button on:click={deleteProduct}>Confirm</button>
    <button on:click={toggleDeleteModal}>Cancel</button>
  </div>
{/if}

{#if $derived.isOwner}
  <button on:click={toggleDeleteModal}>Delete Product</button>
{/if}



  export let data;
  
  // Using reactive state with Svelte 5 $state syntax
  let $state = {
    showDeleteModal: false
  };
  
  // Derived values using Svelte 5 syntax
  $derived.product = data.product;
  $derived.owner = data.owner;
  $derived.isOwner = data.currentUser?.id === data.owner?.id;
  
  function toggleDeleteModal() {
    $state.showDeleteModal = !$state.showDeleteModal;
  }
  
  async function deleteProduct() {
    // Implementation would go here
    $state.showDeleteModal = false;
  }
</script>

<svelte:head>
  <title>{$derived.product.name} | Barter</title>
</svelte:head>

<div class="max-w-4xl mx-auto p-6">
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <div class="h-64 w-full md:w-64 bg-gray-200 flex items-center justify-center">
          {#if $derived.product.image}
            <img src={$derived.product.image} alt={$derived.product.name} class="h-full w-full object-cover" />
          {:else}
            <div class="text-gray-400 text-lg">No Image</div>
          {/if}
        </div>
      </div>
      
      <div class="p-8 w-full">
        <div class="flex justify-between items-start">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">{$derived.product.name}</h1>
            <p class="text-xl font-bold text-green-600 mt-2">
              {$derived.product.price} {$derived.product.measure}
            </p>
          </div>
          
          {#if $derived.isOwner}
            <div class="flex gap-2">
              <Button color="blue" href="/products/{$derived.product.id}/edit">Edit</Button>
              <Button color="red" on:click={toggleDeleteModal}>Delete</Button>
            </div>
          {/if}
        </div>
        
        <div class="mt-4 text-gray-600">
          <p>{$derived.product.description}</p>
        </div>
        
        <div class="mt-6 flex items-center">
          <Avatar user={$derived.owner} size="md" />
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">Listed by</p>
            <p class="text-base font-medium text-gray-700">{$derived.owner.name}</p>
          </div>
        </div>
        
        <div class="mt-8 flex">
          {#if !$derived.isOwner}
            <Button color="green" href="/transaction/{$derived.product.id}">Trade</Button>
          {:else}
            <Button color="green" href="/transaction/{$derived.product.id}">Barter</Button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Delete Confirmation Modal -->
{#if $state.showDeleteModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p class="mb-6">Are you sure you want to delete "{$derived.product.name}"? This action cannot be undone.</p>
      <div class="flex justify-end gap-4">
        <Button color="gray" on:click={toggleDeleteModal}>Cancel</Button>
        <Button color="red" on:click={deleteProduct}>Delete</Button>
      </div>
    </div>
  </div>
{/if}





// src/routes/+layout.server.ts
// export const load: LayoutServerLoad = async ({ locals }) => {

//   console.log('layout user:', locals.user);
  
//   return {
//     user: locals.user
//   };



// };



// export const load: LayoutServerLoad = async ({ cookies }) => {
//   // Clean expired sessions occasionally (1 in 10 requests)
//   if (Math.random() < 0.1) {
//     cleanExpiredSessions().catch(console.error);
//   }
  
//   const sessionId = cookies.get('sessionId');
  
//   if (sessionId) {
//     const result = await validateSession(sessionId);
    
//     if (result.valid) {
//       return { user: result.user };
//     } else {
//       // Invalid or expired session, clear the cookie
//       cookies.delete('sessionId', { path: '/' });
//     }
//   }
  
//   return { user: null };

//   console.log('output:', user);

// };

// new src/routes/+layout.server.ts
// import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async ({ cookies }) => {
//   const sessionCookie = cookies.get('session');
  
//   if (sessionCookie) {
//     try {
//       const user = JSON.parse(sessionCookie);
//       return { user };
//     } catch (error) {
//       console.error('Failed to parse session cookie:', error);
//     }
//   }
  
//   return { user: null };
// };



