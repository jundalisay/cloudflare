// src/routes/dashboard/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ cookies }) => {

    // Get the session token from cookies
    const sessionToken = cookies.get('session');

    if (!sessionToken) {
        throw redirect(302, '/login');
    }


// export const load: PageServerLoad = async ({ parent }) => {
//   const { user } = await parent();
//   if (!user) {
//     throw redirect(302, '/login');
//   }
//   return { user };
};
