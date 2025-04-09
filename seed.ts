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



export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  codename: text('codename').unique(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  pin: integer('pin'),
  phone: text('phone'),
  email: text('email'),
  avatar: text('avatar'),
  date_created: integer('date_created', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});



export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  name: text('name').notNull(),
  photo: text('photo'),  
  user_id: text('user_id').references(() => user.id).notNull(),
  date_created: integer('date_created', { mode: 'timestamp' }) 
});


export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  measure: text('measure').notNull(),
  points: integer('points').notNull(),
  category: integer('category'),  
  photo: text('photo'),
  photo1: text('photo1'),
  photo2: text('photo2'),
  photo3: text('photo3'),     
  description: text('description'),
  short_description: text('short_description'),
  username: text('username'),
  avatar: text('avatar'),  
  user_id: text('user_id').references(() => users.id).notNull(),
  date_created: integer('date_created', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});



const today = new Date();

// .toISOString().split('T')[0];
// const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });
const client = createClient({ url: "file:local.db" });
// export const db = drizzle(client);

// Setup relations for the ORM
export const db = drizzle(client, { posts });

const [firstUser] = await db.select().from(users).limit(1);


async function seed() {
  try {
    // Optionally, you might want to clear existing data
    await db.delete(posts).execute();
    await db.delete(products).execute();

    // Insert seed data
    await db.insert(posts).values([
      { id: '1', name: 'Lam', photo: 'lam.jpg', content: 'Welcome to Pantrypoints!', date_created: today, user_id: firstUser.id },
    ]).execute();

    await db.insert(products).values([
      { id: '1', username: 'Jun', avatar: 'jun.jpg', name: 'Banana', photo: '/bananas.jpg', measure: 'kilo', points: 1, date_created: today, user_id: firstUser.id },
      { id: '2', username: 'Jun', avatar: 'jun.jpg', name: 'Banh Cuon', photo: '/banh.jpg', measure: 'dish', points: 2, date_created: today, user_id: firstUser.id }
    ]).execute();

    console.log('Seeding complete!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();