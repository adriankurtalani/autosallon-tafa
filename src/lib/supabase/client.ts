import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a dummy client if env vars are not set (for build time)
let supabase: ReturnType<typeof createClient<Database>>;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Please check your .env.local file.');
  // Create a dummy client with placeholder values to prevent build errors
  supabase = createClient<Database>('https://placeholder.supabase.co', 'placeholder-key');
} else {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export { supabase };

