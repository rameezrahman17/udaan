/**
 * Type-safe access to environment variables with fallback defaults.
 */
export const config = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key',
  appTitle: import.meta.env.VITE_APP_TITLE || 'Project Udaan',
  defaultLanguage: (import.meta.env.VITE_DEFAULT_LANGUAGE || 'pa') as 'pa' | 'en' | 'hi',
  enableOfflineSync: import.meta.env.VITE_ENABLE_OFFLINE_SYNC === 'true',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};
