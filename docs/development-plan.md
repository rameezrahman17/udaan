# Project Udaan — 20-Phase Implementation Roadmap & Commit Mapping

This plan outlines the 20 phased iterations required to deliver Project Udaan from an empty repository to a production-ready, offline-first digital learning platform for rural Nabha.

---

## Commit & Phase Map

### Phase 01: Architecture & Development Roadmap
- **Scope**: Repository inspection, system architecture specification, database schema design, and step-by-step 20-phase master development roadmap.
- **Files Modified / Added**:
  - `docs/architecture.md`
  - `docs/development-plan.md`
- **Verification**: Markdown linting, directory checks, git status review.
- **Target Commit Message**: `docs: define project architecture and development roadmap`

---

### Phase 02: Core Frontend Tooling & PWA Foundation
- **Scope**: Initialize React 18+ with TypeScript, Vite, Tailwind CSS configuration, and Vite PWA setup with Web App Manifest and Service Worker scaffolding.
- **Files Modified / Added**:
  - `package.json`, `tsconfig.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`
  - `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`
  - `public/manifest.json`, `public/icons/*`
- **Verification**: `npm run build`, `npm run lint`
- **Target Commit Message**: `chore: scaffold React Vite TypeScript and PWA foundation`

---

### Phase 03: Localization Engine (English & Punjabi)
- **Scope**: Type-safe i18n translation context and dictionary system supporting English (`en`) and Punjabi Gurmukhi (`pa`), language switcher UI, and font styling for Gurmukhi script.
- **Files Modified / Added**:
  - `src/i18n/types.ts`, `src/i18n/translations/en.ts`, `src/i18n/translations/pa.ts`
  - `src/context/LanguageContext.tsx`, `src/components/common/LanguageSwitcher.tsx`
- **Verification**: Unit tests verifying dictionary completeness and key parity.
- **Target Commit Message**: `feat(i18n): implement English and Punjabi localization system`

---

### Phase 04: Local Offline Database Layer (Dexie.js / IndexedDB)
- **Scope**: Configure Dexie IndexedDB client with tables for cached lessons, subjects, quizzes, quiz questions, local progress, quiz attempts, and mutation sync queue.
- **Files Modified / Added**:
  - `src/db/index.ts`, `src/db/schema.ts`, `src/db/repositories/*.ts`
- **Verification**: Vitest tests verifying transactional CRUD and querying on mock IndexedDB.
- **Target Commit Message**: `feat(offline): initialize Dexie IndexedDB database and repositories`

---

### Phase 05: Supabase Client & Database Migrations
- **Scope**: Define initial SQL migrations for PostgreSQL tables (`profiles`, `schools`, `classes`, `subjects`, `lessons`, `quizzes`, `progress`, `attempts`), configure Supabase client with environment variables and TypeScript database definitions.
- **Files Modified / Added**:
  - `supabase/migrations/001_initial_schema.sql`
  - `src/lib/supabase.ts`, `src/types/database.types.ts`
  - `.env.example`
- **Verification**: SQL syntax validation, Supabase client configuration validation.
- **Target Commit Message**: `feat(backend): configure Supabase client and initial database schema`

---

### Phase 06: Row Level Security (RLS) & Access Control Policies
- **Scope**: Implement SQL migration applying strict RLS policies ensuring students access only their records, teachers view assigned classes, and administrators have granular permissions.
- **Files Modified / Added**:
  - `supabase/migrations/002_row_level_security.sql`
  - `docs/security.md`
- **Verification**: RLS policy unit tests and rule coverage checks.
- **Target Commit Message**: `security(rls): enforce row level security policies for student and teacher roles`

---

### Phase 07: Authentication Context & Session Management
- **Scope**: Build user authentication state provider with Supabase Auth integration, offline session caching, and mock/demo user switcher for low-connectivity field testing.
- **Files Modified / Added**:
  - `src/context/AuthContext.tsx`, `src/components/auth/LoginForm.tsx`, `src/components/auth/ProtectedRoute.tsx`
- **Verification**: Tests for session persistence and protected route redirection.
- **Target Commit Message**: `feat(auth): implement authentication context and role-based route guards`

---

### Phase 08: App Shell & Responsive Layouts
- **Scope**: Construct accessible mobile-first navigation bar, offline status banner, bottom navigation tab for mobile devices, and desktop sidebar layout.
- **Files Modified / Added**:
  - `src/components/layout/AppShell.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/BottomNav.tsx`
  - `src/components/common/OfflineBanner.tsx`
- **Verification**: UI rendering and viewport responsiveness checks.
- **Target Commit Message**: `feat(ui): build responsive application shell and navigation layouts`

---

### Phase 09: Curriculum & Lesson Seed Data
- **Scope**: Create realistic educational seed datasets in English and Punjabi focused on digital literacy, computer fundamentals, mouse/keyboard usage, and internet safety.
- **Files Modified / Added**:
  - `src/data/seedData.ts`, `supabase/seed.sql`
  - `scripts/seed-local-db.ts`
- **Verification**: Validation of Punjabi Unicode text formatting and lesson schema conformance.
- **Target Commit Message**: `feat(curriculum): author bilingual digital literacy curriculum and seed data`

---

### Phase 10: Student Learning Library UI
- **Scope**: Build student home and subject browsing screen with topic filtering, difficulty badges, search, download-for-offline toggles, and cached status indicators.
- **Files Modified / Added**:
  - `src/pages/student/LibraryPage.tsx`, `src/components/lessons/LessonCard.tsx`, `src/components/lessons/SubjectFilter.tsx`
- **Verification**: Component render tests with mocked lesson sets.
- **Target Commit Message**: `feat(student): build lesson library and subject browsing interface`

---

### Phase 11: Interactive Lesson Viewer & Content Delivery
- **Scope**: Implement accessible bilingual lesson reader with step-by-step slides, rich text formatting, illustrations, audio pronunciation hints, and time tracking.
- **Files Modified / Added**:
  - `src/pages/student/LessonViewPage.tsx`, `src/components/lessons/LessonSlide.tsx`, `src/components/lessons/ProgressBar.tsx`
- **Verification**: Interactive navigation test through multi-slide lesson.
- **Target Commit Message**: `feat(student): implement interactive bilingual lesson viewer`

---

### Phase 12: Offline Lesson Caching Engine
- **Scope**: Enable explicit and automatic caching of lesson materials and associated quiz assets into Dexie and Service Worker Cache API for full offline availability.
- **Files Modified / Added**:
  - `src/services/lessonCacheService.ts`, `src/hooks/useLessonCache.ts`, `src/components/lessons/CacheButton.tsx`
- **Verification**: Tests validating offline retrieval of cached lessons when network is simulated offline.
- **Target Commit Message**: `feat(offline): implement local lesson caching and storage manager`

---

### Phase 13: Interactive Quiz Engine
- **Scope**: Build interactive quiz interface supporting single/multiple-choice questions, instant bilingual explanations, score calculation, and completion summary badges.
- **Files Modified / Added**:
  - `src/pages/student/QuizPage.tsx`, `src/components/quiz/QuestionCard.tsx`, `src/components/quiz/QuizResults.tsx`
- **Verification**: Vitest tests calculating scores and verifying answer validation.
- **Target Commit Message**: `feat(quiz): build interactive quiz runner with instant feedback`

---

### Phase 14: Local Progress & Quiz Attempt Persistence
- **Scope**: Store lesson completions, time spent, and quiz attempt scores locally in IndexedDB with idempotent UUID keys, rendering local progress immediately without cloud dependence.
- **Files Modified / Added**:
  - `src/services/progressService.ts`, `src/hooks/useStudentProgress.ts`, `src/pages/student/StudentProgressPage.tsx`
- **Verification**: Data persistence test through page reloads in offline browser environment.
- **Target Commit Message**: `feat(student): persist local lesson progress and quiz attempts`

---

### Phase 15: Background Synchronization & Retry Queue
- **Scope**: Implement robust synchronization service that monitors network transitions, drains pending progress/quiz mutations sequentially, applies exponential backoff, and logs sync events.
- **Files Modified / Added**:
  - `src/services/syncService.ts`, `src/hooks/useSyncStatus.ts`, `src/components/common/SyncStatusIndicator.tsx`
- **Verification**: Mock network recovery test verifying pending queue resolution and zero duplicate writes.
- **Target Commit Message**: `feat(sync): implement resilient background synchronization engine`

---

### Phase 16: Teacher Analytics Dashboard
- **Scope**: Develop teacher overview showing class enrollment, aggregate completion metrics, quiz pass rates, recent student activity, and sync timestamps using Recharts.
- **Files Modified / Added**:
  - `src/pages/teacher/DashboardPage.tsx`, `src/components/analytics/ClassMetricsOverview.tsx`, `src/components/analytics/ScoreDistributionChart.tsx`
- **Verification**: Component tests for metric aggregation and chart rendering.
- **Target Commit Message**: `feat(teacher): build class performance dashboard and analytics charts`

---

### Phase 17: Struggling Learners & Student Detail Views
- **Scope**: Add teacher drill-down views to inspect individual student progress, identify learners falling behind passing thresholds, and track sync recency.
- **Files Modified / Added**:
  - `src/pages/teacher/StudentDetailPage.tsx`, `src/components/analytics/StrugglingLearnersTable.tsx`
- **Verification**: Test identifying learners with quiz scores below 70% or inactive sync status.
- **Target Commit Message**: `feat(teacher): implement student diagnostic view and intervention alerts`

---

### Phase 18: Administrator Management Portal
- **Scope**: Admin interface to manage school profiles, teacher assignments, class rosters, curriculum publication status, and view sync audit logs.
- **Files Modified / Added**:
  - `src/pages/admin/AdminDashboardPage.tsx`, `src/components/admin/SchoolManagement.tsx`, `src/components/admin/LessonManager.tsx`
- **Verification**: Admin-only permission checks and content toggle verification.
- **Target Commit Message**: `feat(admin): build school, roster, and lesson administration portal`

---

### Phase 19: Comprehensive Testing Suite (Unit, Integration, E2E)
- **Scope**: End-to-end and integration test suite testing offline lesson reading, quiz taking while offline, reconnecting and synchronizing, and teacher dashboard verification.
- **Files Modified / Added**:
  - `tests/unit/*.test.ts`, `tests/integration/*.test.tsx`, `playwright.config.ts`, `tests/e2e/offline-sync.spec.ts`
- **Verification**: Complete test run passing with coverage report.
- **Target Commit Message**: `test: add comprehensive unit integration and offline e2e tests`

---

### Phase 20: Production Hardening, PWA Audit & Deployment Guides
- **Scope**: Lighthouse accessibility/PWA audit compliance, bundle optimization, security header definitions, offline fallback pages, and step-by-step local & cloud deployment documentation.
- **Files Modified / Added**:
  - `docs/deployment.md`, `README.md`, `vercel.json`, `robots.txt`
- **Verification**: Production build pass, bundle size analysis (<300KB initial chunk).
- **Target Commit Message**: `chore: optimize production build and finalize deployment documentation`
