// src/routes/api/auth/register/+server.ts
import { json } from '@sveltejs/kit';
import { registerUser } from '$lib/server/auth';

export async function POST({ request }) {
  const { username, password } = await request.json();
  
  if (!username || !password) {
    return json({ success: false, error: 'Username and password are required' }, { status: 400 });
  }
  
  const result = await registerUser(username, password);
  
  if (!result.success) {
    return json(result, { status: 400 });
  }
  
  return json(result);
}

