// src/routes/api/auth/login/+server.ts
import { json } from '@sveltejs/kit';
import { loginUser } from '$lib/server/auth';


export async function POST({ request, cookies }) {
  const { username, password } = await request.json();
  
  if (!username || !password) {
    return json({ success: false, error: 'Username and password are required' }, { status: 400 });
  }
  
  const result = await loginUser(username, password);
  
  if (!result.success) {
    return json(result, { status: 401 });
  }
  
  // Set only the sessionId in the cookie
  cookies.set('sessionId', result.sessionId, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });
  
  return json({ success: true, user: result.user });
}


// // src/routes/api/auth/login/+server.ts
// import { json } from '@sveltejs/kit';
// import { loginUser } from '$lib/server/auth';

// export async function POST({ request, cookies }) {
//   const { username, password } = await request.json();
  
//   if (!username || !password) {
//     return json({ success: false, error: 'Username and password are required' }, { status: 400 });
//   }
  
//   const result = await loginUser(username, password);
  
//   if (!result.success) {
//     return json(result, { status: 401 });
//   }
  
//   // Set auth cookie
//   cookies.set('session', JSON.stringify(result.user), {
//     path: '/',
//     httpOnly: true,
//     sameSite: 'strict',
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 60 * 60 * 24 * 7 // 1 week
//   });
  
//   return json({ success: true, user: result.user });
// }
