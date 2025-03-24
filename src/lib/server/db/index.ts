import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import * as schema from './schema';


if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

if (!dev && !env.DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');

// const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });
// if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');if (!dev && !env.DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');

const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });

// export const db = drizzle(client);


// Setup relations for the ORM
export const db = drizzle(client, { schema });

// Export relations to use in queries
export { eq, and, or, lt, gt, gte, lte, ne, like, between, isNull, desc, asc } from 'drizzle-orm';