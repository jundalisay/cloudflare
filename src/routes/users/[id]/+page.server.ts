import { db } from '$lib/server/db';
import { users, products } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { validateSession, cleanExpiredSessions } from '$lib/server/auth';
// import { loadWithSession } from '$lib/util';



export const load: PageServerLoad = async ({ params, cookies }) => {

  const sessionId = cookies.get('sessionId');
  const userId = params.id;

  if (sessionId) {
    const result = await validateSession(sessionId);
    if (result.valid) {

      const [u] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      if (!u) throw error(404, 'User not found');

      return {u};
        
    } else {
      // Invalid or expired session, clear the cookie
      cookies.delete('sessionId', { path: '/' });
      throw redirect(302, '/login');      
    }
  } else {
      throw redirect(302, '/login');
  }
}

