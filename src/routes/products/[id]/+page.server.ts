import { db } from '$lib/server/db';
import { user, products } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { validateSession, cleanExpiredSessions } from '$lib/server/auth';
// import { loadWithSession } from '$lib/util';

// export const load: PageServerLoad = async (params, event) => {
//   return loadWithSession(event);

export const load: PageServerLoad = async ({ params, cookies }) => {

  const sessionId = cookies.get('sessionId');
  const productId = params.id;

  if (sessionId) {
    const result = await validateSession(sessionId);
    if (result.valid) {

      const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);
      if (!product) throw error(404, 'Product not found');
      const isOwner = result.user.id === product.user_id;

      return {product, user: result.user, isOwner };
        
    } else {
      // Invalid or expired session, clear the cookie
      cookies.delete('sessionId', { path: '/' });
      throw redirect(302, '/login');      
    }
  } else {
      throw redirect(302, '/login');
  }
}

