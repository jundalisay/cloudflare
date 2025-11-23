import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { validateSession, cleanExpiredSessions } from '$lib/server/auth';

