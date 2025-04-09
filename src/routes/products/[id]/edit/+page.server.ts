import { db } from '$lib/server/db';
import { user, products } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail, redirect, type PageServerLoad, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { validateSession, cleanExpiredSessions } from '$lib/server/auth';


export const load: PageServerLoad = async ({ params, cookies }) => {

  const sessionId = cookies.get('sessionId');
  const productId = params.id;

  if (sessionId) {
    const session = await validateSession(sessionId);
    if (session.valid) {

      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, Number(params.id)));

      if (!product || product.user_id !== session.user.id) {
        throw redirect(302, '/products');
      }

      return {
        product
      };


      if (!product) throw error(404, 'Product not found');
      const isOwner = session.user.id === product.user_id;

      return {product, user: session.user, isOwner };
        
    } else {
      // Invalid or expired session, clear the cookie
      cookies.delete('sessionId', { path: '/' });
      throw redirect(302, '/login');      
    }
  } else {
      throw redirect(302, '/login');
  }
}



export const actions: Actions = {
  default: async ({ request, params }) => {
    const form = await request.formData();
    const name = form.get('name');
    const category = form.get('category');
    const description = form.get('description');
    const points = Number(form.get('points'));
    const photo = form.get('photo');
    const measure = form.get('measure');

    if (!name || !description || isNaN(points)) {
      return fail(400, { error: 'Invalid input' });
    }

    await db
      .update(products)
      .set({ name, description, points, photo, measure, category })
      .where(eq(products.id, Number(params.id)));

    throw redirect(302, `/products`);
  }
};
