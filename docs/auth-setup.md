# Project Udaan — Backend & Authentication Setup Guide

Project Udaan utilizes **Supabase** (PostgreSQL 15+ and Supabase Auth) as its online source of truth.

---

## 1. Prerequisites
- A free Supabase account at [supabase.com](https://supabase.com).
- Node.js 18+ and npm.

---

## 2. Environment Variables Configuration

Create a local environment file in the project root:
```bash
cp .env.example .env
```

Open `.env` and fill in your actual Supabase credentials:
```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...<your-public-anon-key>
```

> **Security Reminder**:
> Only use the **anon/public** key in client applications. **Never** include the `service_role` key in frontend `.env` files or commit credentials to source control.

---

## 3. Database Schema Setup

To support role-based authentication and profile resolution, run the following SQL snippet in your Supabase SQL Editor:

```sql
-- 1. Create role enum
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

-- 2. Create profiles table linked to auth.users
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    preferred_language TEXT NOT NULL DEFAULT 'pa' CHECK (preferred_language IN ('en', 'pa', 'hi')),
    school_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

-- Users can update display name and preferred language
CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 5. Trigger to automatically create profile on sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, role, preferred_language)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'student'::user_role),
    COALESCE(new.raw_user_meta_data->>'preferred_language', 'pa')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 4. Role-Aware Access Control Boundaries

| Role | Accessible Routes | Permitted Operations |
|---|---|---|
| **Student** | `/`, `/lessons`, `/quizzes`, `/progress` | Read public lessons, take quizzes offline/online, view own progress. |
| **Teacher** | All student routes + `/teacher` | View assigned class rosters, analyze quiz score distributions, identify struggling students. |
| **Admin** | All routes + `/admin` | School setup, class management, teacher assignment, curriculum publication. |

---

## 5. Offline Fallback & Developer Experience

When `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` are not set or contain placeholders:
- The student learning and lesson browsing interface remains fully functional locally.
- Protected routes display a friendly and actionable configuration banner guiding the developer on which exact variables are missing.
- Production login attempts explicitly require verified credentials and will refuse dummy logins.
