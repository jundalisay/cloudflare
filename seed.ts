import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';


export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  // user_id: text('user_id').references(() => user.id).notNull(),
  date_created: integer('date_created', { mode: 'timestamp' }) 
  // date_created: text("date_created").default(sql`CURRENT_TIMESTAMP`)
});


const today = new Date();

// .toISOString().split('T')[0];
// const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });
const client = createClient({ url: "file:local.db" });
// export const db = drizzle(client);

// Setup relations for the ORM
export const db = drizzle(client, { posts });


async function seed() {
  try {
    // Optionally, you might want to clear existing data
    await db.delete(posts).execute();

    // Insert seed data
    await db.insert(posts).values([
      { id: '1', content: 'Alice age: 28', date_created: today },
      { id: '2', content: 'Bob, age: 35', date_created: today }
    ]).execute();

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
