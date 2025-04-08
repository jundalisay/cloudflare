// import { lucia } from 'lucia';
// import { sveltekit } from 'lucia/middleware';
// import { dev } from '$app/environment';
// import { drizzle } from '@lucia-auth/adapter-drizzle';
// import { user, session } from './schema';
// import { db } from './db';

// export const auth = lucia({
//   env: dev ? 'DEV' : 'PROD',
//   middleware: sveltekit(),
//   adapter: drizzle(db, {
//     user,
//     session
//   }),
//   getUserAttributes: (data) => {
//     return {
//       username: data.username
//     };
//   }
// });

// export type Auth = typeof auth;