import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEventSubmission } from './useEventSubmission';

function createFormData() {
  const formData = new FormData();
  formData.append('tittel', 'Test Event');
  return formData;
}

function mockFetchSuccess() {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 200 }));
}

function mockFetchApiError() {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 500 }));
}

function mockFetchNetworkError() {
  vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Network error'));
}

describe('useEventSubmission', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('starts with idle status', () => {
    const { result } = renderHook(() => useEventSubmission());
    expect(result.current.status).toBe('idle');
  });

  it('sets status to submitting during request', async () => {
    let resolveFetch: (value: Response) => void;
    vi.spyOn(globalThis, 'fetch').mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      }),
    );

    const { result } = renderHook(() => useEventSubmission());

    act(() => {
      result.current.submitEvent(createFormData());
    });

    expect(result.current.status).toBe('submitting');

    await act(async () => {
      resolveFetch!(new Response('', { status: 200 }));
    });
  });

  it('sets status to success on successful submission', async () => {
    mockFetchSuccess();
    const { result } = renderHook(() => useEventSubmission());

    await act(() => result.current.submitEvent(createFormData()));

    expect(result.current.status).toBe('success');
  });

  it('sets status to error on API error response', async () => {
    mockFetchApiError();
    const { result } = renderHook(() => useEventSubmission());

    await act(() => result.current.submitEvent(createFormData()));

    expect(result.current.status).toBe('error');
  });

  it('sets status to error on network failure', async () => {
    mockFetchNetworkError();
    const { result } = renderHook(() => useEventSubmission());

    await act(() => result.current.submitEvent(createFormData()));

    expect(result.current.status).toBe('error');
  });

  it('appends access key to form data', async () => {
    mockFetchSuccess();
    const { result } = renderHook(() => useEventSubmission());

    await act(() => result.current.submitEvent(createFormData()));

    const sentBody = vi.mocked(globalThis.fetch).mock.calls[0][1]?.body as FormData;
    expect(sentBody.has('access_key')).toBe(true);
  });

  it('resets status to idle', async () => {
    mockFetchSuccess();
    const { result } = renderHook(() => useEventSubmission());

    await act(() => result.current.submitEvent(createFormData()));
    expect(result.current.status).toBe('success');

    act(() => result.current.resetStatus());
    expect(result.current.status).toBe('idle');
  });
});
