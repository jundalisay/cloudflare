import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


// export const load: LayoutServerLoad = async ({ cookies }) => {
//     const session = cookies.get('session');
// };

    // console.log('session:', session.id);
    // return {
    //     user: session ? { id: '123', name: 'John Doe' } : null
    // };






// // src/routes/+layout.server.ts
// import type { LayoutServerLoad } from './$types';
// import { validateSession, cleanExpiredSessions } from '$lib/server/auth';

// export const load: LayoutServerLoad = async ({ cookies }) => {

//   console.log('loading layout');
//   // Clean expired sessions occasionally (1 in 10 requests)
//   if (Math.random() < 0.1) {
//     cleanExpiredSessions().catch(console.error);
//   }
  
//   const sessionId = cookies.get('sessionId');
  
//   if (sessionId) {
//     const result = await validateSession(sessionId);
    
//     if (result.valid) {
//       return { user: result.user };
//     } else {
//       // Invalid or expired session, clear the cookie
//       cookies.delete('sessionId', { path: '/' });
//     }
//   }
  
//   return { user: null };

//   console.log('outout:', user);

// };



// // src/routes/+layout.server.ts
// import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async (event) => {
//   return {
//     session: await event.locals.auth
//   };
// };



// new src/routes/+layout.server.ts
// import type { LayoutServerLoad } from './$types';

// export const load: LayoutServerLoad = async ({ cookies }) => {
//   const sessionCookie = cookies.get('session');
  
//   if (sessionCookie) {
//     try {
//       const user = JSON.parse(sessionCookie);
//       return { user };
//     } catch (error) {
//       console.error('Failed to parse session cookie:', error);
//     }
//   }
  
//   return { user: null };
// };


