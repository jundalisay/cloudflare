import { db } from '$lib/server/db';
import { user, products } from '$lib/server/db/schema';
// import { json } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { eq, or, and, like, gte, lte, desc } from 'drizzle-orm';
// import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { CATEGORY_IDS } from '$lib/constants';
import { loadWithSession } from '$lib/util';


export const load: PageServerLoad = async (url, event) => {
  return loadWithSession(event);

//export const load: PageServerLoad = async ({ url }) => {
  const searchQuery = url.searchParams.get('search') || '';
  // const category = url.searchParams.get('category') || '';
  const categoryId = url.searchParams.get('category') ? Number(url.searchParams.get('category')) : null;
  const minPrice = Number(url.searchParams.get('minPrice')) || 0;
  const maxPrice = Number(url.searchParams.get('maxPrice')) || Number.MAX_SAFE_INTEGER;

  let query = db.select().from(products).orderBy(desc(products.date_created));

  const conditions = [];

  // Apply filters if they exist
  // if (searchQuery) {
  //   query = query.where(
  //     or(
  //       like(products.name, `%${searchQuery}%`),
  //       like(products.description, `%${searchQuery}%`)
  //     )
  //   );
  // }
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

  // if (category) {
  //   query = query.where(eq(products.category, category));
  // }

  conditions.push(
    and(
      gte(products.points, minPrice), // Convert to cents
      lte(products.points, maxPrice)  // Convert to cents
    )
  );

  // query = query.where(
  //   and(
  //     gte(products.points, minPrice), // Convert to cents  * 100
  //     lte(products.points, maxPrice)  // Convert to cents
  //   )
  // );

  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  const productList = await query;
  
  return {
    products: productList,
    categories: CATEGORY_IDS
  };

  // Get unique categories for the filter
  // const categories = Array.from(new Set((await db.select({ category: products.category }).from(products)).map(p => p.category)));

  // return {
  //   products: productList
  //   // categories
};
