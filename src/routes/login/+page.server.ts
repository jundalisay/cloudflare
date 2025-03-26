// src/routes/login/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ cookies }) => {

    // Get the session token from cookies
    // const sessionToken = cookies.get('session');

    // if (!sessionToken) {
    //     throw redirect(302, '/login');
    // }


// export const load: PageServerLoad = async ({ parent }) => {
//   const { user } = await parent();
//   if (!user) {
//     throw redirect(302, '/login');
//   }
//   return { user };
};



// export const load: PageServerLoad = async ({ locals, parent }) => {

//   console.log("asdf");

//   const { user } = await parent();

//   if (user) {
//     throw redirect(302, '/');
//   }
//   return {};
// };



// // src/routes/login/+page.server.ts
// import { fail, redirect } from '@sveltejs/kit';
// import { signIn } from '$lib/server/auth';
// import type { Actions, PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ locals }) => {
//   // Redirect if user is already logged in
//   if (locals.auth) {
//     throw redirect(302, '/');
//   }
// };

// export const actions: Actions = {
//   default: async ({ request, cookies, url }) => {
//     const formData = await request.formData();
//     const username = formData.get('username');
//     const password = formData.get('password');
    
//     if (
//       typeof username !== 'string' ||
//       typeof password !== 'string' ||
//       !username ||
//       !password
//     ) {
//       return fail(400, {
//         error: 'Invalid credentials'
//       });
//     }
    
//     try {
//       const result = await signIn('credentials', {
//         username,
//         password,
//         redirect: false
//       });
      
//       if (!result?.ok) {
//         return fail(400, {
//           error: 'Invalid username or password'
//         });
//       }
//     } catch (error) {
//       console.error('Authentication error:', error);
//       return fail(500, {
//         error: 'An error occurred during authentication'
//       });
//     }
    
//     // Redirect to the home page after successful login
//     throw redirect(302, '/');
//   }
// };



// // src/routes/login/+page.server.ts
// import { auth } from '$lib/server/lucia';
// import { fail, redirect } from '@sveltejs/kit';
// import { verifyPassword } from '$lib/server/auth';
// import { db } from '$lib/server/db';
// import { user } from '$lib/server/schema';
// import { eq } from 'drizzle-orm';

// import type { Actions, PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ locals }) => {
//   const session = await locals.auth.validate();
//   if (session) throw redirect(302, '/');
//   return {};
// };

// export const actions: Actions = {
//   default: async ({ request, locals }) => {
//     const formData = await request.formData();
//     const username = formData.get('username');
//     const password = formData.get('password');
    
//     // basic validation
//     if (
//       typeof username !== 'string' ||
//       typeof password !== 'string'
//     ) {
//       return fail(400, {
//         message: 'Invalid input'
//       });
//     }

//     try {
//       // Get user from database
//       const existingUser = await db.select().from(user).where(eq(user.username, username)).get();
      
//       if (!existingUser) {
//         return fail(400, {
//           message: 'Incorrect username or password'
//         });
//       }
      
//       // Verify password with bcryptjs
//       const isValidPassword = await verifyPassword(password, existingUser.password);
      
//       if (!isValidPassword) {
//         return fail(400, {
//           message: 'Incorrect username or password'
//         });
//       }
      
//       // Create session
//       const session = await auth.createSession({
//         userId: existingUser.id,
//         attributes: {}
//       });
//       locals.auth.setSession(session);
//     } catch (e) {
//       console.error(e);
//       return fail(500, {
//         message: 'An error occurred during login'
//       });
//     }
    
//     throw redirect(302, '/');
//   }
// };
