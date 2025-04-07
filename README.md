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

