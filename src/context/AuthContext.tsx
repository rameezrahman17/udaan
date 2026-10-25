import React, { createContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { getSupabaseClient, getSupabaseConfigStatus } from '@/lib/supabase';
import { UserProfile, UserRole } from '@/types/auth.types';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  role: UserRole | null;
  isLoading: boolean;
  isBackendConfigured: boolean;
  missingConfigKeys: string[];
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const configStatus = useMemo(() => getSupabaseConfigStatus(), []);

  // Fetch verified profile from profiles table (online source of truth)
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, role, preferred_language, school_id, created_at, updated_at')
        .eq('id', userId)
        .single();

      if (error || !data) {
        console.warn('Could not fetch server profile for user:', userId, error?.message);
        return null;
      }

      return data as UserProfile;
    } catch (err) {
      console.error('Error fetching user profile:', err);
      return null;
    }
  };

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    // Load initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        fetchProfile(currentUser.id).then((userProfile) => {
          if (isMounted) {
            setProfile(userProfile);
            setIsLoading(false);
          }
        });
      } else {
        setIsLoading(false);
      }
    });

    // Listen to auth state transitions
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const userProfile = await fetchProfile(currentUser.id);
        if (isMounted) {
          setProfile(userProfile);
        }
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return {
        error: new Error(
          `Supabase is not configured. Missing environment variables: ${configStatus.missingKeys.join(', ')}`
        ),
      };
    }

    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setIsLoading(false);
      return { error };
    }

    if (data.user) {
      const userProfile = await fetchProfile(data.user.id);
      setProfile(userProfile);
    }

    setIsLoading(false);
    return { error: null };
  };

  const signOut = async (): Promise<{ error: Error | null }> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setUser(null);
      setProfile(null);
      return { error: null };
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsLoading(false);

    return { error };
  };

  const refreshProfile = async (): Promise<void> => {
    if (user) {
      const userProfile = await fetchProfile(user.id);
      setProfile(userProfile);
    }
  };

  const role: UserRole | null = profile?.role ?? null;

  const value: AuthContextValue = {
    user,
    profile,
    role,
    isLoading,
    isBackendConfigured: configStatus.isConfigured,
    missingConfigKeys: configStatus.missingKeys,
    signIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export type { AuthContextValue };
