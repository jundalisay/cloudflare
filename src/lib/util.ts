// // src/lib/utils/util.ts
// import { redirect, type RequestEvent } from '@sveltejs/kit';
// import { validateSession } from '$lib/server/auth';


// // export async function loadWithSession(event: RequestEvent) {

// // export const load: PageServerLoad = async (event) => {

// export async function loadWithSession(event: RequestEvent) {
//   if (!event) throw new Error('RequestEvent is undefined!');
//   if (!event.cookies) throw new Error('event.cookies is undefined!');
  
//   const sessionId = event.cookies.get('sessionId');

//   if (sessionId) {
//     const result = await validateSession(sessionId);

//     if (result.valid) {
//       console.log('session: ', user);
//       return { user: result.user };
//     }

//     // Invalid or expired session
//     event.cookies.delete('sessionId', { path: '/' });
//     throw redirect(302, '/login');
//   }

//   // No session
//   throw redirect(302, '/login');
// }
