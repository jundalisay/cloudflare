// src/hooks.server.ts
// import { handle as authHandle } from '$lib/server/auth';

// export const handle = authHandle;




// import { auth } from '$lib/server/lucia';
// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
//   event.locals.auth = auth;
//   const authRequest = auth.handleRequest(event);
//   const { session, user } = await authRequest.validateUser();
//   event.locals.user = user;
//   event.locals.session = session;

//   return resolve(event);
// };