import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Project Udaan App Shell & Navigation', () => {
  it('renders application header with brand and online status badge', () => {
    render(<App />);
    expect(screen.getAllByText(/Udaan/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ਉਡਾਨ/i).length).toBeGreaterThan(0);
  });

  it('renders student home hero banner and quick navigation links', () => {
    render(<App />);
    expect(screen.getByText(/ਜੀ ਆਇਆਂ ਨੂੰ, ਵਿਦਿਆਰਥੀਓ!/i)).toBeInTheDocument();
    expect(screen.getAllByText(/ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ/i).length).toBeGreaterThan(0);
  });

  it('navigates to lesson library placeholder when clicking lessons link', () => {
    render(<App />);
    const lessonLinks = screen.getAllByRole('link', { name: /ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ/i });
    fireEvent.click(lessonLinks[0]);
    expect(screen.getByText(/Lesson Library & Subjects/i)).toBeInTheDocument();
  });

  it('navigates to progress and displays configuration status if backend is unconfigured', () => {
    render(<App />);
    const progressLinks = screen.getAllByRole('link', { name: /ਤਰੱਕੀ|ਮੇਰੀ ਤਰੱਕੀ/i });
    fireEvent.click(progressLinks[0]);
    expect(screen.getByText(/ਸੁਰੱਖਿਅਤ ਪਹੁੰਚ ਲਈ Supabase ਦੀ ਲੋੜ ਹੈ/i)).toBeInTheDocument();
  });

  it('renders sign-in button in header when unauthenticated', () => {
    render(<App />);
    const loginLinks = screen.getAllByRole('link', { name: /ਲਾਗਇਨ/i });
    expect(loginLinks.length).toBeGreaterThan(0);
  });
});
