import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AppShell } from '@/components/layout/AppShell';
import { LoadingFallback } from '@/components/common/LoadingFallback';
import { StudentHomePage } from '@/pages/student/StudentHomePage';
import { LessonsPage } from '@/pages/student/LessonsPage';
import { LessonDetailPage } from '@/pages/student/LessonDetailPage';
import { QuizzesPage } from '@/pages/student/QuizzesPage';
import { ProgressPage } from '@/pages/student/ProgressPage';
import { TeacherDashboardPage } from '@/pages/teacher/TeacherDashboardPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { NotFoundPage } from '@/pages/common/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<AppShell />}>
              {/* Public & Student Routes */}
              <Route index element={<StudentHomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="lessons" element={<LessonsPage />} />
              <Route path="lessons/:lessonId" element={<LessonDetailPage />} />
              <Route path="quizzes" element={<QuizzesPage />} />
              <Route path="quizzes/:quizId" element={<QuizzesPage />} />

              {/* Protected Student Progress Route */}
              <Route
                path="progress"
                element={
                  <ProtectedRoute allowedRoles={['student', 'teacher', 'admin']}>
                    <ProgressPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Teacher Dashboard Route */}
              <Route
                path="teacher"
                element={
                  <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                    <TeacherDashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Administrator Route */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
