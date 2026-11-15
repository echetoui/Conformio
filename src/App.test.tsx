import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './App';

describe('application routes', () => {
  it('renders the landing page', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(await screen.findByText('Conformio')).toBeTruthy();
  });

  it('renders the privacy route', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/privacy']}>
          <App />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(await screen.findByRole('heading', { name: /privacy policy/i })).toBeTruthy();
  });
});
