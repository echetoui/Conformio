import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import InternationalGlobePrototype from './InternationalGlobePrototype';

describe('InternationalGlobePrototype', () => {
  it('switches the active region without requiring WebGL', () => {
    render(<InternationalGlobePrototype />);

    const europe = screen.getByRole('button', { name: 'Europe' });
    expect(europe.getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(europe);

    expect(europe.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByText('Horizon d’expansion')).toBeTruthy();
  });
});
