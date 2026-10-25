import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { LoadingFallback } from '@/components/common/LoadingFallback';
import { StudentHomePage } from '@/pages/student/StudentHomePage';
import { LessonsPage } from '@/pages/student/LessonsPage';
import { LessonDetailPage } from '@/pages/student/LessonDetailPage';
import { QuizzesPage } from '@/pages/student/QuizzesPage';
import { ProgressPage } from '@/pages/student/ProgressPage';
import { TeacherDashboardPage } from '@/pages/teacher/TeacherDashboardPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { NotFoundPage } from '@/pages/common/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Main App Layout Route with Header, Sidebar, BottomNav, and ErrorBoundary */}
          <Route path="/" element={<AppShell />}>
            <Route index element={<StudentHomePage />} />
            <Route path="lessons" element={<LessonsPage />} />
            <Route path="lessons/:lessonId" element={<LessonDetailPage />} />
            <Route path="quizzes" element={<QuizzesPage />} />
            <Route path="quizzes/:quizId" element={<QuizzesPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="teacher" element={<TeacherDashboardPage />} />
            <Route path="admin" element={<AdminDashboardPage />} />
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
