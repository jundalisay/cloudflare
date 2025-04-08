// src/lib/utils/util.ts
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { validateSession } from '$lib/server/auth';


export async function loadWithSession(event: RequestEvent) {
  const sessionId = event.cookies.get('sessionId');

  if (sessionId) {
    const result = await validateSession(sessionId);

    if (result.valid) {
      console.log('session: ', user);
      return { user: result.user };
    }

    // Invalid or expired session
    event.cookies.delete('sessionId', { path: '/' });
    throw redirect(302, '/login');
  }

  // No session
  throw redirect(302, '/login');
}
