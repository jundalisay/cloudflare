import { error } from '@sveltejs/kit';

export async function GET() {
  try {
    // your API logic
  } catch (err) {
    console.error('API Error:', err);
    throw error(500, err.message); // This reveals error details in API response
  }
}
