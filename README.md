# sv

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