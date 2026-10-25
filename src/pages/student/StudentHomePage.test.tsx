import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { StudentHomePage } from './StudentHomePage';
import { getStudentDashboard } from '@/services/studentService';

describe('StudentHomePage Component', () => {
  it('identifies unconfigured backend and renders demo mode banner', async () => {
    const dashboardResult = await getStudentDashboard(null);
    expect(dashboardResult.isDemo).toBe(true);

    render(
      <MemoryRouter>
        <AuthProvider>
          <StudentHomePage />
        </AuthProvider>
      </MemoryRouter>
    );

    // Should display the explicit demo warning alert
    await waitFor(() => {
      expect(screen.getByText(/ਡੈਮੋ ਸਮੱਗਰੀ ਮੋਡ • Demonstration Mode/i)).toBeInTheDocument();
    });

    // Verifies it clearly states this is sample data, not real DB response
    expect(screen.getByText(/ਇਹ ਸਕ੍ਰੀਨ/i)).toBeInTheDocument();
  });

  it('renders student welcome heading, completion metrics, and subjects', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <StudentHomePage />
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/ਜੀ ਆਇਆਂ ਨੂੰ/i)).toBeInTheDocument();
    });

    // Check completion summary cards
    expect(screen.getByText(/ਕੁੱਲ ਪਾਠ \(Lessons\)/i)).toBeInTheDocument();
    expect(screen.getByText(/ਮੁਕੰਮਲ ਕੀਤੇ \(Done\)/i)).toBeInTheDocument();

    // Check continue learning
    expect(screen.getByText(/ਜਾਰੀ ਰੱਖੋ • Continue Learning/i)).toBeInTheDocument();
    expect(screen.getByText(/ਕੰਪਿਊਟਰ ਕੀਬੋਰਡ ਦੀ ਵਰਤੋਂ/i)).toBeInTheDocument();

    // Check available subjects
    expect(screen.getByText(/ਕੰਪਿਊਟਰ ਬੁਨਿਆਦ/i)).toBeInTheDocument();
    expect(screen.getByText(/ਇੰਟਰਨੈੱਟ ਸੁਰੱਖਿਆ ਅਤੇ ਸਾਈਬਰ ਜਾਗਰੂਕਤਾ/i)).toBeInTheDocument();

    // Check recent quiz results
    expect(screen.getByText(/ਮਾਊਸ ਸਕਿੱਲਜ਼ ਅਤੇ ਕਲਿੱਕਿੰਗ ਅਭਿਆਸ/i)).toBeInTheDocument();
  });
});
