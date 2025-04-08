import { db } from '$lib/server/db';
import { user, products } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loadWithSession } from '$lib/util';


export const load: PageServerLoad = async (params, event) => {
  return loadWithSession(event);

// export const load: PageServerLoad = async ({ params, cookies }) => {
//   // if (!locals.user) {
//   //   throw redirect(302, '/login');
//   // }
//   // console.log('locals:', locals);
//   // console.log('params:', params);

//   const sessionId = cookies.get('sessionId');
//   console.log('output:', sessionId);

//   if (sessionId) {
//     const result = await validateSession(sessionId);
//     if (result.valid) {

//       const items = await db.select().from(posts);
//       console.log('page server load: ', items);
//       return { user: result.user, items };

//     } else {
//       // Invalid or expired session, clear the cookie
//       cookies.delete('sessionId', { path: '/' });
//       throw redirect(302, '/login');
      
//     }
//   } else {
//       throw redirect(302, '/login');
//   }



  const productId = params.id;
  const user = locals.user; // assume you're attaching user to locals

  const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);

  if (!product) throw error(404, 'Product not found');

  return {
    product,
    currentUser: user
  };
}

//   const { id } = params;
  
//   const product = await db.select().from(products).where(eq(products.id, id)).limit(1);
  
//   if (!product || product.length === 0) {
//     throw error(404, 'Product not found');
//   }
  
//   return {
//     product: product[0]
//   };
// };



