// src/routes/logout/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { signOutUser } from '$lib/server/auth';
import type { Actions } from './$types';


export const actions: Actions = {
  default: async ({ cookies }) => {
    const sessionId = cookies.get('sessionId');
    
    if (sessionId) {
      await signOutUser(sessionId);
    }
    
    cookies.delete('sessionId', { path: '/' });
    throw redirect(302, '/login');
  }
};

// If you want to access this page directly, redirect to home
export function load() {
  throw redirect(302, '/');
}




// // src/routes/logout/+page.server.ts
// import { redirect } from '@sveltejs/kit';
// import { signOutUser } from '$lib/server/auth';
// import type { Actions } from './$types';

// export const actions: Actions = {
//   default: async ({ cookies }) => {
//     await signOutUser();
//     cookies.delete('session', { path: '/' });
//     throw redirect(302, '/login');
//   }
// };

// // If you want to access this page directly, redirect to home
// export function load() {
//   throw redirect(302, '/');
// }

// // src/routes/logout/+page.server.ts
// import { redirect } from '@sveltejs/kit';
// import type { Actions } from './$types';

// export const actions: Actions = {
//   default: async ({ locals }) => {
//     const session = await locals.auth.validate();
//     if (!session) throw redirect(302, '/login');
//     await locals.auth.invalidateSession(session.sessionId);
//     locals.auth.setSession(null);
//     throw redirect(302, '/login');
//   }
// };