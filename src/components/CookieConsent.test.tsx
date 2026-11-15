import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CookieConsent from './CookieConsent';
import { LanguageProvider } from '../context/LanguageContext';

function renderConsent() {
  return render(
    <LanguageProvider>
      <CookieConsent />
    </LanguageProvider>,
  );
}

describe('CookieConsent', () => {
  it('stores refusal and does not add the Analytics script', () => {
    renderConsent();

    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));

    expect(localStorage.getItem('cookieConsent')).toBe('declined');
    expect(document.getElementById('conformio-google-analytics')).toBeNull();
  });

  it('loads Analytics only after acceptance', () => {
    renderConsent();

    expect(document.getElementById('conformio-google-analytics')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));

    expect(localStorage.getItem('cookieConsent')).toBe('accepted');
    expect(document.getElementById('conformio-google-analytics')).not.toBeNull();
  });

  it('reopens the settings dialog when the user changes consent', async () => {
    localStorage.setItem('cookieConsent', 'declined');
    renderConsent();

    expect(screen.queryAllByRole('dialog')).toHaveLength(0);
    window.dispatchEvent(new Event('open-cookie-settings'));

    await waitFor(() => expect(screen.getByRole('dialog')).toBeTruthy());
  });

  it('removes Analytics when accepted consent is withdrawn', async () => {
    localStorage.setItem('cookieConsent', 'accepted');
    renderConsent();

    expect(document.getElementById('conformio-google-analytics')).not.toBeNull();
    window.dispatchEvent(new Event('open-cookie-settings'));
    await waitFor(() => expect(screen.getByRole('dialog')).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));

    expect(localStorage.getItem('cookieConsent')).toBe('declined');
    expect(document.getElementById('conformio-google-analytics')).toBeNull();
  });
});
