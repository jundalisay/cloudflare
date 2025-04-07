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
  codename: text('codename').unique(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  pin: integer('pin'),
  phone: text('phone'),
  email: text('email'),
  avatar: text('avatar'),
  date_created: integer('date_created', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});



export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});


export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  user_id: text('user_id').references(() => users.id).notNull(),
  date_created: integer('date_created', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),  
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
  user_id: text('user_id').references(() => users.id).notNull(),
  date_created: integer('date_created', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
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
  user_id: text('user_id').references(() => users.id).notNull(),
  date_created: integer('date_created', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
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
  user_id: text('user_id').references(() => users.id).notNull(),  
  // transferee_id: text('user_id').references(() => users.id),
  // giver_id: text('user_id').references(() => users.id).notNull(),
  // getter_id: text('user_id').references(() => users.id).notNull(), 
  date_accepted: integer('date_accepted', { mode: 'timestamp' }),
  date_cancelled: integer('date_cancelled', { mode: 'timestamp' }),
  date_transferred: integer('date_transferred', { mode: 'timestamp' }),
  date_modified: integer('date_modified', { mode: 'timestamp' }),
  date_created: integer('date_created', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});



// RELATIONS

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  posts: many(posts),
}));


export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, { fields: [posts.user_id], references: [users.id] }),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

