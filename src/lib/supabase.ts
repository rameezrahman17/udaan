import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '@/config/env';

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  missingKeys: string[];
}

export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const missing: string[] = [];
  const url = config.supabaseUrl;
  const anonKey = config.supabaseAnonKey;

  if (
    !url ||
    url.trim() === '' ||
    url.includes('placeholder') ||
    url.includes('your-project-ref')
  ) {
    missing.push('VITE_SUPABASE_URL');
  }

  if (
    !anonKey ||
    anonKey.trim() === '' ||
    anonKey.includes('placeholder') ||
    anonKey.includes('your-anon-key')
  ) {
    missing.push('VITE_SUPABASE_ANON_KEY');
  }

  return {
    isConfigured: missing.length === 0,
    missingKeys: missing,
  };
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const status = getSupabaseConfigStatus();
  if (!status.isConfigured) {
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return supabaseInstance;
}
