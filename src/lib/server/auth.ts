// src/lib/server/auth.ts
import bcrypt from 'bcryptjs';
import { db } from './db';
import { users, sessions } from './db/schema';
import { eq, and, lt } from 'drizzle-orm';
// import crypto from 'crypto';
import { json } from '@sveltejs/kit';


function generateUUID() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);

  // Set version (4) and variant bits
  array[6] = (array[6] & 0x0f) | 0x40; // Version 4
  array[8] = (array[8] & 0x3f) | 0x80; // Variant 1

  return [...array]
    .map((b, i) =>
      ([4, 6, 8, 10].includes(i) ? '-' : '') + b.toString(16).padStart(2, '0')
    )
    .join('');
}




export async function registerUser(username: string, password: string) {
  try {
    // Check if user already exists
    // const existingUser = await db.query.users.findFirst({
    //   where: eq(users.username, username)
    // });

    const existingUser = await db.select().from(users).where(eq(users.username, username)).limit(1).get();

    if (existingUser) {
      return { success: false, error: 'Username already taken' };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = generateUUID();
    // const userId = crypto.randomUUID();

    // Create user
    await db.insert(users).values({
      id: userId,
      username,
      password: hashedPassword
    });

    return { success: true, userId };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
}


export async function loginUser(username: string, password: string) {

  console.log("logging in..");

  try {
    // Find user
    const user = await db.select().from(users).where(eq(users.username, username)).limit(1).get();

    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Create a new session
    const sessionId = crypto.randomUUID();
    // Set expiration to 7 days from now
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await db.insert(sessions).values({
      id: sessionId,
      userId: user.id,
      expiresAt
    });

    return { 
      success: true, 
      user: { id: user.id, username: user.username },
      sessionId
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
  }
}

export async function validateSession(sessionId: string) {
  try {
    // Find the session
    const session = await db.query.sessions.findFirst({
      where: eq(sessions.id, sessionId),
      with: {
        user: true // This requires setting up relations in the schema
      }
    });

    // If session doesn't exist or is expired
    if (!session || new Date(session.expiresAt) < new Date()) {
      // Clean up expired session if it exists
      if (session) {
        await db.delete(sessions).where(eq(sessions.id, sessionId));
      }
      return { valid: false };
    }

    // Get user info
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.userId),
      columns: {
        id: true,
        username: true,
        // Exclude password
      }
    });

    if (!user) {
      // This shouldn't happen, but just in case
      await db.delete(sessions).where(eq(sessions.id, sessionId));
      return { valid: false };
    }

    return { valid: true, user };
  } catch (error) {
    console.error('Session validation error:', error);
    return { valid: false };
  }
}

export async function signOutUser(sessionId: string) {
  try {
    // Delete the session
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: 'Logout failed' };
  }
}

// Utility function to clean up expired sessions
export async function cleanExpiredSessions() {
  try {
    await db.delete(sessions).where(
      lt(sessions.expiresAt, new Date())
    );
  } catch (error) {
    console.error('Error cleaning expired sessions:', error);
  }
}





