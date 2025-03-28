import * as auth from '$lib/server/auth';
import { validateSession, cleanExpiredSessions } from '$lib/server/auth';
import { fail, redirect, json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { signOutUser } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';



export const load: PageServerLoad = async ({ cookies }) => {

  // Clean expired sessions occasionally (1 in 10 requests)
  if (Math.random() < 0.1) {
    cleanExpiredSessions().catch(console.error);
  }
  
  const sessionId = cookies.get('sessionId');
  console.log('output:', sessionId);

  if (sessionId) {
    const result = await validateSession(sessionId);
    if (result.valid) {

      return { user: result.user };

    } else {

      // Invalid or expired session, clear the cookie
      cookies.delete('sessionId', { path: '/' });
      throw redirect(302, '/login');
      
    }
  } else {
      throw redirect(302, '/login');
  }

};


// export const actions: Actions = {
//   default: async ({ cookies }) => {
//     const sessionId = cookies.get('sessionId');
    
//     if (sessionId) {
//       await signOutUser(sessionId);
//     }
    
//     cookies.delete('sessionId', { path: '/' });
//     throw redirect(302, '/login');
//   }
// };

// // If you want to access this page directly, redirect to home
// export function load() {
//   throw redirect(302, '/');
// }





export const actions: Actions = {
    logout: async ({ cookies }) => {
        const sessionId = cookies.get('auth_session'); // Adjust for your session cookie

        if (sessionId) {
            await signOutUser(sessionId);
            cookies.delete('auth_session', { path: '/' });
        }

        throw redirect(303, '/login'); // Redirect after logout
    }
};
