import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LessonsPage } from './LessonsPage';
import { getLessonLibrary } from '@/services/lessonLibraryService';

describe('LessonsPage Component (Lesson Library)', () => {
  it('loads and displays lessons catalog with fallback to demo content when unconfigured', async () => {
    const lib = await getLessonLibrary();
    expect(lib.lessons.length).toBeGreaterThan(0);
    expect(lib.isDemo).toBe(true);

    render(
      <MemoryRouter>
        <LessonsPage />
      </MemoryRouter>
    );

    // Verify main library title
    await waitFor(() => {
      expect(screen.getByText(/ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ • Digital Literacy Library/i)).toBeInTheDocument();
    });

    // Check that lesson cards are present
    expect(screen.getByText(/ਕੰਪਿਊਟਰ ਹਾਰਡਵੇਅਰ: ਸੀ.ਪੀ.ਯੂ., ਮਾਨੀਟਰ ਅਤੇ ਸਟੋਰੇਜ/i)).toBeInTheDocument();
    expect(screen.getByText(/ਮਾਊਸ ਨੈਵੀਗੇਸ਼ਨ, ਖੱਬਾ ਕਲਿੱਕ ਅਤੇ ਡਰੈਗਿੰਗ ਅਭਿਆਸ/i)).toBeInTheDocument();
  });

  it('filters lessons when typing search query', async () => {
    render(
      <MemoryRouter>
        <LessonsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/ਕੰਪਿਊਟਰ ਹਾਰਡਵੇਅਰ: ਸੀ.ਪੀ.ਯੂ., ਮਾਨੀਟਰ ਅਤੇ ਸਟੋਰੇਜ/i)).toBeInTheDocument();
    });

    // Search for "password" in English or Punjabi
    const searchInput = screen.getByLabelText(/ਪਾਠ ਖੋਜੋ/i);
    fireEvent.change(searchInput, { target: { value: 'password' } });

    // Should show password lesson
    expect(screen.getByText(/ਮਜ਼ਬੂਤ ਅਤੇ ਅਭੇਦ ਪਾਸਵਰਡ ਬਣਾਉਣ ਦੀ ਕਲਾ/i)).toBeInTheDocument();

    // Should NOT show mouse lesson
    expect(screen.queryByText(/ਮਾਊਸ ਨੈਵੀਗੇਸ਼ਨ, ਖੱਬਾ ਕਲਿੱਕ ਅਤੇ ਡਰੈਗਿੰਗ ਅਭਿਆਸ/i)).not.toBeInTheDocument();
  });

  it('filters lessons by difficulty selector', async () => {
    render(
      <MemoryRouter>
        <LessonsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/ਕੰਪਿਊਟਰ ਹਾਰਡਵੇਅਰ: ਸੀ.ਪੀ.ਯੂ., ਮਾਨੀਟਰ ਅਤੇ ਸਟੋਰੇਜ/i)).toBeInTheDocument();
    });

    const difficultySelect = screen.getByLabelText(/ਮੁਸ਼ਕਿਲ ਪੱਧਰ ਚੁਣੋ/i);
    fireEvent.change(difficultySelect, { target: { value: 'advanced' } });

    // Advanced lesson (Gurmukhi typing) should show
    expect(screen.getByText(/ਗੁਰਮੁਖੀ ਟਾਈਪਿੰਗ ਅਤੇ ਡਿਜੀਟਲ ਦਸਤਾਵੇਜ਼ ਬਣਾਉਣਾ/i)).toBeInTheDocument();

    // Beginner lesson should be excluded
    expect(screen.queryByText(/ਕੰਪਿਊਟਰ ਹਾਰਡਵੇਅਰ: ਸੀ.ਪੀ.ਯੂ., ਮਾਨੀਟਰ ਅਤੇ ਸਟੋਰੇਜ/i)).not.toBeInTheDocument();
  });

  it('displays empty state when no lessons match query and allows clearing filters', async () => {
    render(
      <MemoryRouter>
        <LessonsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/ਕੰਪਿਊਟਰ ਹਾਰਡਵੇਅਰ: ਸੀ.ਪੀ.ਯੂ., ਮਾਨੀਟਰ ਅਤੇ ਸਟੋਰੇਜ/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText(/ਪਾਠ ਖੋਜੋ/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistent-query-xyz' } });

    expect(screen.getByText(/ਕੋਈ ਪਾਠ ਨਹੀਂ ਮਿਲਿਆ/i)).toBeInTheDocument();
    expect(screen.getByText(/No Lessons Match Your Filters/i)).toBeInTheDocument();

    const clearButton = screen.getByRole('button', { name: /ਸਾਰੇ ਫਿਲਟਰ ਸਾਫ਼ ਕਰੋ/i });
    fireEvent.click(clearButton);

    // After clearing, lessons reappear
    expect(screen.getByText(/ਕੰਪਿਊਟਰ ਹਾਰਡਵੇਅਰ: ਸੀ.ਪੀ.ਯੂ., ਮਾਨੀਟਰ ਅਤੇ ਸਟੋਰੇਜ/i)).toBeInTheDocument();
  });
});
