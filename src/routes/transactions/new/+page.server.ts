import { db } from '$lib/server/db';
import { user, products } from '$lib/server/db/schema';
import { validateSession } from '$lib/server/auth';
import { fail, redirect, type Actions, type PageServerLoad } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';




export const load: PageServerLoad = async ({ url }) => {
  const itemId = url.searchParams.get('id');
  const name = url.searchParams.get('name');
  const userId = url.searchParams.get('userId');
  const points = url.searchParams.get('points');
  const measure = url.searchParams.get('measure');

  console.log('Item ID:', itemId);
  console.log('Name:', name);
  // console.log('User ID (server):', userId);
  console.log('Points:', points);
  console.log('Measure:', measure);

  return {
    name,
    itemId,
    points,
    measure
  };
};


export const actions: Actions = {
  processBarter: async ({ request, url }) => {
    const name = url.searchParams.get('name');
    const userId = url.searchParams.get('userId');
    const points = url.searchParams.get('points');
    const measure = url.searchParams.get('measure');

    // Process the barter transaction using the received parameters
    console.log('Processing barter for:', name, userId, points, measure);

    // Example: Redirect to a confirmation page
    throw redirect(303, `/barter/confirm?name=${name}&userId=${userId}&points=${points}&measure=${measure}`);
  }
};



// export const load: PageServerLoad = async ({ params, cookies }) => {

//   const sessionId = cookies.get('sessionId');
//   const productId = params.id;
//   const name = params.name;
//   const user = params.userId;
//   const points = params.points;
//   const measure = params.measure;

//   if (sessionId) {
//     const session = await validateSession(sessionId);
//     if (session.valid) {

//       const [product] = await db
//         .select()
//         .from(products)
//         .where(eq(products.id, Number(params.id)));

//       if (!product || product.user_id !== session.user.id) {
//         throw redirect(302, '/products');
//       }

//       return {
//         product
//       };

//   return { user: session.user };
// };


// export const actions: Actions = {
//   default: async ({ request, locals }) => {
//     const form = await request.formData();
//     const measure = form.get('measure');
//     const points = form.get('points');
//     const user_id = form.get('userId');
//     const name = form.get('name');
//     const date_created = new Date();


//   name: text('name').notNull(),
//   points: integer('points').notNull(),
//   measure: text('measure').notNull(),  
//   amount: text('amount').notNull(),
//   photo: text('photo'),
//   notes: text('notes'),
//   kind: text('kind'),
//   status: text('status'),
//   user_id: text('user_id').references(() => users.id).notNull(),  
//   // transferee_id: text('user_id').references(() => users.id),
//   // giver_id: text('user_id').references(() => users.id).notNull(),
//   // getter_id: text('user_id').references(() => users.id).notNull(), 
//   date_accepted: integer('date_accepted', { mode: 'timestamp' }),
//   date_cancelled: integer('date_cancelled', { mode: 'timestamp' }),
//   date_transferred: integer('date_transferred', { mode: 'timestamp' }),
//   date_modified: integer('date_modified', { mode: 'timestamp' }),
//   date_created:
  

//     if (!name || !measure || !points || !user_id) {
//       return fail(400, { error: 'Missing required fields' });
//     }

//     await db.insert(products).values({
//       name,
//       points,
//       measure,
//       user_id,
//       date_created
//     });

//     throw redirect(302, '/products');
//   }
// };
