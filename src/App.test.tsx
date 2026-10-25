import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Project Udaan App Shell', () => {
  it('renders the brand title in the header and home page', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/Udaan/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it('renders primary navigation links for library, progress, and teacher dashboard', () => {
    render(<App />);
    expect(screen.getByText(/ਪਾਠ ਲਾਇਬ੍ਰੇਰੀ/i)).toBeInTheDocument();
    expect(screen.getByText(/ਮੇਰੀ ਤਰੱਕੀ/i)).toBeInTheDocument();
    expect(screen.getByText(/ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ/i)).toBeInTheDocument();
  });
});
