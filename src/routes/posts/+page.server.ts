import * as auth from '$lib/server/auth';
import { validateSession, cleanExpiredSessions } from '$lib/server/auth';
import { fail, redirect, json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { posts, users } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';



export const load: PageServerLoad = async ({ cookies }) => {
  // Clean expired sessions occasionally (1 in 10 requests)
  if (Math.random() < 0.1) {
    cleanExpiredSessions().catch(console.error);
  }
  
  const sessionId = cookies.get('sessionId');


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

  // const results = await db
  //   .select({
  //     id: posts.id,
  //     content: posts.content,
  //     created_at: posts.created_at,
  //     user: {
  //       username: users.username,
  //       avatar_url: users.avatar_url,
  //     },
  //   })
  //   .from(posts)
  //   .leftJoin(users, eq(posts.user_id, users.id))
  //   .orderBy(desc(posts.created_at));

  const items = await db.select().from(posts);
  return { items };
};
