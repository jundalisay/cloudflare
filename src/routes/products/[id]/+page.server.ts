import { db } from '$lib/server/db';
import { user, products } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;
  
  const product = await db.select().from(products).where(eq(products.id, id)).limit(1);
  
  if (!product || product.length === 0) {
    throw error(404, 'Product not found');
  }
  
  return {
    product: product[0]
  };
};