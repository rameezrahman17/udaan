# Project Udaan — System Architecture & Design Specification

## 1. Executive Summary & Context
**Project Udaan** is an offline-first, multilingual digital learning platform specifically tailored for rural schools in and around Nabha, Punjab, India. These educational institutions experience limited access to modern hardware, frequent power/internet outages, and slow cellular connectivity (2G/3G/spotty 4G), creating barriers to acquiring digital literacy and technology skills.

Project Udaan delivers a lightweight, accessible Progressive Web Application (PWA) supporting English and Punjabi (with extensible Hindi support). It enables students to browse lessons, download media, practice computer fundamentals and internet safety offline, take interactive quizzes, and seamlessly synchronize progress whenever connectivity is re-established—without duplicate attempts or data corruption. Concurrently, teachers and administrators receive real-time or sync-updated analytics on student participation, class performance, and learners needing remediation.

---

## 2. Technology Stack Selection & Rationale

| Layer | Selection | Rationale & Trade-offs |
|---|---|---|
| **Frontend Framework** | React 18 / 19 + TypeScript | Component-based, vast ecosystem, high performance with virtual DOM, strict typing prevents runtime crashes on low-end devices. |
| **Build Tool & Bundler** | Vite | Ultra-fast HMR, lightweight asset bundling, granular chunk splitting, and modern ES module support optimized for low-bandwidth distribution. |
| **Styling & Design System** | Tailwind CSS + Accessible Headless UI / Lucide Icons | Utility-first CSS compiling to minimal static CSS payloads (<25KB gzipped), accessible contrast ratios, mobile-first responsive utilities, full Punjabi Unicode font support. |
| **Routing** | React Router v6 | Declarative client-side routing with nested layouts, protected route guards, and code-splitting per route. |
| **Local Offline Storage** | IndexedDB via Dexie.js | High-capacity browser storage (exceeding LocalStorage's 5MB cap), structured indices, robust transactional guarantees, and observable live queries. |
| **PWA & Caching Engine** | Vite PWA Plugin + Workbox | Standardized Service Worker lifecycle, CacheFirst strategies for static assets/lesson media, NetworkFirst/StaleWhileRevalidate for API reads, and background sync hooks. |
| **Cloud Backend & Database** | Supabase (PostgreSQL 15+) | Relational integrity, row-level security (RLS), real-time capabilities, integrated GoTrue authentication, and declarative SQL migrations. |
| **Data Visualization** | Recharts | Responsive SVG charts for teacher analytics dashboards with minimal overhead and reliable mobile touch support. |
| **Testing Suite** | Vitest + React Testing Library + Playwright | Unit and integration testing matching Vite pipeline; cross-browser E2E testing simulating offline states and service worker caching. |

---

## 3. High-Level Architecture & Data Flow

```
                      +------------------------------------------+
                      |         Student / Teacher Client         |
                      |   (Mobile Browser / Installed PWA)       |
                      +--------------------+---------------------+
                                           |
                   +-----------------------+-----------------------+
                   |                                               |
                   v                                               v
        +---------------------+                        +-----------------------+
        |   Presentation UI   |                        |    Service Worker     |
        |  (React/Tailwind)   |                        |  (Workbox PWA Engine) |
        +----------+----------+                        +-----------+-----------+
                   |                                               |
                   v                                               v
        +---------------------+                        +-----------------------+
        |  State & Storage    |                        | Cache Storage (Cache  |
        |     Manager         |                        | API: Shell, CSS, JS,  |
        +----+-----------+----+                        | Audio, SVG assets)    |
             |           |                             +-----------------------+
             v           v
     +------------+  +-------------------+
     |  Dexie.js  |  |  Sync Engine &    |
     | (IndexedDB |  |  Mutation Queue   |
     |  Database) |  +---------+---------+
     +------------+            |
                               | (When Online: Exponential Backoff & Idempotent Push)
                               v
               +-------------------------------+
               |    Supabase REST / PostgREST  |
               |      (HTTPS + JWT Bearer)     |
               +---------------+---------------+
                               |
                               v
               +-------------------------------+
               |    PostgreSQL Database        |
               |  (Row Level Security Policies)|
               +-------------------------------+
```

---

## 4. Offline-First Storage & Synchronization Strategy

### 4.1 Local Data Schema (Dexie.js / IndexedDB)
The client maintains a local replica of required pedagogical data and operational queues:
- `lessons`: Stored lesson entities (id, title_en, title_pa, content_en, content_pa, difficulty, subject_id, published, last_cached_at).
- `quizzes`: Stored quiz entities linked to lessons.
- `quiz_questions`: Questions with localized text, multi-choice options, correct option index, and explanations.
- `lesson_progress`: Student progress records (`lesson_id`, `status`: in_progress | completed, `time_spent_seconds`, `last_accessed_at`).
- `quiz_attempts`: Local quiz submission records (`attempt_id` UUID, `quiz_id`, `score`, `total_questions`, `answers` JSON, `completed_at`, `sync_status`: pending | synced | failed).
- `sync_queue`: Ordered mutations waiting for upstream transmission (`id`, `endpoint`, `action`, `payload`, `idempotency_key`, `created_at`, `retry_count`, `last_error`).

### 4.2 Idempotent Synchronization Lifecycle
1. **Offline Mutation Capture**:
   When a student completes a quiz or advances in a lesson while offline, the action is committed transactionally to `quiz_attempts` / `lesson_progress` and enqueued into `sync_queue` with a client-generated UUID (`idempotency_key` or `attempt_id`).
2. **Connectivity Detection**:
   The client listens to `window.addEventListener('online')` and `navigator.onLine`, supplemented with an active heartbeat ping (`/health` or Supabase REST ping) to bypass captive portals and false-positive Wi-Fi links.
3. **Queue Processing**:
   - The queue processor reads items FIFO per entity.
   - Mutations are transmitted via HTTP POST/UPSERT using the `idempotency_key` as primary key or unique constraint in PostgreSQL.
   - Upon HTTP 200/201 response, the local item's `sync_status` updates to `synced`, and the queue entry is pruned.
4. **Conflict Resolution Policy**:
   - **Lesson Progress**: "Last write wins" based on `updated_at` timestamp or monotonic progression (e.g., status cannot regress from `completed` to `in_progress`).
   - **Quiz Attempts**: Append-only log. Since each attempt is identified by a unique client-generated UUID `attempt_id`, duplicate network retries perform an idempotent no-op (UPSERT on conflict do nothing or match existing score).

---

## 5. Relational Database Schema & Security Boundaries

### 5.1 Core Database Tables (PostgreSQL)

```sql
-- Profiles & Roles
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    preferred_language TEXT NOT NULL DEFAULT 'pa' CHECK (preferred_language IN ('en', 'pa', 'hi')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Schools & Classes
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    teacher_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE class_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    UNIQUE(class_id, student_id)
);

-- Curriculum & Lessons
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_pa TEXT NOT NULL,
    icon TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    title_en TEXT NOT NULL,
    title_pa TEXT NOT NULL,
    content_en JSONB NOT NULL,
    content_pa JSONB NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    order_index INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE UNIQUE,
    title_en TEXT NOT NULL,
    title_pa TEXT NOT NULL,
    passing_score INT NOT NULL DEFAULT 70,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question_en TEXT NOT NULL,
    question_pa TEXT NOT NULL,
    options_en JSONB NOT NULL, -- Array of strings
    options_pa JSONB NOT NULL, -- Array of strings
    correct_option_index INT NOT NULL,
    explanation_en TEXT,
    explanation_pa TEXT,
    order_index INT NOT NULL DEFAULT 0
);

-- Progress & Analytics
CREATE TABLE lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed')),
    time_spent_seconds INT NOT NULL DEFAULT 0,
    last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
    UNIQUE(student_id, lesson_id)
);

CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY, -- Client-generated UUID for idempotency
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    answers JSONB NOT NULL,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

CREATE TABLE sync_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    device_info JSONB,
    items_synced INT NOT NULL DEFAULT 0,
    sync_errors JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);
```

### 5.2 Row Level Security (RLS) Policies
Row-level security ensures client requests cannot manipulate or read foreign user records:

1. **Profiles**:
   - `SELECT`: Any authenticated user can view their own profile; teachers can view profiles of students in their assigned classes; admins can view all.
   - `UPDATE`: Users can update only their own profile display name and language preferences; role changes are restricted to admins.
2. **Lessons & Quizzes**:
   - `SELECT`: Public or authenticated read access for published lessons (`is_published = true`); admins can read drafts.
   - `INSERT / UPDATE / DELETE`: Only administrators.
3. **Lesson Progress & Quiz Attempts**:
   - `SELECT`:
     - Students can read ONLY their own records (`student_id = auth.uid()`).
     - Teachers can read records for students enrolled in classes assigned to them (`classes.teacher_id = auth.uid()`).
     - Admins can read all.
   - `INSERT / UPDATE`:
     - Students can insert/update only their own records (`student_id = auth.uid()`).

---

## 6. Multilingual Architecture (English & Punjabi)
- **Localization Infrastructure**: A typed lightweight i18n translation dictionary system covering UI labels, navigation buttons, offline indicator badges, and error strings.
- **Bi-directional Content Modeling**: Content schema stores paired `_en` and `_pa` text fields (Gurumukhi script) alongside phonetic or audio hints where applicable.
- **Font & Rendering Optimizations**: System fonts fallback with high-legibility Gurmukhi fonts (e.g., Noto Sans Gurmukhi) bundled or cached locally to eliminate render blocking and FOIT (Flash of Invisible Text).

---

## 7. Performance & Low-End Device Accommodations
- **Bundle Budgets**: Core JavaScript bundle < 150KB gzipped; total initial page load < 300KB.
- **Media Optimization**: Educational diagrams stored as compressed SVGs or modern WebP formats (<50KB per illustration).
- **DOM & Render Optimization**: Minimal component re-renders, CSS transitions over heavy JavaScript animations, zero complex 3D or memory-intensive libraries.
- **Battery & Memory Care**: Periodic background sync queues run with throttling to prevent CPU spikes on entry-level Android chipsets.
