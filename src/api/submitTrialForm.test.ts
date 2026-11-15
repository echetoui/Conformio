import { describe, expect, it, vi } from 'vitest';
import { submitTrialForm } from './submitTrialForm';

describe('submitTrialForm', () => {
  it('submits the validated lead payload to Formspree', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    const result = await submitTrialForm({
      fullName: 'Jean Dupont',
      email: 'jean@entreprise.ca',
      companyName: 'Entreprise Inc.',
      teamSize: '1-5',
      objectives: ['SOC 2'],
      utmSource: 'test',
    });

    expect(result).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://formspree.io/f/test-form',
      expect.objectContaining({ method: 'POST' }),
    );
  });
});
