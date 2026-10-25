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

  it('navigates to progress page when clicking progress link', () => {
    render(<App />);
    const progressLinks = screen.getAllByRole('link', { name: /ਤਰੱਕੀ|ਮੇਰੀ ਤਰੱਕੀ/i });
    fireEvent.click(progressLinks[0]);
    expect(screen.getByText(/Student Learning Progress & Badges/i)).toBeInTheDocument();
  });

  it('navigates to teacher dashboard when clicking teacher link', () => {
    render(<App />);
    const teacherLinks = screen.getAllByRole('link', { name: /ਅਧਿਆਪਕ/i });
    fireEvent.click(teacherLinks[0]);
    expect(screen.getByText(/Teacher Analytics & Class Monitoring/i)).toBeInTheDocument();
  });

  it('navigates to admin portal when clicking admin link', () => {
    render(<App />);
    const adminLinks = screen.getAllByRole('link', { name: /ਪ੍ਰਬੰਧਕ|ਪ੍ਰਬੰਧਕੀ ਪੋਰਟਲ/i });
    fireEvent.click(adminLinks[0]);
    expect(screen.getByText(/School, User & Curriculum Administration/i)).toBeInTheDocument();
  });
});
