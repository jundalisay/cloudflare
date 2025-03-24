import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Check if the user is not authenticated, redirect to login page
  if (!locals.auth) {
    // We'll still let the page load but the content will be determined by the auth state
  }
};


// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ locals }) => {
//   return {
//     user: locals.user
//   };
// };
