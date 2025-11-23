import { db } from '$lib/server/db';
import { user, products } from '$lib/server/db/schema';
import { validateSession } from '$lib/server/auth';
import { fail, redirect, type Actions, type PageServerLoad } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';



export const load: PageServerLoad = async ({ cookies }) => {
  const sessionId = cookies.get('sessionId');
  if (!sessionId) throw redirect(302, '/login');

  const session = await validateSession(sessionId);
  if (!session.valid) {
    cookies.delete('sessionId', { path: '/' });
    throw redirect(302, '/login');
  }

  return { user: session.user };
};


export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await request.formData();
    const name = form.get('name');
    const description = form.get('description');
    const points = Number(form.get('points'));
    const photo = form.get('photo');
    const measure = form.get('measure');
    const user_id = form.get('user_id');
    const avatar = form.get('avatar');
    const username = form.get('username');
    const date_created = new Date();

    if (!name || !measure || !points || !user_id) {
      return fail(400, { error: 'Missing required fields' });
    }

    await db.insert(products).values({
      name,
      description,
      points,
      photo,
      measure,
      user_id,
      avatar,
      username,
      date_created
    });

    throw redirect(302, '/products');
  }
};
