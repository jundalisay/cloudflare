// src/routes/register/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, parent }) => {
  const { user } = await parent();
  if (user) {
    throw redirect(302, '/');
  }
  return {};
};
