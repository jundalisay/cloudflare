import { db } from '$lib/server/db';
import { user, products } from '$lib/server/db/schema';
import { validateSession, cleanExpiredSessions } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { eq, or, and, like, gte, lte, desc } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { CATEGORY_IDS } from '$lib/constants';
// import { loadWithSession } from '$lib/util';



export const load: PageServerLoad = async ({ cookies, url }) => {
  // Clean expired sessions occasionally (1 in 10 requests)
  if (Math.random() < 0.1) {
    cleanExpiredSessions().catch(console.error);
  }

  const searchQuery = url.searchParams.get('search') || '';
  // const category = url.searchParams.get('category') || '';
  const categoryId = url.searchParams.get('category') ? Number(url.searchParams.get('category')) : null;
  const minPrice = Number(url.searchParams.get('minPrice')) || 0;
  const maxPrice = Number(url.searchParams.get('maxPrice')) || Number.MAX_SAFE_INTEGER;
  const conditions = [];

  const sessionId = cookies.get('sessionId');
  console.log('products index:', sessionId);


  if (sessionId) {
    const result = await validateSession(sessionId);

    if (result.valid) {
      let query = db.select().from(products).orderBy(desc(products.date_created));

      if (searchQuery) {
        conditions.push(
          or(
            like(products.name, `%${searchQuery}%`),
            like(products.description, `%${searchQuery}%`)
          )
        );
      }

      // Apply category filter if exists
      if (categoryId !== null) {
        conditions.push(eq(products.categoryId, categoryId));
      }  

      conditions.push(
        and(
          gte(products.points, minPrice), // Convert to cents
          lte(products.points, maxPrice)  // Convert to cents
        )
      );

      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }

      const productList = await query;
      
      return {
        products: productList,
        categories: CATEGORY_IDS
      };

      // return { user: result.user, items };
    } else {
      // Invalid or expired session, clear the cookie
      cookies.delete('sessionId', { path: '/' });
      throw redirect(302, '/login');
      
    }
  } else {
      throw redirect(302, '/login');
  }
  const items = await db.select().from(posts);
  return { items };
};





