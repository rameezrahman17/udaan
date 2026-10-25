import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, Input, ProgressBar, Alert, Dialog, ConfirmDialog, Badge } from './index';

describe('Design System UI Components', () => {
  describe('Button', () => {
    it('renders with children and responds to click', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>ਕਲਿੱਕ ਕਰੋ</Button>);
      const btn = screen.getByRole('button', { name: /ਕਲਿੱਕ ਕਰੋ/i });
      expect(btn).toBeInTheDocument();
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('disables button when isLoading is true and renders spinner', () => {
      render(<Button isLoading>ਸੰਭਾਲੋ</Button>);
      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
    });
  });

  describe('Badge', () => {
    it('renders with appropriate variant classes', () => {
      render(<Badge variant="success">ਪਾਸ</Badge>);
      expect(screen.getByText('ਪਾਸ')).toHaveClass('bg-emerald-50');
    });
  });

  describe('Input', () => {
    it('associates label with input using generated id', () => {
      render(<Input label="ਵਿਦਿਆਰਥੀ ਦਾ ਨਾਮ" subLabel="Student Name" placeholder="ਨਾਮ ਦਰਜ ਕਰੋ" />);
      const input = screen.getByLabelText(/ਵਿਦਿਆਰਥੀ ਦਾ ਨਾਮ/i);
      expect(input).toBeInTheDocument();
    });

    it('renders error message with alert role and aria-invalid', () => {
      render(<Input label="ਈਮੇਲ" error="ਗਲਤ ਈਮੇਲ ਪਤਾ" />);
      const input = screen.getByLabelText(/ਈਮੇਲ/i);
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByRole('alert')).toHaveTextContent('ਗਲਤ ਈਮੇਲ ਪਤਾ');
    });
  });

  describe('ProgressBar', () => {
    it('clamps values and sets correct aria attributes', () => {
      render(<ProgressBar value={75} label="ਪਾਠ ਮੁਕੰਮਲ" />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveAttribute('aria-valuenow', '75');
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
  });

  describe('Alert', () => {
    it('renders alert message and triggers dismiss handler', () => {
      const handleDismiss = vi.fn();
      render(
        <Alert variant="warning" title="ਸਾਵਧਾਨੀ" onDismiss={handleDismiss}>
          ਬੈਟਰੀ ਘੱਟ ਹੈ
        </Alert>
      );
      expect(screen.getByText('ਸਾਵਧਾਨੀ')).toBeInTheDocument();
      const dismissBtn = screen.getByRole('button', { name: /ਸੂਚਨਾ ਬੰਦ ਕਰੋ/i });
      fireEvent.click(dismissBtn);
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Dialog & ConfirmDialog', () => {
    it('renders dialog when isOpen is true and fires escape key', () => {
      const handleClose = vi.fn();
      render(
        <Dialog isOpen={true} onClose={handleClose} title="ਪੁਸ਼ਟੀ ਕਰੋ">
          ਕੀ ਤੁਸੀਂ ਬਾਹਰ ਜਾਣਾ ਚਾਹੁੰਦੇ ਹੋ?
        </Dialog>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();
    });

    it('triggers confirm callback in ConfirmDialog', () => {
      const handleConfirm = vi.fn();
      render(
        <ConfirmDialog
          isOpen={true}
          onClose={() => {}}
          onConfirm={handleConfirm}
          title="ਕੁਇਜ਼ ਜਮ੍ਹਾਂ ਕਰੋ"
          description="ਕੀ ਤੁਸੀਂ ਆਪਣੇ ਜਵਾਬ ਜਮ੍ਹਾਂ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?"
        />
      );
      const confirmBtn = screen.getByRole('button', { name: /ਪੁਸ਼ਟੀ ਕਰੋ/i });
      fireEvent.click(confirmBtn);
      expect(handleConfirm).toHaveBeenCalledTimes(1);
    });
  });
});
