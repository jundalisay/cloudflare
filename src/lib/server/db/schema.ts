import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';
// import { createInsertSchema, createSelectSchema } from 'drizzle-zod';



export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));




export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));



// export const user = sqliteTable('user', {
//   id: text('id').primaryKey(),
//   codename: text('codename').unique(),
//   username: text('username').notNull().unique(),
//   pin: integer('pin'),
//   phone: text('phone'),
//   email: text('email'),
//   passwordHash: text('password_hash').notNull(),
//   date_created: integer('date_created', { mode: 'timestamp' }) 
//   // date_created: text("date_created").default(sql`CURRENT_TIMESTAMP`)
// });


// export const session = sqliteTable('session', {
//   id: text('id').primaryKey(),
//   userId: text('user_id')
//     .notNull()
//     .references(() => user.id),
//   expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
//   // date_created: integer('date_created', { mode: 'timestamp' }) 
//   // ,
//   // date_created: text("date_created").default(sql`CURRENT_TIMESTAMP`)
// });

export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  // user_id: text('user_id').references(() => user.id).notNull(),
  date_created: integer('date_created', { mode: 'timestamp' }) 
  // date_created: text("date_created").default(sql`CURRENT_TIMESTAMP`)
});


export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  points: integer('points').notNull(),
  photo: text('photo'),
  photo1: text('photo1'),
  photo2: text('photo2'),
  photo3: text('photo3'),     
  description: text('description'),
  short_description: text('short_description'),
  // user_id: text('user_id').references(() => user.id).notNull(),
  date_created: integer('date_created', { mode: 'timestamp' }) 
  // date_created: text("date_created").default(sql`CURRENT_TIMESTAMP`)
});


export const services = sqliteTable('services', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  points: integer('points').notNull(),
  photo: text('photo'),
  photo1: text('photo1'),
  photo2: text('photo2'),
  photo3: text('photo3'),     
  description: text('description'),
  short_description: text('short_description'),
  // user_id: text('user_id').references(() => user.id).notNull(),
  date_created: integer('date_created', { mode: 'timestamp' }) 
  // date_created: text("date_created").default(sql`CURRENT_TIMESTAMP`)
});


export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  points: integer('points').notNull(),
  measure: text('measure').notNull(),  
  amount: text('amount').notNull(),
  photo: text('photo'),
  notes: text('notes'),
  kind: text('kind'),
  status: text('status'),
  // transferee_id: text('user_id').references(() => user.id),
  // giver_id: text('user_id').references(() => user.id).notNull(),
  // getter_id: text('user_id').references(() => user.id).notNull(), 
  date_accepted: integer('date_accepted', { mode: 'timestamp' }),
  date_cancelled: integer('date_cancelled', { mode: 'timestamp' }),
  date_transferred: integer('date_transferred', { mode: 'timestamp' }),
  date_modified: integer('date_modified', { mode: 'timestamp' }),
  date_created: integer('date_created', { mode: 'timestamp' })
//   date_created: text("date_created").default(sql`CURRENT_TIMESTAMP`)
});

