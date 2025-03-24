import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';


// export const load: PageServerLoad = async (event) => {
// 	if (!event.locals.user) {
// 		return redirect(302, '/login');
// 	}
// 	return { user: event.locals.user };
// };

export const load: PageServerLoad = async ({ locals, parent }) => {
  const { user } = await parent();
  if (user) {
    throw redirect(302, '/');
  }
  return {};
};


// export const load: PageServerLoad = async ({ cookies }) => {
//     const session = cookies.get('session');

//     if (!session) {
//         throw redirect(302, '/login');
//     }
//   return {};
//     // return {
//     //     user: { id: '123', name: 'John Doe' }
//     // };
// };


export const actions: Actions = {
    logout: async ({ cookies }) => {
        cookies.delete('session', { path: '/' }); // Delete the session cookie
        throw redirect(303, '/'); // Redirect to root
    }
};



// export const actions: Actions = {
// 	logout: async (event) => {
// 		if (!event.locals.session) {
// 			return fail(401);
// 		}
// 		await auth.invalidateSession(event.locals.session.id);
// 		auth.deleteSessionTokenCookie(event);

// 		return redirect(302, '/');
// 	}
// };
