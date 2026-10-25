export type UserRole = 'student' | 'teacher' | 'admin';
export type PreferredLanguage = 'pa' | 'en' | 'hi';

export interface UserProfile {
  id: string;
  display_name: string;
  role: UserRole;
  preferred_language: PreferredLanguage;
  school_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  user: {
    id: string;
    email?: string;
  };
  profile: UserProfile | null;
}
