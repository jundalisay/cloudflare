// import type { PageServerLoad } from './$types';
// export const load: PageServerLoad = async ({ locals }) => {
//   return {
//     user: locals.user
//   };
// };
import * as auth from '$lib/server/auth';
import * as auth from '$lib/server/auth';
import { fail, redirect, json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { validateSession, cleanExpiredSessions } from '$lib/server/auth';


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

      const items = await db.select().from(posts);
      console.log('page server load: ', items);
      return { user: result.user, items };

    } else {
      // Invalid or expired session, clear the cookie
      cookies.delete('sessionId', { path: '/' });
      throw redirect(302, '/login');
      
    }
  } else {
          throw redirect(302, '/login');
  }

  return {};
};


// export async function POST({ request }) {
//   const data = await request.json();
//   await db.insert(posts).values(data);
//   return json({ success: true });
// }

