// // src/routes/register/+page.server.ts
// import { fail, redirect } from '@sveltejs/kit';
// import { hashPassword } from '$lib/server/auth';
// import { db } from '$lib/server/db';
// import { users } from '$lib/server/db/schema';
// import { eq } from 'drizzle-orm';
// import { randomUUID } from 'crypto';
// import type { Actions, PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ locals }) => {
//   // Redirect if user is already logged in
//   if (locals.auth) {
//     throw redirect(302, '/');
//   }
// };

// export const actions: Actions = {
//   default: async ({ request }) => {
//     const formData = await request.formData();
//     const username = formData.get('username');
//     const name = formData.get('name');
//     const email = formData.get('email');
//     const password = formData.get('password');
    
//     // Validate required fields
//     if (
//       typeof username !== 'string' ||
//       !username ||
//       typeof password !== 'string' ||
//       !password ||
//       password.length < 6
//     ) {
//       return fail(400, {
//         error: 'Invalid input. Username is required and password must be at least 6 characters.'
//       });
//     }
    
//     // Validate optional fields
//     const nameValue = typeof name === 'string' ? name : null;
//     const emailValue = typeof email === 'string' && email ? email : null;
    
//     try {
//       // Check if username already exists
//       const existingUser = await db.select().from(users).where(eq(users.username, username)).get();
      
//       if (existingUser) {
//         return fail(400, {
//           error: 'Username already taken'
//         });
//       }
      
//       // Check if email already exists (if provided)
//       if (emailValue) {
//         const existingEmail = await db.select().from(users).where(eq(users.email, emailValue)).get();
        
//         if (existingEmail) {
//           return fail(400, {
//             error: 'Email already in use'
//           });
//         }
//       }
      
//       // Hash password
//       const hashedPassword = await hashPassword(password);
      
//       // Create user
//       const userId = randomUUID();
      
//       await db.insert(users).values({
//         id: userId,
//         username,
//         name: nameValue,
//         email: emailValue,
//         password: hashedPassword,
//         createdAt: new Date()
//       });
      
//       // Redirect to login page after successful registration
//       throw redirect(302, '/login?registered=true');
//     } catch (error) {
//       console.error('Registration error:', error);
//       return fail(500, {
//         error: 'An error occurred during registration'
//       });
//     }
//   }
// };



// import { auth } from '$lib/server/lucia';
// import { fail, redirect } from '@sveltejs/kit';
// import { hashPassword } from '$lib/server/auth';
// import { generateId } from 'lucia';
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
//       username.length < 3 ||
//       username.length > 31 ||
//       typeof password !== 'string' ||
//       password.length < 6
//     ) {
//       return fail(400, {
//         message: 'Invalid input. Username must be 3-31 characters and password at least 6 characters.'
//       });
//     }

//     try {
//       // Check if username is taken
//       const existingUser = await db.select().from(user).where(eq(user.username, username)).get();
      
//       if (existingUser) {
//         return fail(400, {
//           message: 'Username already taken'
//         });
//       }
      
//       // Hash password with bcryptjs
//       const hashedPassword = await hashPassword(password);
      
//       // Generate user ID
//       const userId = generateId(15);
      
//       // Insert user into database
//       await db.insert(user).values({
//         id: userId,
//         username,
//         password: hashedPassword
//       });
      
//       // Create session
//       const session = await auth.createSession({
//         userId,
//         attributes: {}
//       });
//       locals.auth.setSession(session);
//     } catch (e) {
//       console.error(e);
//       return fail(500, {
//         message: 'An error occurred during registration'
//       });
//     }
    
//     throw redirect(302, '/');
//   }
// };



