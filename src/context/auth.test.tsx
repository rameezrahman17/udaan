import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LoginPage } from '@/pages/auth/LoginPage';
import { getSupabaseConfigStatus } from '@/lib/supabase';

describe('Authentication & Protected Route Flow', () => {
  it('correctly detects placeholder Supabase configuration', () => {
    const status = getSupabaseConfigStatus();
    // Default env has placeholders
    expect(status.isConfigured).toBe(false);
    expect(status.missingKeys).toContain('VITE_SUPABASE_URL');
    expect(status.missingKeys).toContain('VITE_SUPABASE_ANON_KEY');
  });

  it('renders login form and shows configuration guidance when unconfigured', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/ਖਾਤੇ ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ਈਮੇਲ ਪਤਾ/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ਪਾਸਵਰਡ/i)).toBeInTheDocument();
    expect(screen.getByText(/ਸੁਚੇਤਨਾ: ਬੈਕਐਂਡ ਕਨਫ਼ੀਗਰੇਸ਼ਨ/i)).toBeInTheDocument();
  });

  it('blocks unconfigured protected routes with helpful guidance', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthProvider>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <div>ਸੁਰੱਖਿਅਤ ਖੇਤਰ</div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/ਸੁਰੱਖਿਅਤ ਪਹੁੰਚ ਲਈ Supabase ਦੀ ਲੋੜ ਹੈ/i)).toBeInTheDocument();
    expect(screen.queryByText('ਸੁਰੱਖਿਅਤ ਖੇਤਰ')).not.toBeInTheDocument();
  });
});
